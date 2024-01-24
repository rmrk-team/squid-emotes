import { EvmBatchProcessor } from '@subsquid/evm-processor';
import { Store, TypeormDatabase } from '@subsquid/typeorm-store';
import * as contractAbi from '../abi/abi';
import { Block, Token, TokenEmote, Emoter } from '../model';
import * as spec from '../abi/abi';
import { DataSource, In, Like } from 'typeorm';
import {
  EMOTES_REPO_LEGACY_ADDRESS,
  EMOTES_REPO_NEW_ADDRESS,
} from '../networks/constants';
import { lookupArchive } from '@subsquid/archive-registry';
// import { createOrmConfig } from '@subsquid/typeorm-config';

const getProcessor = (
  archiveId: string,
  chainRPC: string,
  initBlock: number,
) => {
  return new EvmBatchProcessor()
    .setDataSource({
      archive: lookupArchive(archiveId, {
        release: 'ArrowSquid',
        type: 'EVM',
      }),
      chain: {
        url: chainRPC,
        rateLimit: 20,
      },
    })
    .setFinalityConfirmation(150)
    .setFields({
      log: {
        topics: true,
        data: true,
        transactionHash: true,
      },
    })
    .addLog({
      address: [EMOTES_REPO_LEGACY_ADDRESS, EMOTES_REPO_NEW_ADDRESS],
      topic0: [contractAbi.events['Emoted'].topic],
      range: {
        from: initBlock,
      },
    });
};

// @ts-ignore
// abstract class StoreWithEntityManager extends Store {
//   // @ts-ignore
//   public em: () => EntityManager;
// }
// export type DbStore = StoreWithEntityManager;
//
// const fixStuckPolygon = async (chainSchema: string, chainId: number) => {
//   const connection = new DataSource({
//     ...createOrmConfig(),
//     subscribers: [],
//     synchronize: false,
//     migrationsRun: false,
//     dropSchema: false,
//     logging: ['error', 'schema'],
//   });
//
//   await connection.initialize();
//
//   const database = new TypeormDatabase({
//     stateSchema: chainSchema,
//   });
//
//   await database.connect();
//
//   const store: DbStore = new Store(() =>
//     connection.createEntityManager(),
//   ) as any;
//   const lastProcessedBlock = await store.em().getRepository(Block).find({
//     take: 1,
//   });
//   console.log('Found latest block:', lastProcessedBlock, `%${chainId}-%`);
//
//   if (lastProcessedBlock && lastProcessedBlock?.[0]?.number <= 48544595) {
//     await store
//       .em()
//       .query(`UPDATE ${chainSchema}.status SET height = $1 WHERE id = 0`, [
//         lastProcessedBlock?.[0].number,
//       ]);
//   }
//
//   await database.disconnect();
// };

export const runProcessor = async (
  archiveId: string,
  chainId: number,
  chainRPC: string,
  chainSchema: string,
  initBlock: number,
) => {
  // await fixStuckPolygon(chainSchema, chainId);

  const processor = getProcessor(archiveId, chainRPC, initBlock);
  const db = new TypeormDatabase({
    stateSchema: chainSchema,
  });

  processor.run(db, async (ctx) => {
    const emoteEventsData: {
      emoter: string;
      tokenId: bigint;
      on: boolean;
      collection: string;
      emoji: string;
      eventId: string;
      block: Block;
    }[] = [];

    for (let block of ctx.blocks) {
      const blockEntity = new Block({
        id: `${chainId}-${block.header.id}`,
        number: block.header.height,
        timestamp: new Date(block.header.timestamp),
        hash: block.header.hash
      });

      for (let log of block.logs) {
        if (log.topics[0] === spec.events.Emoted.topic) {
          await ctx.store.upsert(blockEntity);
          const { emoter, tokenId, on, collection, emoji } =
            spec.events['Emoted'].decode(log);
          emoteEventsData.push({
            emoter: emoter.toLowerCase(),
            tokenId,
            on,
            collection: collection.toLowerCase(),
            emoji,
            eventId: log.id,
            block: blockEntity,
          });
        }
      }
    }

    const tokensIds: Set<string> = new Set();
    const emoteIds: Set<string> = new Set();
    const emoterIds: Set<string> = new Set();

    for (let emoteEventsDataItem of emoteEventsData) {
      const tokenDatabaseId = `${chainId}-${emoteEventsDataItem.collection}-${emoteEventsDataItem.tokenId}`;

      const tokenEmoteDatabaseId = `${tokenDatabaseId}-${emoteEventsDataItem.emoter}-${emoteEventsDataItem.emoji}`;
      emoteIds.add(tokenEmoteDatabaseId);
      emoterIds.add(emoteEventsDataItem.emoter);
    }

    let tokens = await ctx.store
      .findBy(Token, { id: In([...tokensIds]) })
      .then((q) => new Map(q.map((i) => [i.id, i])));
    let tokenEmotes = await ctx.store
      .findBy(TokenEmote, { id: In([...emoteIds]) })
      .then((q) => new Map(q.map((i) => [i.id, i])));
    let emoters = await ctx.store
      .findBy(Emoter, { id: In([...emoterIds]) })
      .then((q) => new Map(q.map((i) => [i.id, i])));

    for (let emoteEventsDataItem of emoteEventsData) {
      const tokenDatabaseId = `${chainId}-${emoteEventsDataItem.collection}-${emoteEventsDataItem.tokenId}`;

      const tokenEmoteDatabaseId = `${tokenDatabaseId}-${emoteEventsDataItem.emoter}-${emoteEventsDataItem.emoji}`;
      let tokenEmote = tokenEmotes.get(tokenEmoteDatabaseId);
      if (tokenEmote == null) {
        tokenEmote = new TokenEmote({
          id: tokenEmoteDatabaseId,
          timestamp: emoteEventsDataItem.block.timestamp,
          emoji: emoteEventsDataItem.emoji,
          on: emoteEventsDataItem.on,
          chainId: chainId,
        });
        tokenEmotes.set(tokenEmote.id, tokenEmote);
      } else {
        tokenEmote.timestamp = emoteEventsDataItem.block.timestamp;
        tokenEmote.on = emoteEventsDataItem.on;
      }

      let token = tokens.get(tokenDatabaseId);
      if (token == null) {
        token = new Token({
          id: tokenDatabaseId,
          collection: emoteEventsDataItem.collection,
          tokenId: emoteEventsDataItem.tokenId,
        });
        tokens.set(token.id, token);
      }

      let emoter = emoters.get(emoteEventsDataItem.emoter);
      if (emoter == null) {
        emoter = new Emoter({ id: emoteEventsDataItem.emoter });
        emoters.set(emoter.id, emoter);
      }

      tokenEmote.token = token;
      tokenEmote.emoter = emoter;
    }

    await ctx.store.upsert([...emoters.values()]);
    await ctx.store.upsert([...tokens.values()]);

    await ctx.store.upsert([...tokenEmotes.values()]);
  });
};

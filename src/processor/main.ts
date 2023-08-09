import { EvmBatchProcessor } from '@subsquid/evm-processor';
import { TypeormDatabase } from '@subsquid/typeorm-store';
import * as contractAbi from '../abi/abi';
import { Block, Token, TokenEmote, Emoter } from '../model';
import * as spec from '../abi/abi';
import { In } from 'typeorm';

const getProcessor = (
  archive: string,
  chainRPC: string,
  emotesRepoAddress: string,
  initBlock: number,
) => {
  return new EvmBatchProcessor()
    .setDataSource({
      archive: archive,
      chain: chainRPC,
    })
    .setFields({
      log: {
        topics: true,
        data: true,
        transactionHash: true,
      },
    })
    .addLog({
      address: [emotesRepoAddress],
      topic0: [contractAbi.events['Emoted'].topic],
      range: {
        from: initBlock,
      },
    })
    .setFinalityConfirmation(1);
};

export const runProcessor = (
  archive: string,
  chainId: number,
  chainRPC: string,
  chainSchema: string,
  emotesRepoAddress: string,
  initBlock: number,
) => {
  const processor = getProcessor(
    archive,
    chainRPC,
    emotesRepoAddress,
    initBlock,
  );
  const db = new TypeormDatabase({
    supportHotBlocks: false,
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
      });

      for (let log of block.logs) {
        if (log.topics[0] === spec.events.Emoted.topic) {
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

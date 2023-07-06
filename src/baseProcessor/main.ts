import {EvmBatchProcessor, Log as _Log} from '@subsquid/evm-processor'
import {TypeormDatabase} from '@subsquid/typeorm-store'

import {EntityBuffer} from '../entityBuffer'
import * as contractAbi from '../abi/abi'
import {Emotes, Block} from '../model'


const getProcessor = (archive: string, chainRPC: string, emotesRepoAddress: string, initBlock: number) => {
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
            topic0: [
                contractAbi.events['Emoted'].topic,
            ],
            range: {
                from: initBlock,
            },
        }).setFinalityConfirmation(1)
}

export const runProcessor = (archive: string, chainId: number, chainRPC: string, chainSchema: string, emotesRepoAddress: string, initBlock: number) => {
    const processor = getProcessor(archive, chainRPC, emotesRepoAddress, initBlock);
    const db = new TypeormDatabase({supportHotBlocks: false, stateSchema: chainSchema});
    processor.run(db, async (ctx) => {
        for (let block of ctx.blocks) {
            const blockEntity = new Block({
                id: `${chainId}-${block.header.id}`,
                number: block.header.height,
                timestamp: new Date(block.header.timestamp),
            })
            EntityBuffer.add(blockEntity)
    
            for (let log of block.logs) {
                if (log.address === emotesRepoAddress) {
                    try {
                        switch (log.topics[0]) {
                            case contractAbi.events['Emoted'].topic: {
                                let e = contractAbi.events['Emoted'].decode(log)
                                EntityBuffer.add(
                                    new Emotes({
                                        id: `${chainId}-${log.id}`,
                                        block: blockEntity,
                                        chainId: chainId,
                                        emoter: e[0],
                                        collection: e[1],
                                        tokenId: e[2],
                                        emoji: e[3],
                                        on: e[4],
                                    })
                                )
                                break
                            }
                        }
                    }
                    catch (error) {
                        ctx.log.error({error, blockNumber: log.block.height, blockHash: log.block.hash, emotesRepoAddress}, `Unable to decode event "${log.topics[0]}"`)
                    }
                }
            }
        }
    
        for (let entities of EntityBuffer.flush()) {
            await ctx.store.insert(entities)
        }
    })
}

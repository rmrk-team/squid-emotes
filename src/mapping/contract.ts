import {DataHandlerContext} from '@subsquid/evm-processor'
import {Store} from '../db'
import {EntityBuffer} from '../entityBuffer'
import {Emotes, Block} from '../model'
import * as spec from '../abi/abi'
import {Log} from '../processor'

const address = '0x31107354b61a0412e722455a771bc462901668ea'


export function parseEvent(ctx: DataHandlerContext<Store>, log: Log, block: Block) {
    try {
        switch (log.topics[0]) {
            case spec.events['Emoted'].topic: {
                let e = spec.events['Emoted'].decode(log)
                EntityBuffer.add(
                    new Emotes({
                        id: log.id,
                        block: block,
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
        ctx.log.error({error, blockNumber: log.block.height, blockHash: log.block.hash, address}, `Unable to decode event "${log.topics[0]}"`)
    }
}


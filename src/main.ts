import {contract} from './mapping'
import {processor} from './processor'
import {db, Store} from './db'
import {EntityBuffer} from './entityBuffer'
import {Block} from './model'

processor.run(db, async (ctx) => {
    for (let block of ctx.blocks) {
        const blockEntity = new Block({
            id: `${block.header.id}`,
            number: block.header.height,
            timestamp: new Date(block.header.timestamp),
        })
        EntityBuffer.add(blockEntity)

        for (let log of block.logs) {
            if (log.address === '0x31107354b61a0412e722455a771bc462901668ea') {
                contract.parseEvent(ctx, log, blockEntity)
            }
        }
    }

    for (let entities of EntityBuffer.flush()) {
        await ctx.store.insert(entities)
    }
})

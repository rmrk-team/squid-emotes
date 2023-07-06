import {EvmBatchProcessor, EvmBatchProcessorFields, BlockHeader, Log as _Log} from '@subsquid/evm-processor'
import * as contractAbi from './abi/abi'

export const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: 'https://v2.archive.subsquid.io/network/ethereum-sepolia',
        chain: process.env.RPC_API_WSS,
    })
    .setFields({
        log: {
            topics: true,
            data: true,
            transactionHash: true,
        },
    })
    .addLog({
        address: ['0x31107354b61a0412e722455a771bc462901668ea'],
        topic0: [
            contractAbi.events['Emoted'].topic,
        ],
        range: {
            from: 3770923,
        },
    }).setFinalityConfirmation(1)

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>

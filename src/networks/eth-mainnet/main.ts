import {runProcessor} from '../../baseProcessor/main'

runProcessor(
    process.env.ETH_MAINNET_ARCHIVE || '',
    parseInt(process.env.ETH_MAINNET_CHAIN_ID || '0'),
    process.env.ETH_MAINNET_RPC || '',
    'ethereum-mainnet',
    process.env.ETH_MAINNET_EMOTES_REPO_ADDRESS || '',
    parseInt(process.env.ETH_MAINNET_INIT_BLOCK || '0'),
)

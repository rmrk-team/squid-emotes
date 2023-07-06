import {runProcessor} from '../../baseProcessor/main'

runProcessor(
    process.env.ETHEREUM_ARCHIVE || '',
    parseInt(process.env.ETHEREUM_CHAIN_ID || '0'),
    process.env.ETHEREUM_RPC || '',
    'ethereum-mainnet',
    process.env.ETHEREUM_EMOTES_REPO_ADDRESS || '',
    parseInt(process.env.ETHEREUM_INIT_BLOCK || '0'),
)

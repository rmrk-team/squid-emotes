import {runProcessor} from '../../baseProcessor/main'

runProcessor(
    process.env.ETH_SEPOLIA_ARCHIVE || '',
    parseInt(process.env.ETH_SEPOLIA_CHAIN_ID || '0'),
    process.env.ETH_SEPOLIA_RPC || '',
    'arbitrum-goerli',
    process.env.ETH_SEPOLIA_EMOTES_REPO_ADDRESS || '',
    parseInt(process.env.ETH_SEPOLIA_INIT_BLOCK || '0'),
)

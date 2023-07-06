import {runProcessor} from '../../baseProcessor/main'

runProcessor(
    process.env.MOONRIVER_ARCHIVE || '',
    parseInt(process.env.MOONRIVER_CHAIN_ID || '0'),
    process.env.MOONRIVER_RPC || '',
    'moonriver',
    process.env.MOONRIVER_EMOTES_REPO_ADDRESS || '',
    parseInt(process.env.MOONRIVER_INIT_BLOCK || '0'),
)

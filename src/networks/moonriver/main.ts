import {runProcessor} from '../../baseProcessor/main'

runProcessor(
    process.env.MOONBEAM_ARCHIVE || '',
    parseInt(process.env.MOONBEAM_CHAIN_ID || '0'),
    process.env.MOONBEAM_RPC || '',
    'moonriver',
    process.env.MOONBEAM_EMOTES_REPO_ADDRESS || '',
    parseInt(process.env.MOONBEAM_INIT_BLOCK || '0'),
)

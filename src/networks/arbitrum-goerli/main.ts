import {runProcessor} from '../../baseProcessor/main'
import *  as constants from './../constants'

runProcessor(
    constants.ARBITRUM_GOERLI_ARCHIVE || '',
    constants.ARBITRUM_GOERLI_CHAIN_ID,
    constants.ARBITRUM_GOERLI_RPC || '',
    'arbitrum-goerli',
    constants.ARBITRUM_GOERLI_EMOTES_REPO_ADDRESS || '',
    constants.ARBITRUM_GOERLI_INIT_BLOCK,
)

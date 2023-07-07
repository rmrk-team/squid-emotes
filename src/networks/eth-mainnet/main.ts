import {runProcessor} from '../../baseProcessor/main'
import *  as constants from './../constants'

runProcessor(
    constants.ETH_MAINNET_ARCHIVE,
    constants.ETH_MAINNET_CHAIN_ID,
    constants.ETH_MAINNET_RPC,
    'ethereum-mainnet',
    constants.ETH_MAINNET_EMOTES_REPO_ADDRESS,
    constants.ETH_MAINNET_INIT_BLOCK,
)

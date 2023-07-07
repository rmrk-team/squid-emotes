import {runProcessor} from '../../baseProcessor/main'
import *  as constants from './../constants'

runProcessor(
    constants.MOONRIVER_ARCHIVE,
    constants.MOONRIVER_CHAIN_ID,
    constants.MOONRIVER_RPC,
    'moonriver',
    constants.MOONRIVER_EMOTES_REPO_ADDRESS,
    constants.MOONRIVER_INIT_BLOCK,
)

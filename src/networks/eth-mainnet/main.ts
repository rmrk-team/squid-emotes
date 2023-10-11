import { runProcessor } from '../../processor/main';
import * as constants from './../constants';

runProcessor(
  constants.ETH_MAINNET_ARCHIVE_ID,
  constants.ETH_MAINNET_CHAIN_ID,
  constants.ETH_MAINNET_RPC,
  'ethereum-mainnet',
  constants.ETH_MAINNET_INIT_BLOCK,
);

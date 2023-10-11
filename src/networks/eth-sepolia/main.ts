import { runProcessor } from '../../processor/main';
import * as constants from './../constants';

runProcessor(
  constants.ETH_SEPOLIA_ARCHIVE_ID,
  constants.ETH_SEPOLIA_CHAIN_ID,
  constants.ETH_SEPOLIA_RPC,
  'ethereum-sepolia',
  constants.ETH_SEPOLIA_INIT_BLOCK,
);

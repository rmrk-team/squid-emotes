import { runProcessor } from '../../processor/main';
import * as constants from './../constants';

runProcessor(
  constants.BASE_ARCHIVE,
  constants.BASE_CHAIN_ID,
  constants.BASE_RPC,
  'base',
  constants.BASE_INIT_BLOCK,
);

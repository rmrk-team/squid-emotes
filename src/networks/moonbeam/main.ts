import { runProcessor } from '../../processor/main';
import * as constants from './../constants';

runProcessor(
  constants.MOONBEAM_ARCHIVE_ID,
  constants.MOONBEAM_CHAIN_ID,
  constants.MOONBEAM_RPC,
  'moonbeam',
  constants.MOONBEAM_INIT_BLOCK,
);

import { runProcessor } from '../../processor/main';
import * as constants from './../constants';

runProcessor(
  constants.MOONBEAM_ARCHIVE,
  constants.MOONBEAM_CHAIN_ID,
  constants.MOONBEAM_RPC,
  'moonbeam',
  constants.MOONBEAM_EMOTES_REPO_ADDRESS,
  constants.MOONBEAM_INIT_BLOCK,
);

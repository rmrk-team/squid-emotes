import { runProcessor } from '../../processor/main';
import * as constants from './../constants';

runProcessor(
  constants.POLYGON_ARCHIVE,
  constants.POLYGON_CHAIN_ID,
  constants.POLYGON_RPC,
  'polygon',
  constants.POLYGON_EMOTES_REPO_ADDRESS,
  constants.POLYGON_INIT_BLOCK,
);

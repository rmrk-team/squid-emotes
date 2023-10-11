import { runProcessor } from '../../processor/main';
import * as constants from './../constants';

runProcessor(
  constants.POLYGON_ARCHIVE_ID,
  constants.POLYGON_CHAIN_ID,
  constants.POLYGON_RPC,
  'polygon',
  constants.POLYGON_INIT_BLOCK,
);

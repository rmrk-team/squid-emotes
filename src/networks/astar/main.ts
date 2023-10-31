import { runProcessor } from '../../processor/main';
import * as constants from './../constants';

runProcessor(
  constants.ASTAR_ARCHIVE_ID,
  constants.ASTAR_CHAIN_ID,
  constants.ASTAR_RPC,
  'astar',
  constants.ASTAR_INIT_BLOCK,
);

import { createAction } from 'services/helpers/utils';
import * as types from './types.js';

const actions = {
  'UP': createAction(types.UP),
  'DOWN': createAction(types.DOWN),
  'LEFT': createAction(types.LEFT),
  'RIGHT': createAction(types.RIGHT),

  'ENTER': createAction(types.ENTER),

  '0': createAction(types.__0),
  '1': createAction(types.__1),
  '2': createAction(types.__2),
  '3': createAction(types.__3),
  '4': createAction(types.__4),
  '5': createAction(types.__5),
  '6': createAction(types.__6),
  '7': createAction(types.__7),
  '8': createAction(types.__8),
  '9': createAction(types.__9)
};

export default actions;

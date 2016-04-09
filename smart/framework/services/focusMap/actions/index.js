import { createAction } from 'services/helpers/utils';
import * as types from './types.js';

export const focusedChange = createAction(types.FOCUSED_CHANGED);
export const instanceCreate = createAction(types.INSTANCE_CREATED);
export const instanceDestroy = createAction(types.INSTANCE_DESTROYED);

import { createAction } from 'services/helpers/utils';
import api from '../helpers/usersApi';

import {
  USERS_READ_REQUEST, USER_READ_RECEIVE_SUCCESS, USERS_READ_RECEIVE_ERROR,
  USER_CHOOSE, USER_CREATE
} from './types';

export const chooseUser = createAction(USER_CHOOSE);
export const createUser = createAction(USER_CREATE);

export const readUser = (id) => {
  return {
    types: [USERS_READ_REQUEST, USER_READ_RECEIVE_SUCCESS, USERS_READ_RECEIVE_ERROR],
    payload: {
      data: api.read(id)
    }
  };
};

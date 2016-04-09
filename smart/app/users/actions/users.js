import api from '../helpers/usersApi';

import {
  USERS_CREATE_REQUEST, USERS_CREATE_RECEIVE_SUCCESS, USERS_CREATE_RECEIVE_ERROR,
  USERS_READ_REQUEST, USERS_READ_RECEIVE_SUCCESS, USERS_READ_RECEIVE_ERROR,
  USERS_UPDATE_REQUEST, USERS_UPDATE_RECEIVE_SUCCESS, USERS_UPDATE_RECEIVE_ERROR,
  USERS_DELETE_REQUEST, USERS_DELETE_RECEIVE_SUCCESS, USERS_DELETE_RECEIVE_ERROR
} from './types';


export const createUsers = (data, callback) => {
  return {
    types: [USERS_CREATE_REQUEST, USERS_CREATE_RECEIVE_SUCCESS, USERS_CREATE_RECEIVE_ERROR],
    payload: {
      data: api.create(data).then((response) => {
        if (callback) {
          callback(response);
        }

        return response;
      }),
    }
  };
};

export const readUsers = () => {
  return {
    types: [USERS_READ_REQUEST, USERS_READ_RECEIVE_SUCCESS, USERS_READ_RECEIVE_ERROR],
    payload: {
      data: api.read()
    }
  };
};

export const updateUsers = (id, data, callback) => {
  return {
    types: [USERS_UPDATE_REQUEST, USERS_UPDATE_RECEIVE_SUCCESS, USERS_UPDATE_RECEIVE_ERROR],
    payload: {
      data: api.update(id, data).then((response) => {
        if (callback) {
          callback(response);
        }

        return response;
      }),
      id
    }
  };
};

export const deleteUsers = (id) => {
  return {
    types: [USERS_DELETE_REQUEST, USERS_DELETE_RECEIVE_SUCCESS, USERS_DELETE_RECEIVE_ERROR],
    payload: {
      data: api.delete(id),
      id
    }
  };
};

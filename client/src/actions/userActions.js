import client from '../app/feathers';
import * as actionTypes from '../constants/actionTypes';
import { getData } from '../app/helpers';

const service = client.service('users');

export const getUsers = () => async (dispatch) => {
  const users = await service.find();

  return dispatch({
    type: actionTypes.GET_USERS,
    users: getData(users),
  });
};

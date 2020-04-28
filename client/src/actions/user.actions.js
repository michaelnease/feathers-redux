import client from '../app/feathers';
import * as actionTypes from '../constants/action.types';
import { getData } from '../app/helpers';

const service = client.service('users');

export const getUsers = () => async (dispatch) => {
  const users = await service.find();

  return dispatch({
    type: actionTypes.MAIN_GET_USERS,
    users: getData(users),
  });
};

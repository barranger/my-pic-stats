import * as types from './actionTypes';

export const login = (userName, password) => {
  console.log('action')
  return {type: types.LOGIN, userName, password};
};

import initialState from './initialState';
import {LOGIN} from '../actions/actionTypes';

const login = (state = initialState, action ) => {
  switch(action.type) {
    case LOGIN:
      console.log('going to login');
      return state;
    default:
      return state;
  }
}

export default login;
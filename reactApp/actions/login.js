import Types from './actionTypes';
import axios from 'axios';
import domain from '../domain';

export function login(username, password) {
  return dispatch => {
    dispatch({
      type: Types.loginRequested
    });
    const error = false;
    axios.post('/api/auth/login', {
      username: username,
      password: password
    })
    .then(respJson => {
      const user = respJson.data.user;
      return dispatch({
        type: Types.loginFulfilled,
        user
      });
    })
    .catch(error => {
      return dispatch({
        type: Types.loginRejected,
        error: error
      });
    });
  };
}

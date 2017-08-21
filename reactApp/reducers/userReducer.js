import Types from '../actions/index';

const userReducer = ( state = { user: {}, pending: true }, action) => {
  switch(action.type) {
    case Types.loginRequested:
      const loginPending = {
        user: {},
        pending: true
      };
      return loginPending;
    case Types.loginFulfilled:
      const loginFulfilled = {
        user: action.user,
        pending: false
      };
      return loginFulfilled;
    case Types.loginRejected:
      const loginRejected = {
        error: action.error,
        pending: false
      }
    default:
      return state;
  }
}

export default userReducer;

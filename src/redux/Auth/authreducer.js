import {AUTH_ACTION_TYPES} from './authactions';

const initialState = {
  user: {},
  allStreamer: [],
  allUser: [],
  loggedIn: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.SET_USER:
      return {
        ...state,
        user: {...action.payload},
      };
    case AUTH_ACTION_TYPES.SET_ALL_USER:
      return {
        ...state,
        allUser: [...action.payload],
      };
    case AUTH_ACTION_TYPES.SET_STREAMER:
      return {
        ...state,
        allStreamer: [...action.payload],
      };
    case AUTH_ACTION_TYPES.UPDATE_USER:
      return {
        ...state,
        user: {...state.user, ...action.payload},
      };
    case AUTH_ACTION_TYPES.LOGGED_IN:
      return {
        ...state,
        loggedIn: action.payload,
      };

    default:
      return state;
  }
};

export default AuthReducer;

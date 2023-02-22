import http from '../../api/http';
import {setLocalStorage} from '../../utils/actions';
import {setLoadingAction} from '../AppRedux/appactions';
import * as RootNavigation from '../../navigation/RootNavigator';

export const AUTH_ACTION_TYPES = {
  SET_USER: 'SET_USER',
  SET_ALL_USER: 'SET_ALL_USER',
  SET_STREAMER: 'SET_STREAMER',
  LOGGED_IN: 'LOGGED_IN',
  UPDATE_USER: 'UPDATE_USER',
};

export const setUserAction = payload => {
  return dispatch => {
    return dispatch({
      type: AUTH_ACTION_TYPES.SET_USER,
      payload: payload,
    });
  };
};

export const setAllUserAction = payload => {
  return dispatch => {
    return dispatch({
      type: AUTH_ACTION_TYPES.SET_ALL_USER,
      payload: payload,
    });
  };
};

export const setStreamerAction = payload => {
  return dispatch => {
    return dispatch({
      type: AUTH_ACTION_TYPES.SET_STREAMER,
      payload: payload,
    });
  };
};

export const userLoggedAction = payload => {
  return dispatch => {
    return dispatch({
      type: AUTH_ACTION_TYPES.LOGGED_IN,
      payload: payload,
    });
  };
};

export const updateUserAction = payload => {
  return dispatch => {
    return dispatch({
      type: AUTH_ACTION_TYPES.UPDATE_USER,
      payload: payload,
    });
  };
};

export const getMyProfileAction = payload => async dispatch => {
  try {
    const profileRes = await http.get('user/me');
    if (profileRes?.data?.success) {
      dispatch(setUserAction(profileRes?.data?.user));
    }
  } catch (error) {}
};

export const getAllStreamerAction = payload => async dispatch => {
  try {
    const streamerRes = await http.get('user/allstreamer');
    if (streamerRes?.data?.success) {
      dispatch(setStreamerAction(streamerRes?.data?.streamers));
    }
  } catch (error) {}
};

export const getAllUserAction = payload => async dispatch => {
  try {
    const allUserRes = await http.get('user/allusers');
    if (allUserRes?.data?.success) {
      dispatch(setAllUserAction(allUserRes?.data?.streamers));
    }
  } catch (error) {}
};

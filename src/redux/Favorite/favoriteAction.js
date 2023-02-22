import http from '../../api/http';
import {setLoadingAction} from '../AppRedux/appactions';

export const FAVORITE_ACTION_TYPES = {
  SET_FAVORITE: 'SET_FAVORITE',
  SET_FAVORITE_ID: 'SET_FAVORITE_ID',
  DEL_FAVORITE: 'DEL_FAVORITE',
  GET_FAVORITE: 'GET_FAVORITE',
};

export const setFavorite = payload => {
  return dispatch => {
    return dispatch({
      type: FAVORITE_ACTION_TYPES.SET_FAVORITE,
      payload,
    });
  };
};

export const setFavoriteIDs = payload => {
  return dispatch => {
    return dispatch({
      type: FAVORITE_ACTION_TYPES.SET_FAVORITE_ID,
      payload,
    });
  };
};

export const getFavorite = payload => {
  return dispatch => {
    return dispatch({
      type: FAVORITE_ACTION_TYPES.GET_FAVORITE,
      payload,
    });
  };
};

export const delFavorite = payload => {
  return dispatch => {
    return dispatch({
      type: FAVORITE_ACTION_TYPES.DEL_FAVORITE,
      payload,
    });
  };
};

export const AddFavoriteAction = payload => async dispatch => {
  try {
    // dispatch(setLoadingAction(true));

    const addRes = await http.post('user/addfavourite', {
      stream_id: payload?._id,
    });

    if (addRes?.data?.favourite) {
      dispatch(setFavoriteIDs(payload?._id));
      dispatch(setFavorite(payload));
    }
  } catch (error) {}
};

export const getFavoriteAction = () => async dispatch => {
  try {
    // dispatch(setLoadingAction(true));

    const getRes = await http.get('user/favourites');
    if (getRes?.data?.favourites) {
      const allStreamRes = await http.get('user/streams');

      if (allStreamRes?.data?.streams) {
        let arr = [];
        getRes?.data?.favourites?.forEach((item, index) => {
          allStreamRes?.data?.streams?.forEach((val, ind) => {
            if (item?.stream_id == val?._id) {
              if (!arr.includes(val)) {
                dispatch(setFavoriteIDs(val?._id));
                return arr.push(val);
              }
            }
          });
        });
        dispatch(getFavorite(arr));
      }
    }
  } catch (error) {}
};

export const removeFavoriteAction = payload => async dispatch => {
  try {
    // dispatch(setLoadingAction(true));

    const delRes = await http.post('user/delfavourite', {
      id: payload,
    });

    if (delRes?.data?.success) {
      dispatch(delFavorite(payload));
    }
  } catch (error) {}
};

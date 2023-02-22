import {combineReducers} from 'redux';
import AuthReducer from './Auth/authreducer';
import AppReducer from './AppRedux/appreducer';
import FavoriteReducer from './Favorite/favoriteReducer';

const reducers = combineReducers({
  AuthReducer: AuthReducer,
  AppReducer: AppReducer,
  FavoriteReducer: FavoriteReducer,
});

export const RootReducer = (state, action) => {
  //Reset Global state

  return reducers(state, action);
};

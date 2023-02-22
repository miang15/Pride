import {FAVORITE_ACTION_TYPES} from './favoriteAction';

const initialState = {
  favorite: [],
  favoriteIDs: [],
};

const FavoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAVORITE_ACTION_TYPES.GET_FAVORITE:
      return {
        ...state,
        favorite: [...action.payload],
      };
    case FAVORITE_ACTION_TYPES.SET_FAVORITE:
      return {
        ...state,
        favorite: [...state.favorite, action.payload],
      };
    case FAVORITE_ACTION_TYPES.SET_FAVORITE_ID:
      return {
        ...state,
        favoriteIDs: [...state.favoriteIDs, action.payload],
      };
    case FAVORITE_ACTION_TYPES.DEL_FAVORITE:
      const arr = state.favorite.filter(item => item?._id !== action.payload);
      const arr2 = state.favoriteIDs.filter(item => item !== action.payload);
      return {
        ...state,
        favorite: [...arr],
        favoriteIDs: [...arr2],
      };

    default:
      return state;
  }
};

export default FavoriteReducer;

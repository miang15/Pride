import {APP_ACTION_TYPES} from './appactions';

const INITIAL_STATE = {
  loading: false,
  toast: {
    showToast: false,
    title: '',
    description: '',
    type: '',
  },
  notifications: [],
};

const AppReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case APP_ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: actions.payload,
      };

    case APP_ACTION_TYPES.SET_TOAST:
      return {
        ...state,
        toast: {...actions.payload},
      };
    case APP_ACTION_TYPES.SET_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, actions.payload],
      };

    default:
      return state;
  }
};

export default AppReducer;

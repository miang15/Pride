import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {RootReducer} from './rootReducer';
import {socketMiddleware} from './AppRedux/appactions';

export const store = createStore(RootReducer, compose(applyMiddleware(thunk)));

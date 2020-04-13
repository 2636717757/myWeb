import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import { reducer } from './../reducers';
export const store = createStore(reducer, composeWithDevTools());

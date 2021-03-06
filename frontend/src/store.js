import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';
import apiMiddleware from './middleware/api';

export const history = createBrowserHistory();

const enhancers = [];
const middleware = [apiMiddleware, thunk, routerMiddleware(history)];
const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export default function configureStore(initialState) {
  const store = createStore(createRootReducer(history), initialState, composedEnhancers);
  return store;
}

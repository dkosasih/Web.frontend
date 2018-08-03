import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import epics from "epics";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { doRoutes } from 'routes';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import reducers, { RootState } from "./reducers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
  }
}

const composeEnhancers = (
  window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;


function configureStore(initialState?: RootState) {
  
  // configure middlewares
  const epicMiddleware = createEpicMiddleware();
  const middlewares = [
    epicMiddleware
  ];
  
  // compose enhancers
  const enhancer  = composeEnhancers(
    applyMiddleware(...middlewares)
  );
  
  // create store
  const storea =  createStore(
    reducers,
    initialState!,
    enhancer
  );
  
  epicMiddleware.run(epics);
  
  return storea;
}

export const store = configureStore();

const routes = doRoutes();

ReactDOM.render(
  <Provider store={store}>
      {routes}      
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();

import App from 'App';
import Auth from 'auth/auth';
import Callback from 'components/callback/callback.component';
import NotLoggedIn from 'components/not-logged-in/not-logged-in.component';
import Products from 'components/products/products.component';
import { History } from 'history';
import createHistory from 'history/createBrowserHistory';
import * as React from 'react';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

export const history = createHistory();

export interface BrowserHistory {
  history?: History;
}

const auth = new Auth();

const handleAuthentication = ({ location }: any) => {
    auth.handleAuthentication();
}

export const doRoutes = () => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <div className="container">
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
        </div>
        <div className="container">
          <Route path='/products' render={(props) => <Products auth={auth} />} />
          <Route path='/callback' render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
          }} />
        </div>
        <NotLoggedIn auth={auth} />
      </div>
    </ConnectedRouter>
  );
}
import * as auth0  from 'auth0-js';
import { history } from 'routes';
import { AUTH_CONFIG } from './auth0-variables';


export interface ComponentAuth {
    auth?: Auth;
}
  
export default class Auth {
  userProfile: auth0.Auth0UserProfile | null;
  requestedScopes = 'openid profile read:products write:products';

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: AUTH_CONFIG.apiUrl,
    responseType: 'token id_token',
    scope: this.requestedScopes
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.userHasScopes = this.userHasScopes.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/');
      } else if (err) {
        history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });

    // if nothing is parsed; redirect to home
    history.replace('/');
  }

    setSession(authResult: auth0.Auth0DecodedHash) {
        if (authResult) {
            // Set the time that the access token will expire at
            const expiresAt = JSON.stringify(
                authResult.expiresIn! * 1000 + new Date().getTime()
            );
            const scopes = authResult.scope || this.requestedScopes || '';

            localStorage.setItem('access_token', authResult.accessToken!);
            localStorage.setItem('id_token', authResult.idToken!);
            localStorage.setItem('expires_at', expiresAt);
            localStorage.setItem('scopes', JSON.stringify(scopes));

            // navigate to the home route
            history.replace('/');
        }
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return '';
    }
    return accessToken;
  }

  getProfile(cb: Function) {
    const accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');
    this.userProfile = null;

    this.auth0.logout({
      clientID: AUTH_CONFIG.clientId,
      returnTo: AUTH_CONFIG.callbackUrl
    });

    // navigate to the home route
    history.replace('/');  
  }

  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at')!);
    return new Date().getTime() < expiresAt;
  }

  userHasScopes(scopes: string[]) {
    const grantedScopes = (JSON.parse(localStorage.getItem('scopes')!) || '').split(' ');
    return scopes.every(scope => grantedScopes.includes(scope));
  }
}

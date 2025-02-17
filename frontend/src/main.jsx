import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const client_id = import.meta.env.VITE_AUTH0_CLIENT_ID;
const redirect_uri = import.meta.env.VITE_AUTH0_REDIRECT_URI;

const root = ReactDOM.createRoot(document.getElementById('root'));

console.log("Using main.jsx");

root.render(
  <Auth0Provider
      domain={domain}
      clientId={client_id}
      authorizationParams={{
        redirect_uri: redirect_uri
      }}
    >
      <App />
    </Auth0Provider>,
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

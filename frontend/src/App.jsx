// React Imports
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Package Imports
import { ReactFlowProvider } from "@xyflow/react";
import { useAuth0, Auth0Provider } from "@auth0/auth0-react";

// Pages
import Main from "./Pages/Main";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Help from "./Pages/Help";
import Signup from "./Pages/Signup";

// Components
import Layout from "./Components/Layout";
import ContactBar from "./Components/ContactBar";

function App() {
  const { handleRedirectCallback, isLoading, isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const stateFromUrl = urlParams.get('state');
    const storedState = sessionStorage.getItem('auth_state');  // Retrieve the stored state

    console.log("Callback URL Params:", { code, stateFromUrl });
    console.log("Stored state:", storedState);

    if (code && stateFromUrl === storedState) {
      handleRedirectCallback()
        .catch(err => console.error("Error during redirect callback:", err));

      // Clear the stored state after processing the callback
      sessionStorage.removeItem('auth_state');
    } else {
      console.error("Invalid state:", stateFromUrl);
    }
  }, [handleRedirectCallback]);

  return (
    <div>
      <ReactFlowProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Main />} />
              <Route path="contact" element={<Contact />} />
              <Route path="log-in" element={<Login />} />
              <Route path="sign-up" element={<Signup />} />
              <Route path="help" element={<Help />} />
              <Route path="about" element={<About />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ReactFlowProvider>
      <ContactBar />
    </div>
  );
}

// Wrap App in Auth0Provider with correct configuration
const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

const Root = () => (
  <Auth0Provider
    domain={auth0Domain}
    clientId={auth0ClientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);

export default Root;

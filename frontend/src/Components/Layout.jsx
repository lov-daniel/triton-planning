// React Import
import { Outlet, Link } from "react-router-dom";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

// CSS Import
import './ComponentStyles/Layout.css'
import 'bootstrap/dist/css/bootstrap.css'

const Layout = () => {

  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();  

  const LoadButtons = () => {

    if (!isAuthenticated) {
        return (<div>
        <button className="btn btn-success" type="button" href="log-in" onClick={() => loginWithRedirect()}>Log In/Sign Up</button>
        </div>)
    }

    console.log(user.name);
    return (<div>
        <button className="btn btn-danger" type="button" href="log-in" onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
    </div>)
  };

  const redir_sign = () => {
    window.location.href = "/sign-up";
  };

  const redir_login = () => {
    window.location.href = "/log-in ";
  };


  return (
    <div>
<nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <img src="logo.jpg" width="30" height="30" className="d-inline-block align-top" alt="Brand Logo" />
      Triton Planning
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="help">Help</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="contact">Contact</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="about">About</a>
        </li>
      </ul>
      <div className="d-flex">
        <LoadButtons></LoadButtons>
      </div>
    </div>
  </div>
</nav>

        <Outlet />
    </div>
    
  )
};

export default Layout;
// React Import
import { Outlet, Link } from "react-router-dom";
import React from "react";

// CSS Import
import './ComponentStyles/Layout.css'
import 'bootstrap/dist/css/bootstrap.css'

import NavBar from './NavBar'

const Layout = () => {

  return (
    <div>
        <NavBar/>
        <Outlet />
    </div>
    
  )
};

export default Layout;
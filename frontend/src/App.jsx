// React Imports
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Package Imports
import { ReactFlowProvider } from "@xyflow/react";

// Pages
import Main from "./Pages/Main";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Help from "./Pages/Help"

// Components
import Layout from "./Components/Layout";
import Signup from "./Pages/Signup";

// Loading Screens
import ContactBar from "./Components/ContactBar";

function App() {
  return (

    const { handleRedirectCallback, isLoading, isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

    React.useEffect(() => {
      if (window.location.search.includes("code=")) {
        handleRedirectCallback();
      }
    }, [handleRedirectCallback]);


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
        <ContactBar></ContactBar>
    </div>
  );
}

export default App;

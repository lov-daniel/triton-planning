// React Imports
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Main from "./Pages/Main";
import Contact from "./Pages/Contact";
import About from "./Pages/About";

// Components

// Loading Screens
import ContactBar from "./Components/ContactBar";

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}/>
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
        <ContactBar></ContactBar>
    </div>
  );
}

export default App;

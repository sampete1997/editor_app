import React from "react";
import Navbar from "./components/Navbar";
import Editor from "./components/Editor";
import SideBar from "./components/SideBar";
import { AppProvider } from "./context/AppContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
const App = () => {
  window.server_url = process.env.REACT_APP_SERVER_URl;
  return (
    <div>
      <AppProvider>
        <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<SideBar />} />
            <Route path="/edit" element={<Editor />} />
          </Routes>
        </Router>
      </AppProvider>
    </div>
  );
};

export default App;

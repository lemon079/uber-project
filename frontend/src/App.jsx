import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/captain/login" element={<Login formType="Captain" />} />
        <Route path="/user/login" element={<Login formType="User" />} />
        <Route path="/user/signup" element={<Signup formType="User" />} />
        <Route path="/captain/signup" element={<Signup formType="Captain" />} />
      </Routes>
    </Router>
  );
}

export default App;

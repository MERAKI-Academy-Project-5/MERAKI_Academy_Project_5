import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./component/home";
import About from "./component/About";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div>
     
      
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};
export default App;

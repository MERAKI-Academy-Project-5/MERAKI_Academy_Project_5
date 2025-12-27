import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./component/home";
import About from "./component/About";
import Rigester from "./component/Register";
import Login from "./component/Login";

const App = () => {
  return (
    <div>
     
      
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element ={<Rigester/>}/>
        <Route path="/login" element = {<Login/>}/>
      </Routes>
    </div>
  );
};
export default App;

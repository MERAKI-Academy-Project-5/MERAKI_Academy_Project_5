import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import Home from './component/home';

function App() {


  return (
    <div>
     <Routes>
        <Route path="/" element={<Home />} />
        </Routes>
    </div>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route } from "react-router-dom";
import Register from "./component/Register"
import './App.css'

function App() {
 

  return 
  <Routes>
      <Route path="/register" element={<Register />} />
  </Routes>

}    

export default App

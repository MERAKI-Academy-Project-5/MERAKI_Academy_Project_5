
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import Home from './component/home';

function App() {


const App = () => {
  return (
    <

<Link to="/">Home</Link>
<Link to="/about"> About </Link>



      <Routes>
        <Route path="/about" element={<About />} />

        <Route path='/' element= {<Home/>}/>







      </Routes>
    

    </div>
  )
}

export default App
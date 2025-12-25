import React from 'react'

import "./Home.css";
import Navbar from './navbar';




 const Home = () => {
  return (
    <div className="home">
    <Navbar />
    
    <section className="hero">
    <div className='hero-text'>
    <h1>hi squad</h1>
    <button>click me</button>
    </div>
    <div className='hero-image'>
    <img src="https://www.21kschool.com/pk/wp-content/uploads/sites/17/2025/03/Education-Empowers-Life-of-Every-Students.png"  />
    </div>
    </section>


    <section className='cards'>
        <div className='card'>
            <h3>hello</h3>
            <p>enjoy our courses</p>
        </div>
        <div className='card'>
            <h3>welcome</h3>
            <p>join us </p>
        </div>
    </section>
    </div>
  )
}
export default Home
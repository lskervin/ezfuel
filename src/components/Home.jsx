import React from 'react';
import './css-styles/Home.css'
import logo from '../assets/EZFuelLogo.png'


function Home() {
  return (
    <div className='home-screen' style={{marginLeft: '70px'}}>
        <h1 className='home-title' style={{marginLeft: '10px'}}>Welcome to EZFuel</h1>
        <p className='home-slogan' style={{marginLeft: '20px'}}>Refueling Made EZ</p>
        <img src={logo} style={{ width: '150px', height: 'auto', alignContent: 'center', marginTop:'-60px'}} />
            <div>
            <a href="/sign-up" className="btn">Sign Up</a>
            <a href="/sign-in" className="btn">Log In</a>    
        </div>
    </div>
  );
}

export default Home;

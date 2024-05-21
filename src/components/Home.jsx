import React from 'react';
import './css-styles/Home.css'
import logo from '../assets/EZFuelLogo.png'
import {Link} from 'react-router-dom'


function Home() {
  return (
    <div className='home-screen' style={{marginLeft: '70px'}}>
        <h1 className='home-title' style={{marginLeft: '10px'}}>Welcome to EZFuel</h1>
        <p className='home-slogan' style={{marginLeft: '20px'}}>Refueling Made EZ</p>
        <img src={logo} style={{ width: '150px', height: 'auto', alignContent: 'center', marginTop:'-60px'}} />
            <div>
            <Link to="/sign-up" className="btn">Sign Up</Link>
            <Link to="/sign-in" className="btn">Log In</Link>    
        </div>
    </div>
  );
}

export default Home;

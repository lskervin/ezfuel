import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import logo from '../assets/EZFuelLogo.png'
import './css-styles/Dash.css'
import { useOutletContext } from 'react-router-dom';
import fuelIcon from '../assets/Icons/fuel.png'
import locationIcon from '../assets/Icons/locations.png'



const Dash = () => {

  const location = useLocation();
  const [userObj, setUserObj]= useState(location.state)
  const [user, setUser]= useState(userObj.user)
  const [isEdit, setIsEdit] = useState(false)
  const [formData, setFormData] = useState({
    
    first_name: '',
    last_name: '',
    email: '',
    cell_number: '',
    mailing_address: ''
  });
  const navigate = useNavigate();

  console.log(userObj.state)

  const handleLogout = () => {
    fetch('https://gas-flask-app.onrender.com/logout', {
      method: 'DELETE',
      credentials: 'include' // Include credentials if needed
    })
    .then(response => {
      if (response.ok) {
        // Handle successful logout (if needed)
        navigate('/')
      } else {
        // Handle error response (if needed)
      }
    })
    .catch(error => {
      console.error('Error during logout:', error);
      // Handle error (if needed)
    });
  };

    return (
        <div className='dash-mainview'>
      <div className="navbar-top-dash">
        <div className="title-dash">
            <h1>DashBoard</h1>
            <ul>
            <li>
                <button style={{fontSize:"8px"}} onClick={handleLogout}><i className="fa fa-sign-out-alt fa-2x"><p >Log-Out</p></i></button>
            </li>
        </ul>
        </div>
    </div>
    <div className="sidenav-dash">
        <div className="profile-dash">
            <img src={logo} alt="" width="100" height="100"/>

            <div className="-dash-name">
                {user.first_name}
            </div>
            {/* <div className="dash-job">
            </div> */}
        </div>

        <div className="sidenav-url">
            <div className="url-dash">
                <button onClick={()=>{navigate('/editprofile', { state: { user } })}} className="active-dash">Profile</button>
                <hr align="center"/>
            </div>
            <div className="url-dash">
                <a href="#settings">Settings</a>
                <hr align="center"/>
            </div>
        </div>
    </div>

    <div className="main-dash">
        <div className="card">
            <img src={fuelIcon}/>
        <button
        onClick={()=>{navigate('/neworder', { state: { user } })}}
        >Start Your Order</button>
        </div>
        {/* <div className="card">
        <img src={locationIcon}/>
        <button 
        onClick={()=>{navigate('/track-order', { state: { userObj } })}}
        >Track Your Order</button>
        </div> */}
    </div>
    </div>
    );
  };
  
  export default Dash;
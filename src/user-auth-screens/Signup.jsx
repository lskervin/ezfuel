import React from 'react';
import { Link } from "react-router-dom";
import { useOutletContext, useNavigate } from "react-router-dom";

import RegistrationForm from './RegistrationForm';
// import './Signup.css'

function Signup() {

  const navigate = useNavigate();
  return (
    <div className='signup-page'>
      <RegistrationForm/>
    </div>
  );
}

export default Signup;

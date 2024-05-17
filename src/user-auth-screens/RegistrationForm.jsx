import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import './RegistrationForm.css'

function RegistrationForm(){
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [emailAddress, setEmailAddress] = useState("");
const [cellNumber, setCellNumber] = useState("");
const [password, setPassword] = useState("");
const [formData, setFormData] = useState({
  first_name: '',
  last_name: '',
  email: '',
  cell_number: '',
  _password: '',
});
const navigate = useNavigate();
const inputRef = useRef(null);
  let searchBox;


  useEffect(() => {
    const google = window.google;
    if (google) {
      searchBox = new google.maps.places.SearchBox(inputRef.current);
      searchBox.addListener("places_changed", handlePlacesChanged);
      console.log(searchBox)
    }
  }, []);

  const handlePlacesChanged = () => {
    const places = searchBox.getPlaces();
    if (places && places.length > 0) {
      const selectedPlace = places[0];
      const address = selectedPlace.formatted_address;
      setFormData({ ...formData, mailing_address: address });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://gas-flask-app.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Handle successful response
        response.json()
        .then(newUser => {;
          console.log(newUser); // Log the newUser
          {navigate('/carfinder', { state: newUser })}
        });
      } else {
        // Handle failed response
        console.error('Failed to register user');
      }
    } catch (error) {
      // Handle fetch error
      console.error('Error occurred while registering user:', error);
    }
  };
console.log(formData)
// console.log(inputRef)
    return(
        <div className="container">
    <div className="title">Sign Up</div>
    <div className="content">
      <form onSubmit={handleSubmit}>
        <div className="user-details">
          <div className="input-box">
            <span className="details">First Name</span>
            <input onChange={(e)=>{const inputValue = e.target.value;
              setFormData({ ...formData, first_name : inputValue })
              }} value={formData.first_name} type="text"  placeholder="Enter your first name" required/>
          </div>
          <div className="input-box">
            <span className="details">Last Name</span>
            <input onChange={(e)=>{const inputValue = e.target.value;
              setFormData({ ...formData, last_name : inputValue })
              }} value={formData.last_name}type="text"  placeholder="Enter your last name" required/>
          </div>
          <div className="input-box">
            <span className="details">Email</span>
            <input onChange={(e)=>{const inputValue = e.target.value;
              setFormData({ ...formData, email : inputValue })
              }} value={formData.email} type="email"  placeholder="Enter your email" required/>
          </div>
          <div className="input-box">
            <span className="details">Cell Number</span>
            <input onChange={(e)=>{const inputValue = e.target.value;
              setFormData({ ...formData, cell_number : inputValue })
              }} value={formData.cell_number} type="tel" placeholder="Enter your cell number" required/>
          </div>
          <div className="input-box">
            <span className="details">Password</span>
            <input onChange={(e)=>{const inputValue = e.target.value;
              setFormData({ ...formData, _password : inputValue })
              }} value={formData._password} type="password" placeholder="Enter your password" required/>
          </div>
          <div className="input-box">
            <span className="details">Confirm Password</span>
            <input onChange={(e)=>{setPassword(e.target.value)}}  type="password" value={password} placeholder="Confirm your password" required/>
          </div>
        </div>
        {/* <div className="gender-details" >
          <span className="gender-title">Mailing Address</span>
          <div className="category">
            <label htmlFor="dot-1">
            <span className="gender"><input onChange={()=>{const inputValue = inputRef.current.value;
              }}
              ref={inputRef}  type="text" placeholder="Enter Address Here" required/></span>
          </label>
          </div>
        </div> */}
        <div className="button">
          <input type="submit" value="Sign-Up"/>
        </div>
      </form>
    </div>
  </div>
    )
}

export default RegistrationForm
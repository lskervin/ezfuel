import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AddressSearch.css';
import logo from '../assets/EZFuelBackgroundImg.png';

function AddressSearch() {
  const location = useLocation();
  const obj = location.state;
  const orderInfo = obj[0]
  const user = orderInfo.user
  console.log(orderInfo)
  const [error, setError] = useState()
  const [msg, setMsg] = useState()
  const navigate = useNavigate();
  const inputRef = useRef(null);
  let searchBox;


  useEffect(() => {
    const google = window.google;
    if (google) {
      searchBox = new google.maps.places.SearchBox(inputRef.current);
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const inputValue = inputRef.current.value;
    // Process the input value
    const data = {
      'current_location': inputValue,
    }
  
    fetch(`https://gas-flask-app.onrender.com/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(resp => {
      if (resp.ok) {
        resp.json()
        .then(newUser => {
          console.log(newUser); // Log the newUser variable
          setMsg('Log in successful!')
          {navigate('/neworder', { state: [{ user: newUser, fuelType: orderInfo.fuelType }] })}; // Only pass JSON-serializable data}
        });
      } else {
        setMsg('Failed to add car try again!')
        return Promise.reject(resp)
      }
    })
    .catch(resp => resp.json())
    .then(data => setError(data))
  };

  return (
    <div className="inputContainer">
      <form className="flex items-center justify-center p-5" onSubmit={handleFormSubmit}>
        <div className="rounded-lg bg-gray-200 p-5">
          <div className="flex">
            <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
              <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute w-5 fill-gray-500 transition">
                <path d="M13.29 14.667L11 16.097V3.81l3-1.5v5.968a6.182 6.182 0 0 1 1-1.104V2.307l3.024 1.503-.003 1.974A6.275 6.275 0 0 1 19 5.7l.02.001.005-2.51L14.5.94l-4 2-4-2L2 3.191V17.9l4.5-2.811 4 2.5 3.15-1.968q-.202-.485-.36-.955zM6 14.223l-3.001 1.876-.023-12.29L6 2.308zm4 1.875l-3-1.875V2.309l3 1.5zM19 7a4.96 4.96 0 0 0-4.9 5.086c0 2.807 2.678 6.606 4.9 10.914 2.222-4.308 4.9-8.107 4.9-10.914A4.96 4.96 0 0 0 19 7zm0 13.877c-.298-.543-.598-1.077-.89-1.6-1.548-2.762-3.01-5.37-3.01-7.191a3.905 3.905 0 1 1 7.8 0c0 1.82-1.462 4.429-3.01 7.19-.292.524-.592 1.058-.89 1.601zm0-11.043A2.166 2.166 0 1 0 21.13 12 2.147 2.147 0 0 0 19 9.834zm0 3.332A1.167 1.167 0 1 1 20.13 12 1.15 1.15 0 0 1 19 13.166z"></path>
              </svg>
            </div>
            <input type="text" className="w-full max-w-160px bg-white pl-2 text-base font-semibold outline-0" ref={inputRef} placeholder="Enter a location" />
            <input type="submit" value="Use Address" className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"/>
          </div>
        </div>
        <img src={logo} alt="Logo"/>
      </form>
    </div>
  );
}

export default AddressSearch;

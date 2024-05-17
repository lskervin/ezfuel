import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/EZFuelLogo.png'
import './css-styles/NewOrder.css'
import PriceDial from './PriceDial';


const NewOrder = () => {
    const location = useLocation();
    const obj = location.state;
    const user = obj.user
    const navigate = useNavigate();
    console.log(user)
    const [selectedAddress, setSelectedAddresses] = useState(user.current_location)
    console.log(selectedAddress)
    const [carInfo, setCarInfo] = useState(user._cars[0])
    const [selectedFuel, setSelectedFuel] = useState('')
    const [maxQuantity, setMaxQuantiy] = useState(parseFloat(carInfo.Mileage_Fuel_Tank_Capacity))
    const [averagePrices, setAveragePrices] = useState(null);
    const [selectedQuantity, setSelectedQuantiy]= useState(null)
    // Extract city and state from the address parts
    const zipCodePattern = /\b\d{5}\b/
    const [zipCode, setZipCode] = useState('')
    console.log(zipCode)
    const inputRef = useRef(null);
    // State variables to hold city and state
    const startValue = 5;
    const increment = 0.5;
    const quantityIncrements = Math.floor((maxQuantity - startValue) / increment);
    const optionValues = Array.from({ length: quantityIncrements }, (_, index) => (startValue + index * increment));
    // console.log(quantityIncrements)
    const [price, setPrice] = useState(null)
    let searchBox;
    console.log(selectedFuel)
    console.log(zipCode)
    useEffect(() => {
      // Fetch gas station data from the API
      fetch(`https://gas-flask-app.onrender.com/gas-stations/${zipCode}`)
        .then((response) => response.json())
        .then((data) => {
          // Extract and process gas prices from the API response (logic will vary based on API format)
          console.log(data)
          setAveragePrices(data.average_prices)
          'loading...'
        })
        .catch((error) => console.error('Error fetching gas prices:', error));
    }, [zipCode]);

    useEffect(() => {
      const google = window.google;
      if (google) {
        // Initialize search box with current location
        getUserLocation();
      }
    }, []);
  
    useEffect(() => {
      const google = window.google;
      if (google && inputRef.current) {
        // Initialize search box
        searchBox = new google.maps.places.SearchBox(inputRef.current);
        
        // Add event listener for input change
        inputRef.current.addEventListener('change', handleInputChange);
      }
    }, [inputRef]);
  
    const handleInputChange = () => {
      // Do something when input value changes (e.g., update search results)
      console.log('Input value changed:', inputRef.current.value);
      setSelectedAddresses(inputRef.current.value)
      setZipCode(inputRef.current.value.match(zipCodePattern)[0])
    };
  
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${import.meta.env.VITE_CAGE_DATA_API_KEY}`)
              .then(response => response.json())
              .then(data => {
                const location = data.results[0].formatted;
                inputRef.current.value = location;
                setSelectedAddresses(location)
                setZipCode(location.match(zipCodePattern)[0])

              })
              .catch(error => console.error('Error fetching location:', error));
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    
    
  return (
    <div className="dashboard">
      <div className="rounded-lg bg-gray-200 p-5">
          <div className="flex">
            <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
              <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute w-5 fill-gray-500 transition">
                <path d="M13.29 14.667L11 16.097V3.81l3-1.5v5.968a6.182 6.182 0 0 1 1-1.104V2.307l3.024 1.503-.003 1.974A6.275 6.275 0 0 1 19 5.7l.02.001.005-2.51L14.5.94l-4 2-4-2L2 3.191V17.9l4.5-2.811 4 2.5 3.15-1.968q-.202-.485-.36-.955zM6 14.223l-3.001 1.876-.023-12.29L6 2.308zm4 1.875l-3-1.875V2.309l3 1.5zM19 7a4.96 4.96 0 0 0-4.9 5.086c0 2.807 2.678 6.606 4.9 10.914 2.222-4.308 4.9-8.107 4.9-10.914A4.96 4.96 0 0 0 19 7zm0 13.877c-.298-.543-.598-1.077-.89-1.6-1.548-2.762-3.01-5.37-3.01-7.191a3.905 3.905 0 1 1 7.8 0c0 1.82-1.462 4.429-3.01 7.19-.292.524-.592 1.058-.89 1.601zm0-11.043A2.166 2.166 0 1 0 21.13 12 2.147 2.147 0 0 0 19 9.834zm0 3.332A1.167 1.167 0 1 1 20.13 12 1.15 1.15 0 0 1 19 13.166z"></path>
              </svg>
            </div>
            <input type="text" className="w-full max-w-170px bg-white pl-2 text-base font-semibold outline-0" ref={inputRef} placeholder="Enter a location" />
            <input type="button" value="Use Address" className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"/>
          </div>
        </div>
      <h2 className="dashboard-greeting">Please Select Your Fuel Quantity</h2>
      <div className="dashboard-widgets">
        <select onChange={(e)=>{
          setSelectedQuantiy(e.target.value
          )}}><option>Select Your Quantity</option> 
        {user && optionValues.map((increment, index) => 
          (<option key={index}>{increment}</option>))}
          <option>Fill Up</option>
          </select>
          <PriceDial average_prices={averagePrices} selectedFuel={selectedFuel} setSelectedFuel={setSelectedFuel} selectedQuantity={selectedQuantity} selectedAddress={selectedAddress} user={user}/> 
      </div>
    </div>
  );
};

export default NewOrder;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css-styles/CarProfile.css'

function CarProfile() {

    const location = useLocation();
    const [obj, setObj]= useState(location.state)
    const [user, setUser]= useState(obj[1])
    const [car, setCar]= useState(obj[0])
    console.log(car)
    console.log(user)
    const [randomImageUrl, setRandomImageUrl] = useState('');
    const [error, setError] = useState()
    const [msg, setMsg] = useState()
    const navigate = useNavigate();
    const [selectedFuel, setSelectedFuel] = useState('')

  useEffect(() => {
    // Define your search query based on obj parameters
    const searchQuery = `${car.Trim_Year}+${car.Make_Name}+${car.Model_Name}`;
    const apiKey = import.meta.env.VITE_GOOGLE_SEARCH_API_KEY; // Replace with your Google API key
    const cx = import.meta.env.VITE_GOOGLE_SEARCH_CX; // Replace with your Custom Search Engine ID
    const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&cx=${cx}&key=${apiKey}&searchType=image`;

    // Fetch image search results
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Extract image URLs from search results
        const imageUrls = data.items.map((item) => item.link);
        // Randomly select one image URL
        const randomIndex = Math.floor(Math.random() * imageUrls.length);
        const randomImage = imageUrls[randomIndex];
        // Set the random image URL
        setRandomImageUrl(randomImage);
      })
      .catch((error) => console.error('Error fetching images:', error));
  }, []);
  
    useEffect(() => {
      console.log(selectedFuel);
  }, [selectedFuel]);

  function handleSubmit(event) {
    event.preventDefault()
    const data = {
      '_cars': [car],
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
          setUser(newUser);
          console.log(newUser); // Log the newUser variable
          setMsg('Log in successful!')
          {selectedFuel && navigate('/dash', { state: {user: newUser, fuelType: selectedFuel } })}
        });
      } else {
        setMsg('Failed to add car try again!')
        return Promise.reject(resp)
      }
    })
    .catch(resp => resp.json())
    .then(data => setError(data))
  }
  

    return (
        <div className="item">
            <h3>We Found A Match!</h3>
            <h3>{car? car['License Plate']: "loading..."}</h3>
            <figure>
            {randomImageUrl && <img src={randomImageUrl} alt="Car" />}
	        </figure>
            <p className="price">{car ? `${car['Engine_Type'].toUpperCase()} (Recommended: ${car['Engine_Fuel_Type']})`:"loading..."}</p>
            <label className='car-profile-label' htmlFor="gas-select">Fuel Type:</label>
            <select onChange={(e)=>{setSelectedFuel(e.target.value)}} name="size" id="fuel-select">
                <option value="" disabled selected hidden>Select Fuel Type</option>
                <option value="87">87 (Regular)</option>
                <option value="89">89 (Mid-Grade)</option>
                <option value="93">93 (Premium)</option>
                <option value="diesel fuel">Diesel Fuel</option>
            </select>

            <label className='car-profile-label' htmlFor="year">Year:</label>
            <input name="year" id="year" value={car?car['Trim_Year']: "loading..."} placeholder={car? car['Trim_Year']: "loading..."}/>

            <label className='car-profile-label' htmlFor="make">Make:</label>
            <input name="make" id="make" value={car? car['Make_Name']: "loading..."} />

            <label className='car-profile-label' htmlFor="model">Model:</label>
            <input name="model" id="model" value={car?car['Model_Name']: "loading..."} />
            <button onClick={()=>{navigate(navigate('/carfinder', { state: user }))}}type="button">Go back</button>
            <button onClick={handleSubmit} type="submit">Select Car</button>
        </div>
    );
}

export default CarProfile;

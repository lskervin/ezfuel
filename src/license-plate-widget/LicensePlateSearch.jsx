import React, { useState, useRef } from "react";
import './LicensePlate.css'
import LP from '../assets/blank_license_plate.png'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useOutletContext } from 'react-router-dom';

function LicensePlateSearch() {
    const [states, setStates] = useState(["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]);
    const [selectedState, setSelectedState] = useState('');
    const inputsRef = useRef([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser]= useState(location.state)
    console.log(user)

    const focusNextInput = (index) => {
        if (inputsRef.current[index + 1]) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Concatenate the values of the input fields
        const licensePlate = inputsRef.current.map((input, index) => {
            // Insert a space after the third character
            if (index === 2) {
              return input.value + ' ';
            }
            return input.value;
          }).join('');
          

        // Set loading to true while fetching data
        setLoading(true);

        // Fetch data from local JSON using the concatenated value
        fetch(`https://gas-flask-app.onrender.com/car/${licensePlate}`)
            .then(response => response.json())
            .then(data => {
                // Manipulate the data as needed
                const result = { "License Plate": licensePlate, ...data };
                console.log(result);
                // Redirect to car profile route with data
                setUser(data)
                navigate('/car-profile', { state: [result, user] });
            })
            .catch(error => console.error('Error:', error))
            .finally(() => setLoading(false)); // Set loading back to false
    };

    return (
        <div className="Licenseplatefinder">
            <div className="plate-header">
            <h1 className="slogan">Refueling Made EZ</h1>
            </div>
            <h2 className="instructions">Enter Your License Plate Below:</h2>
            <form className="license-form" onSubmit={handleSubmit}> 
                <div className="image-container">
                    <div className="plate-image">
                        <img src={LP} alt="Description" />
                    </div>
                    <div className="overlay-component">
                        <div className="plate-interaction">
                            <select className="plate-selector" onChange={handleStateChange}>
                                <option value="" disabled selected hidden>Select Your State</option>
                                {states.map((state) => (
                                    <option className="state-options" key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                        <div className="plate-characters">
                            {[...Array(8)].map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    name={`plate-${index + 1}`}
                                    className={`plate-${index + 1}`}
                                    maxLength="1"
                                    placeholder="X"
                                    required={index < 7}
                                    ref={(input) => (inputsRef.current[index] = input)}
                                    onInput={() => focusNextInput(index)}
                                />
                            ))}
                        </div>
                        <button onSubmit={handleSubmit} className='plate-valiation' type="submit">{loading ? 'Loading...' : 'Find My Car'}</button>
                        {user.email? null:<button className="sign-in2"><Link to="/sign-in"><span>Sign In to use Saved Cars</span></Link></button>}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LicensePlateSearch;

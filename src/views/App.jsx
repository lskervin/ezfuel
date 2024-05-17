import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import './App.css';





function App() {
  const [displayMenu, setDisplaymenu] = useState(false);
  const [viewCart, setViewCart]= useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(`https://gas-flask-app.onrender.com/check_session_user`, {
          method: 'GET',
          credentials: 'include'
        });
  
        if (response.ok) {
          // If response is okay, parse the JSON
          const user = await response.json();
          // Update the state with the user data
          setUserData(user);
        } else {
          // If response is not okay, handle the error
          console.error('Error:', response.status);
        }
      } catch (error) {
        // Catch any network errors
        console.error('Network error:', error);
      }
    };
  
    fetchData();
  }, []);
  



  return (
    <div className='app-screen'>
    <main className="main-content">
        <Outlet context={{userData}}/>
    </main>
    </div>
  );
}

export default App;

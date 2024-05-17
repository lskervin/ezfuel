import React from 'react';

import './css-styles/Menu.css'; // Import CSS file for styling

function Menu() {
  return (
    <div id="nav-bar">
       <nav>
            <a href="#first"><i className="far fa-user"></i></a>
            <a href="#second"><i className="fas fa-briefcase"></i></a>
            <a href="#third"><i className="far fa-file"></i></a>
            <a href="#fourth"><i className="far fa-address-card"></i></a>
        </nav>
    </div>
  );
}

export default Menu;

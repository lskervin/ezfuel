import React, { useEffect, useRef, useState } from "react";
import './css-styles/TotalDial.css'

function PriceDial({totalDisplay}) {
const [loading, setLoading] = useState(true);
console.log(totalDisplay)

useEffect(() => {
  // Simulating an asynchronous update
  setTimeout(() => {
    setLoading(false);
  }, 100);
}, [totalDisplay]);

return (
  <div>
      <div id="fuelDials" className="dialstotalHolder">
        <div>
          <span className="dialheader" style={{ fontSize: "18px", marginLeft: "0px", paddingRight: "10px", position: "relative" }}>Total</span>
        </div>
        
        <div className="totaldivider dollar"></div>

        {loading ? ( // Display loading screen if loading is true
          <div>Loading...</div>
        ) : totalDisplay && totalDisplay.length > 0 ? (
          totalDisplay.map((digit, index) => (
            <div key={index} className="totaldial">
              <span className="totaldigit static">{digit}</span>
            </div>
          ))
        ) : (
          <>
            <div id="tens" className="totaldial"><span className="totaldigit static">0</span></div>
            <div id="tens" className="totaldial"><span className="totaldigit static">0</span></div>
            <div id="ones" className="totaldial"><span className="totaldigit static">0</span></div>
            <div id="tens" className="totaldial"><span className="totaldigit static">.</span></div>
            <div id="tenths" className="totaldial"><span className="totaldigit static">0</span></div>
            <div id="hundredths" className="totaldial"><span className="totaldigit static">0</span></div>
          </>
        )}
      </div>
    </div>
);
}

export default PriceDial;

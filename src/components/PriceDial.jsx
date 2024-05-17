import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './css-styles/PriceDial.css'
import TotalDial from './TotalDial'

function PriceDial({average_prices, selectedFuel, setSelectedFuel, selectedQuantity, selectedAddress, user}) {
  const navigate = useNavigate();
  const [regular, setRegular] = useState(0);
  const [midGrade, setMidGrade] = useState(0);
  const [premium, setPremium] = useState(0);
  const [dieselFuel, setDieselFuel] = useState(0);
  const [regularHistory, setRegularHistory] = useState([]);
  const [midGradeHistory, setMidGradeHistory] = useState([]);
  const [premiumHistory, setPremiumHistory] = useState([]);
  const [dieselFuelHistory, setDieselFuelHistory] = useState([]);
  const positionsRef = useRef([]);
  const [selectedFuelPrice, setSelectedFuelPrice] =useState(0)
  const [selectedFuelPriceHistory, setSelectedFuelPriceHistory] = useState([]);
  const [orderTotal, setOrderTotal] = useState(null)
  const [totalDisplay, setTotalDisplay]= useState([])
  const [orderInfo, setOrderInfo] = useState()
  console.log(orderInfo)

  useEffect(() => {
  if (average_prices) {
    const regularPrice = average_prices.regular *1.4;
    const regularDigits = regularPrice.toFixed(2).toString().split('');
    setRegular(regularPrice);
    setRegularHistory([...regularDigits]);
    const midGradePrice = average_prices.midGrade *1.4;
    const midGradeDigits = midGradePrice.toFixed(2).toString().split('');
    setMidGrade(midGradePrice);
    setMidGradeHistory([...midGradeDigits]);
    const premiumPrice = average_prices.premium *1.4;
    const premiumDigits = premiumPrice.toFixed(2).toString().split('');
    setPremium(premiumPrice);
    setPremiumHistory([...premiumDigits]);
  }
},[average_prices])

useEffect(() => {
  if (selectedFuel && regular && midGrade && premium && regularHistory.length > 0 && midGradeHistory.length > 0  && premiumHistory.length > 0 ) {
    if(selectedFuel === 'Regular'){
      const regPrice = regular && regular
      const regPriceDigits = regPrice > 0? regPrice.toFixed(2).toString().split(''): '00.00';
      setSelectedFuelPrice(regPrice);
      setSelectedFuelPriceHistory([...regPriceDigits]);
    }
    if(selectedFuel === "MidGrade"){
      const midPrice = midGrade && midGrade;
      const midPriceDigits = midPrice > 0? midPrice.toFixed(2).toString().split(''): '00.00';
      setSelectedFuelPrice(midPrice);
      setSelectedFuelPriceHistory([...midPriceDigits]);
    }
    if(selectedFuel === "Premium"){
      const premPrice = premium && premium;
      const premPriceDigits = premPrice > 0? premPrice.toFixed(2).toString().split('') : '00.00';
      setSelectedFuelPrice(premPrice);
      setSelectedFuelPriceHistory([...premPriceDigits])
    }
  }
}, [selectedFuel, regular, midGrade, premium]);

useEffect(() => {
  if (average_prices && selectedFuel)
    {if (selectedFuel === 'Regular'){
      setOrderTotal((selectedQuantity*(average_prices.regular*1.4)))
      setTotalDisplay((selectedQuantity*(average_prices.regular*1.4)).toFixed(2).toString().split(''))
    }
    if (selectedFuel === 'MidGrade'){
      setOrderTotal((selectedQuantity*(average_prices.midGrade *1.4)))
      setTotalDisplay((selectedQuantity*(average_prices.midGrade*1.4)).toFixed(2).toString().split(''))
    }
    if (selectedFuel === 'Premium'){
      setOrderTotal((selectedQuantity*(average_prices.premium*1.4)))
      setTotalDisplay((selectedQuantity*(average_prices.premium*1.4)).toFixed(2).toString().split(''))
    }}
}, [selectedQuantity, selectedFuel, regular, midGrade, premium]);

const handleOrder=()=>{
  const orderInfo = {
    current_location: selectedAddress,
    quantity: selectedQuantity,
    fuelType: selectedFuel,
    price: selectedFuelPrice.toFixed(2),
    total: orderTotal.toFixed(2)
  };
  navigate('/checkout', { state: [{ order: orderInfo, userInfo: user }] })
}
console.log(selectedFuelPrice)
console.log((selectedQuantity * selectedFuelPrice))
console.log(selectedFuelPriceHistory)
console.log(totalDisplay)
return (
  <div>
    
    { selectedFuel === 'Regular' ? (<div id="fuelDials" className="dialsHolder">
    <div>
      <span className="dialheader" style={{fontSize: "18px", marginLeft: "-30px", paddingRight: "10px", mposition:"relative"}}>Price per Gal.</span>
      </div>
      <div className="divider dollar"></div>
      <div id="oneHundred" className="dial"><span className="digit static">0</span></div>
      {regularHistory.map((digit, index) => (
        <div key={index} id="oneHundred" className="dial">
          <span className="digit static">{digit}</span>
        </div>
      ))}
      <TotalDial totalDisplay={totalDisplay}/>
    </div>): selectedFuel === "MidGrade" ? (<div id="fuelDials" className="dialsHolder">
    <div>
      <span className="dialheader" style={{fontSize: "18px", marginLeft: "-30px", paddingRight: "10px", mposition:"relative"}}>Price per Gal.</span>
      </div>
      <div className="divider dollar"></div>
      <div id="oneHundred" className="dial"><span className="digit static">0</span></div>
      {midGradeHistory.map((digit, index) => (
        <div key={index} id="oneHundred" className="dial">
          <span className="digit static">{digit}</span>
        </div>
      ))}
      <TotalDial totalDisplay={totalDisplay}/>
    </div>): selectedFuel === "Premium" ? (<div id="fuelDials" className="dialsHolder">
      <div>
      <span className="dialheader" style={{fontSize: "18px", marginLeft: "-30px", paddingRight: "10px", mposition:"relative"}}>Price per Gal.</span>
      </div>
      <div className="divider dollar"></div>
      <div id="oneHundred" className="dial"><span className="digit static">0</span></div>
      {premiumHistory.map((digit, index) => (
        <div key={index} id="oneHundred" className="dial">
          <span className="digit static">{digit}</span>
        </div>
      ))}
      <TotalDial totalDisplay={totalDisplay}/>
    </div>): 
    (
    <div id="fuelDials" className="dialsHolder">
      <div>
      <span className="dialheader" style={{fontSize: "18px", marginLeft: "-45px", paddingRight: "10px", position:"relative"}}>Price per Gal.</span>
      </div>
      <div className="divider dollar"></div>
      <div id="oneHundred" className="dial"><span className="digit static">0</span></div>
      <div id="tens" className="dial"><span className="digit static">0</span></div>
      <div id="ones" className="dial"><span className="digit static">0</span></div>
      <div id="tens" className="dial"><span className="digit static">.</span></div>
      <div id="tenths" className="dial"><span className="digit static">0</span></div>
      <div id="hundredths" className="dial"><span className="digit static">0</span></div>
      <TotalDial/>
    </div>
    
  )}
    <div id="competitors" className="selectors">
      <input onClick={(e)=>setSelectedFuel(e.target.value)} type="radio" name="Competitor" id="Regular" value="Regular" data-savings={average_prices && average_prices.regular * 1.4} /><label htmlFor="Regular">Regular</label>
      <input onClick={(e)=>setSelectedFuel(e.target.value)} type="radio" name="Competitor" id="MidGrade" value="MidGrade" data-savings={average_prices && average_prices.midGrade * 1.4} /><label htmlFor="MidGrade">MidGrade</label>
      <input onClick={(e)=>setSelectedFuel(e.target.value)} type="radio" name="Competitor" id="Premium" value="Premium" data-savings={average_prices && average_prices.premium * 1.4} /><label htmlFor="Premium">Premium</label>
    </div>
    <div>
    <button
    onClick={handleOrder}
    >ORDER</button>
    </div>
  </div>
);
}

export default PriceDial;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css-styles/Cart.css';
import { useState } from 'react';

const Cart = ({ order, viewCart, setViewCart }) => {
const navigate = useNavigate();
console.log(order)
const [currentOrder, setCurrentOrder]= useState(order)
console.log(currentOrder)
  return (
    <div className="sidecart">
      <div id="cd-shadow-layer"></div>
      {currentOrder&& currentOrder.length > 0 ? (
        <div id="cd-cart">
          <h2>Cart</h2>
          <ul className="cd-cart-items">
            <h3>{currentOrder && currentOrder[0].carInfo["License Plate"]}</h3>
            <h4>{currentOrder && currentOrder[0].location}</h4>
            <li className="cd-cart-item">{currentOrder && currentOrder[0].quantity} gal. x {currentOrder && currentOrder[0].fuel} @ {currentOrder && currentOrder[0].price }</li>
          </ul>
          <div className="cd-cart-total">
            <p>Total <span>$ {currentOrder ? (parseInt(currentOrder[0].quantity) * currentOrder[0].price).toFixed(2) : "loading..."}</span></p>
          </div>
          <button onClick={()=>{currentOrder && navigate('/checkout', { state: {currentOrder} });setViewCart(false) }}className="checkout-btn">Checkout</button>
        </div>
      ) : (
        <div id="cd-cart">
          <h2 className='cart-header'>Order Summary</h2>
          <img style={{fontSize:'6px', color: 'white'}} className="co-cart-item" src="https://www.adasglobal.com/img/empty-cart.png" alt="Empty Cart" />
        </div>
      )}
    </div>
  );
};

export default Cart;

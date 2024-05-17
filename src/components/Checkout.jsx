import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css-styles/Checkout.scss';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true); // State to track loading status
  const [currentOrder, setCurrentOrder] = useState(null); // State to store current order
  const [user, setUser] = useState(null); // State to store user data

  useEffect(() => {
    console.log("Location state:", location.state);
    const fetchData = async () => {
      const obj = location.state[0];
      setCurrentOrder(obj.order);
      console.log("Current order:", obj.order);
      setUser(obj.userInfo);
      console.log("User:", obj.userInfo);
      setLoading(false); // Set loading to false once data is initialized
    };
  
    fetchData();
  }, [location.state]);
  
  console.log(user)
  return (
    <div className="wrap cf">
      <div className="heading cf">
        <h1>Order Summary</h1>
      </div>
      {loading || !currentOrder || !user ? ( // Render loading state until data is initialized
        <div>Loading...</div>
      ) : (
        <div className="cart">
          <ul className="cartWrap">
            <li className="items even">
              <div className="infoWrap">
                <div className="cartSection info">
                  <img
                    src="http://lorempixel.com/output/technics-q-c-300-300-4.jpg"
                    alt=""
                    className="itemImg"
                  />
                  <h3>{currentOrder && currentOrder.fuelType}</h3>
                  <p>
                    <input
                      type="text"
                      className="qty"
                      placeholder={currentOrder && currentOrder.quantity}
                    />{' '}
                    x ${currentOrder && (currentOrder.price)}
                  </p>
                </div>
                <div className="prodTotal cartSection">
                  <p>${currentOrder && (currentOrder.total)}</p>
                </div>
              </div>
              <div className="special"></div>
            </li>
          </ul>
        </div>
      )}

      <div className="subtotal cf">
        <ul style={{ listStyle: 'none' }}>
          <li className="totalRow">
            <span className="label">Subtotal</span>
            <span className="value">${currentOrder && currentOrder.total}</span>
          </li>

          <li className="totalRow">
            <span className="label">Delivery</span>
            <span className="value">
              ${currentOrder && (currentOrder.total * 0.1).toFixed(2)}
            </span>
          </li>
          <li className="totalRow">
            <span className="label">Tax</span>
            <span className="value">
              ${currentOrder && (currentOrder.total * 0.08875).toFixed(2)}
            </span>
          </li>
          <li className="totalRow final">
            <span className="label">Total</span>
            <span className="value">
              ${currentOrder && (currentOrder.total * 1.18875).toFixed(2)}
            </span>
          </li>
          <li className="totalRow">
            <a
              onClick={() => {
                navigate('/payment', { state: [{ order: currentOrder, userInfo: user }] });
              }}
              className="btn continue"
            >
              Checkout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Checkout;

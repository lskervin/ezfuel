import React, { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import approved from '../assets/Icons/approval-24.jpg'

function PaymentSuccess() {
    const location = useLocation();
    const obj = location.state;
    const currentOrder = obj.order;
    const user = obj.userInfo;
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to "/dash" after 10 seconds
        const timer = setTimeout(() => {
            navigate('/dash', { state: { user, currentOrder } } );
        }, 10000);

        // Clear the timer when the component unmounts or the URL changes
        return () => clearTimeout(timer);
    }, [navigate]);
    console.log(user)
    console.log(currentOrder)
    return (
        <div>
            <div className="bg">
                <div className="card">
                    <span className="card__success"><i className="ion-checkmark"></i></span>
                    <h1 className="card__msg">Payment Complete</h1>
                    <h2 className="card__submsg">Thank you for your transfer</h2>
                    <div className="card__body">
                        <img style={{}} src={approved} className="card__avatar"/>
                        <div className="card__recipient-info">
                            <p className="card__recipient">{user.first_name} {user.last_name}</p>
                            <p className="card__email">{user.email}</p>
                        </div>
                        <h1 className="card__price"><span>$</span>20<span>.00</span></h1>
                        <p className="card__method">Payment method</p>
                        <div className="card__payment">
                            <img src="https://seeklogo.com/images/V/VISA-logo-F3440F512B-seeklogo.com.png" className="card__credit-card"/>
                            <div className="card__card-details">
                                <p className="card__card-type">Credit / debit card</p>
                                <p className="card__card-number">Visa ending in **42</p>
                            </div>
                        </div>
                    </div>
                    <div className="card__tags">
                        <span className="card__tag">completed</span>
                        <span className="card__tag">#123456789</span>
                    </div>
                    <button
                    onClick={()=>{navigate('/dash', { state: { user: user, currentOrder: currentOrder } });}}
                    >Click here to track your order</button>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccess;

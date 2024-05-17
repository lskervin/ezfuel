import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from "react";
import { Elements, useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import './css-styles/PaymentScreen.css'

const apiKey = import.meta.env.VITE_STRIPE_API_KEY;
const stripePromise = loadStripe(apiKey.toString());
console.log(apiKey.toString())
function PaymentForm({ currentOrder, user }) {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission or show a loading indicator.
            return;
        }

        const { cardnumber, expirationdate, securitycode } = event.target.elements;
        console.log(expirationdate)

    // Extract expiration month and year from the input value
    const [expMonth, expYear] = expirationdate.value.split('/');

        // Create a PaymentMethod object
        const paymentMethod = await stripe.createPaymentMethod({
            type: 'card',
            card: {
                number: cardnumber,
                exp_month: expMonth, // Use extracted expiration month
                exp_year: expYear,   // Use extracted expiration year
                cvc:securitycode
            }
        });
        if (paymentMethod.error) {
            console.error('Error creating PaymentMethod:', paymentMethod.error);
            return;
        }

        // Send the PaymentMethod ID to your server to complete the payment
        const response = await fetch('https://gas-flask-app.onrender.com/payment/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                paymentMethodId: paymentMethod.paymentMethod.id,
                amount: ((currentOrder.total * 1.18875).toFixed(2)) * 100, // Convert amount to cents
                currency: 'usd',
            }),
        });

        const responseData = await response.json();

        if (responseData.error) {
            console.error('Payment failed:', responseData.error.message);
            // Handle payment failure
        } else {
            console.log('Payment successful:', responseData.paymentIntent);
            // Handle payment success
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-container">
                <div className="field-container">
                    <label htmlFor="cardnumber">CardNumber</label>
                    <CardNumberElement id="cardnumber" options={{ style: { base: { fontSize: '16px' } } }} />
                </div>
                <div className="field-container">
                    <label htmlFor="expirationdate">Expiration (mm/yy)</label>
                    <CardExpiryElement id="expirationdate" options={{ style: { base: { fontSize: '16px' } } }} />
                </div>
                <div className="field-container">
                    <label htmlFor="securitycode">Security Code</label>
                    <CardCvcElement id="securitycode" options={{ style: { base: { fontSize: '16px' } } }} />
                    <button 
                    onClick={()=>{navigate('/payment-confirmation', { state: { order: currentOrder, userInfo: user } })}}>Confirm Payment</button>
                </div>
            </div>
        </form>
    );
}

function PaymentScreen(){
    const location = useLocation();
    const obj = location.state[0]
    const currentOrder = obj.order;
    const user = obj.userInfo;

    return(
        <div className="payment-step">
            <div style={{background:"#ffA500", boxShadow: '2px 5px 6px px black', borderRadius: '25px', border:'1px solid white'}} className='payment-details'>
                <h1 style={{color: "white", paddingLeft: '20px'}}>Payment Information</h1>
                <div className="cart" style={{marginBottom: '-10px', borderBottom:'1px solid white',borderTop:'1px solid white'}}>
                    <ul className="cartWrap">
                        <li className="items even">
                            <div className="infoWrap"> 
                                <div className="cartSection info">
                                    <img src="http://lorempixel.com/output/technics-q-c-300-300-4.jpg" alt="" className="itemImg" />

                                    <h3>{currentOrder.fuelType}</h3>
                                    <p> <input type="text"  className="qty" placeholder={currentOrder.quantity}/> x ${(currentOrder.price)}</p>
                                </div>  
                                <div className="prodTotal cartSection">
                                    <p>${(currentOrder.total * 1.18875).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="special"></div>
                        </li>
                    </ul>
                </div>
                <Elements stripe={stripePromise}>
                    <PaymentForm currentOrder={currentOrder} user={user} />
                </Elements>
            </div>
        </div>
    )
}

export default PaymentScreen;

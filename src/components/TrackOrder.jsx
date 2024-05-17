import { useLocation, useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './css-styles/TrackOrder.css'

function TrackOrder() {
    const location = useLocation();
    const [userObj, setUserObj]= useState(location.state)
    const navigate = useNavigate();
    return (
        <div>
            <div class="header">
	<h1>Shipment Track</h1>
</div>
<div class="content-track">
<div class="content1">
		<h2>Order Tracking: Order No 3 <button
        onClick={()=>{navigate('/dash', { state: { userObj } })}}
        > Back To Dashboard</button></h2>

	</div>
<div class="content2">
		<div class="content2-header1">
			<p>Status : <span>Waiting For Driver</span></p>
		</div>
		<div class="content2-header1">
			<p>Expected Delivery Time : <span>30-45 mins</span></p>
		</div>
		<div class="clear"></div>
	</div>
<div class="content3">
        <div class="shipment">
			<div class="confirm">
                <div class="imgcircle">

            	</div>
				<span class="line"></span>
				<p>Confirmed Order</p>
			</div>
			<div class="process">
           	 	<div class="imgcircle">
            	</div>
				<span class="line"></span>
				<p>Processing Order</p>
			</div>
			<div class="quality">
				<div class="imgcircle">
            	</div>
				<span class="line"></span>
				<p>Driver Assigned</p>
			</div>
			<div class="dispatch">
				<div class="imgcircle">

            	</div>
				<span class="line"></span>
				<p>Driver on their way!</p>
			</div>
			<div class="delivery">
				<div class="imgcircle">

				</div>
				<p>EZFuel Complete</p>
			</div>
			<div class="clear"></div>
		</div>
</div>
</div>
        </div>
    );
}

export default TrackOrder;

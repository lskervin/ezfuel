import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './user-auth-screens/Signup';
import LicensePlateSearch from './license-plate-widget/LicensePlateSearch'
import CarProfile from './components/CarProfile';
import Dash from './components/Dash.jsx'
import AddressSearch from './google-widgets/AddressSearch';
import Login from './user-auth-screens/Login';
import App from './views/App'
import './views/index.css'
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import Checkout from './components/Checkout.jsx'
import NewOrder from './components/NewOrder.jsx'
import EditProfile from './components/EditProfile.jsx';
import PaymentScreen from './components/PaymentScreen.jsx'
import PaymentSuccess from './components/PaymentSuccess.jsx'
import TrackOrder from './components/TrackOrder.jsx';




const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/sign-in',
        element: <Login />
      },
      {
        path: '/sign-up',
        element: <Signup/>
      },
      {
        path: '/carfinder',
        element: <LicensePlateSearch/>
      },
      {
        path: '/address',
        element: <AddressSearch/>
      },
      {
        path: '/dash',
        element: <Dash/>
      },
      {
        path: '/editprofile',
        element: <EditProfile/>
      },
      {
        path: '/checkout',
        element: <Checkout/>
      },
      {
        path: '/neworder',
        element: <NewOrder/>
      },
      {
        path: '/car-profile',
        element: <CarProfile/>
      },
      {
        path: '/payment',
        element: <PaymentScreen/>
      },
      {
        path: '/payment-confirmation',
        element: <PaymentSuccess/>
      },
      {
        path: '/track-order',
        element: <TrackOrder/>
      }
    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/> 

  </React.StrictMode>
)

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import logo from '../assets/EZFuelLogo.png'
import './css-styles/EditProfile.css'
import { useOutletContext } from 'react-router-dom';



const EditProfile = () => {

  const location = useLocation();
  const [userObj, setUserObj]= useState(location.state)
  const [user, setUser]= useState(userObj.user)
  const [isEdit, setIsEdit] = useState(false)
  const [formData, setFormData] = useState({
    first_name: user? user.first_name: "",
    last_name: user? user.last_name: "",
    email: user? user.email: "",
    cell_number: user? user.cell_number: "",
    mailing_address: user? user.mailing_address: ""
  });
  const navigate = useNavigate();
  console.log(user)
  console.log(formData)

  const handleSave = () =>{
    setIsEdit(!isEdit)
    fetch(`https://gas-flask-app.onrender.com/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    })
    .then(resp => {
      if (resp.ok) {
        resp.json()
        .then(newUser => {
          console.log(newUser); // Log the newUser variable
          console.log('Successfully updated!')

        });
      } else {
        console.log('Failed to add car try again!')
        return Promise.reject(resp)
      }
    })
    .catch(resp => resp.json())
    .then(data => setError(data))

  }
    return (
        <>
      <div className="navbar-top">
        <div className="title">
            <h1>Profile</h1>
        </div>
        <ul>
            <li>
                <button>
                    <span className="icon-count">59</span>
                    <i className="fa fa-bell fa-2x"><p style={{fontSize:"6px"}}>Notification</p></i>
                </button>
            </li>
            <li>
                <button href="#sign-out">
                    <i className="fa fa-sign-out-alt fa-2x"><p style={{fontSize:"6px", color:"red"}}>Log-Out</p></i>
                </button>

            </li>
        </ul>
   
    </div>

    <div className="main">
        <h2>IDENTITY</h2>
        <div className="card">
            {isEdit ? (<div className="card-body">
                <i onClick={()=>{setIsEdit(!isEdit)}} className="fa fa-pen fa-xs edit"></i> 
              <table>
                    <tbody>
                        <tr>
                            <td>First Name:</td>
                            <td></td>
                            <td>{user? formData.first_name: 'loading...'}</td>
                        </tr>
                        <tr>
                            <td>Last Name:</td>
                            <td></td>
                            <td>{user? formData.last_name: 'loading...'}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td></td>
                            <td>{user? formData.email: 'loading...'}</td>
                        </tr>
                        <tr>
                            <td>Cell:</td>
                            <td></td>
                            <td>{user? formData.cell_number: 'loading...'}</td>
                        </tr>
                        <tr>
                            <td>Mailing Address:</td>
                            <td></td>
                            <td>{user? formData.mailing_address: 'loading...'}</td>
                        </tr>
                        <tr>
                            <td>Skill:</td>
                            <td></td>
                            <td>PHP, HTML, CSS, Java</td>
                        </tr>
                    </tbody>
                </table>
            </div>):(
              <>
              <button><i onClick={handleSave} className="fa fa-save fa-xs save"></i></button>
              <table>
              <tbody>
              <tr>
                <td>First Name:</td>
                <td></td>
                <td 
                  contentEditable="true" 
                  onInput={(e) => {
                    const inputValue = e.target.innerText;
                    setFormData({ ...formData, first_name: inputValue });
                  }}
                >
                  {user? formData.first_name: "loading..."}
                </td>
              </tr>
                  <tr>
                      <td>Last Name:</td>
                      <td></td>
                      <td contentEditable="true" 
                  onInput={(e) => {
                    const inputValue = e.target.innerText;
                    setFormData({ ...formData, last_name: inputValue });
                  }}>
                    {user? formData.last_name: "loading..."}
                  </td>
                  </tr>
                  <tr>
                      <td>Email:</td>
                      <td></td>
                      <td contentEditable="true" 
                  onInput={(e) => {
                    const inputValue = e.target.innerText;
                    setFormData({ ...formData, email: inputValue });
                  }}>
                    {user? formData.email: "loading..."}
                  </td>
                  </tr>
                  <tr>
                      <td>Cell:</td>
                      <td></td>
                      <td contentEditable="true" 
                  onInput={(e) => {
                    const inputValue = e.target.innerText;
                    setFormData({ ...formData, cell_number: inputValue });
                  }}>
                    {user? formData.cell_number: "loading..."}
                    </td>
                  </tr>
                  <tr>
                  <td>Mailing Address:</td>
                      <td></td>
                      <td contentEditable="true" 
                  onInput={(e) => {
                    const inputValue = e.target.innerText;
                    setFormData({ ...formData, mailing_address: inputValue });
                  }}>
                    {user? formData.mailing_address: "loading..."}
                    </td>
                  </tr>
              </tbody>
          </table>
          </>
            )}
        </div>
        <button onClick={()=>{navigate('/dash', { state: { user } })}}>Back To DashBoard</button>
    </div>
    </>
    );
  };
  
  export default EditProfile;
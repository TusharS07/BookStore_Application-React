import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from '@mui/material';
import './Header.css';
import { toast } from 'react-toastify';

const Header = () => {

    let navigate = useNavigate();
    
    


    const logOutHandler = () => {
        console.log(localStorage.getItem("Token"));
        axios.post(`http://localhost:8083/UserPage/Logout?token=${localStorage.getItem("Token")}`)
        .then((res) => {
            toast.success(res.data.message);
            localStorage.clear()
            setTimeout(() => { navigate("/"); }, 2000);
        })
        .catch((error) => {
            toast.error(error.response.data);
            console.log(error);
          });
    }

    const searchBook= () => {

    }

    
    


  return (
    <div>
        <header>
        <div className="project">
            <AutoStoriesIcon color="action" fontSize='large' className="projecticon" />
                <label className="projectname" onClick = {() => { navigate("/")}}>BookStore</label>
            <input type="text" id='myInput' onKeyUp={searchBook} placeholder="Search for Book.." title="Type in a name"/>

            {localStorage.getItem("Token") === null &&
                <button onClick = {() => { navigate("/Signup") }} className="signUpbutton">REGISTER</button>
            }

            {localStorage.getItem("Token") === null &&
                <button onClick = {() => { navigate("/Login") }} className="loginbutton">Login</button>
            }

            {localStorage.getItem("Token") != null &&
                <button onClick = {logOutHandler} className="logOutbutton">Logout</button>
            }
            
            {localStorage.getItem("Token") != null &&
                <div className="projectcart">
                <IconButton onClick = {() => { navigate("/Cart")}} aria-label="cart">
                    <text>Cart</text>
                        <ShoppingCartIcon />
                </IconButton>
            </div>
            }
            
            
        </div>
        </header>
    </div>
  )
}

export default Header
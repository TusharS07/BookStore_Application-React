import { Avatar, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'

const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [userData, setUserData] = useState({});

    let navigate = useNavigate();
    let token = localStorage.getItem("Token");

    useEffect (() => {
        axios.get("http://localhost:8087/UserPage/Get_Data/user", token)
        .then((responce) => {
            console.log(responce.data.obj);
            const data = responce.data.obj;
            setUserData(data);
            console.log(data);
        })
        .catch(error => console.log(error));
    })


    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(value)
    }

    const handleSubmit = () => {
        console.log(user)
        if (user.email === "" || user.password === "") {
            alert("Please provide login details.")
        }
        else {
            axios.post("http://localhost:8087/UserPage/Login", user)
               .then((responce) => {
                 localStorage.setItem("Token", responce.data.obj);
                 console.log(localStorage.getItem("Token"))
                 toast.success("User Logged Successfully");
                 if (userData.role === "Admin") {
                    setTimeout(() => { navigate("/Admin"); }, 2000);
                 }
                 else {
                    setTimeout(() => { navigate("/"); }, 2000);
                 }
               })
               .catch((error) => { console.log(error) })
        }
    }
  return (
    <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
    >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Login 
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
                onChange={onChangeHandler}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address/UserId"
                name="email"
                autoComplete="off"
                autoFocus
            />
            <TextField
                onChange={onChangeHandler}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
            />
  
            <Button
                onClick={handleSubmit}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign In
            </Button>
            <Grid item>
                <Link onClick={() => { navigate("/Signup") }} variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
            </Grid>
        </Box>
        <ToastContainer autoClose={2000} />
    </Box>
  )
}

export default Login
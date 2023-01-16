import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Button, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [locality, setLocality] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [landMark, setLandMark] = useState("");
    const [addressType, setAddressType] = useState("");


    let user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phoneNo: phoneNo,
        pinCode: pinCode,
        locality: locality,
        address: address,
        city: city,
        landMark: landMark,
        addressType: addressType,
        cartModel: {
            cartId: 0
        }
    }

    console.log(user);


    let navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8087/UserPage/Register_New_User", user)
           .then((responce) => { toast.success(responce.data.message);
            setTimeout(() => { navigate("/Login"); }, 3000);
            })
            .catch((error) => { console.log(error) })
    };

  return (
    <Container component= "main" maxWidth="md">
        <CssBaseline/>
        <Box
            sx={{
                marginTop: 4,
                display:"flex",
                flexDirection:"column",
                alignItems:"center"

            }}
        >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h6">
                Sign Up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            onChange={(event) => {setFirstName(event.target.value)}}
                            required
                            fullWidth
                            id="FirstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="off"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            onChange={(event) => {setLastName(event.target.value)}}
                            required
                            fullWidth
                            id="LastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="off"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            onChange={(event) => {setEmail(event.target.value)}}
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="off"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            onChange={(event) => {setAddress(event.target.value)}}
                            required
                            fullWidth
                            id="address"
                            label="Address"
                            name="address"
                            autoComplete="off"
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={(event) => {setLocality(event.target.value)}}
                            required
                            fullWidth
                            id="locality"
                            label="Locality"
                            name="locality"
                            autoComplete="off"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={(event) => {setLandMark(event.target.value)}}
                            required
                            fullWidth
                            id="landMark"
                            label="Landmark"
                            name="landMark"
                            autoComplete="off"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={(event) => {setPinCode(event.target.value)}}
                            autoComplete="off"
                            name="pinCode"
                            required
                            fullWidth
                            id="pinCode"
                            label="Pin Code"
                            autoFocus
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                           onChange={(event) => {setCity(event.target.value)}}
                            required
                            fullWidth
                            id="city"
                            label="City"
                            name="city"
                            autoComplete="off"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={(event) => {setPhoneNo(event.target.value)}}
                            fullWidth
                            id="phoneNo"
                            label="Mobile Number"
                            name="phoneNo"
                            autoComplete="off"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={(event) => {setAddressType(event.target.value)}}
                            required
                            fullWidth
                            id="addressType"
                            label="Address Type"
                            name="addressType"
                            autoComplete="off"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            onChange={(event) => {setPassword(event.target.value)}}
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                        />
                    </Grid>
                </Grid>

                <Button
                    onClick={handleSubmit}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>

                <Grid Container justifyContent= "flex-end">
                    <Grid item>
                        <Link onClick={ () => { navigate("/Login") }} variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            <ToastContainer autoClose={2000} />
        </Box>
    </Container>
  );
}

export default SignUp
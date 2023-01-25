import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './PlaceOrder.css';
import InputAdornment from '@mui/material/InputAdornment';
import { Accordion, AccordionSummary, Box, Button, Grid, TextField, Typography } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ExpandMore } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlacedSuccessfull from '../../pages/Order/PlacedSuccessfull';


const PlaceOrder = () => {
    let navigate = useNavigate();

    const [cartBooks, setCartBooks] = useState([]);
    const [userData, setUserData] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [totalCartAmount, setTotalCartAmount] = useState(0);
    const [totalCartQty, setTotalCartQty] = useState(0);


    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [locality, setLocality] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [landMark, setLandMark] = useState("");
    const [addressType, setAddressType] = useState("");


    let shippingAddress = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNo: userData.phoneNo,
        pinCode: userData.pinCode,
        locality: userData.locality,
        address: userData.address,
        city: userData.city,
        landMark: userData.landMark,
        addressType: userData.addressType,
    }


    useEffect(() => {
      document.title = 'Place Order';
      fetchCartData();
      fetchTotalCartBooksPriceAndQty();
      fetchUserData();
    }, [])


    const fetchUserData = () => {
        axios.get(`http://localhost:8083/UserPage/Get_Data/user?token=${localStorage.getItem("Token")}`)
        .then((res) => {
            console.log(res.data.obj)
            setUserData(res.data.obj)
        })
        .catch((err) => {
            console.log(err.response.data)
        })
    }

    const fetchCartData = () => {
      axios.get(`http://localhost:8083/CartPage/Show_Cart_Record?token=${localStorage.getItem("Token")}`)
      .then((res) => {
        console.log(res.data.obj)
        setCartBooks(res.data.obj);
      })
      .catch((err) => {
        console.log(err.response.data)
      })
    }

    const fetchTotalCartBooksPriceAndQty = () => {
        axios.get(`http://localhost:8083/CartPage/Get_Total-Cart_Amount-Qty?token=${localStorage.getItem("Token")}`)
        .then((res)=> {
            console.log(res.data.obj);
            setTotalCartAmount(res.data.obj[0]);
            setTotalCartQty(res.data.obj[1]);
        })
        .catch((err) => {
            console.log(err.response.data)
        })
    }

    const placeOrder = () => {
        axios.post(`http://localhost:8083/OrderPage/placeOrder?token=${localStorage.getItem("Token")}`,shippingAddress)
        .then((res) => {
            toast.success(res.data.message, {position: toast.POSITION.TOP_CENTER} );
            setOrderDetails(res.data.obj)
            console.log(res.data)
            setTimeout(() => { navigate("/OrderSuccessful"); }, 4000);
          })
          .catch((err) => {
            toast.error(err.response.data);
        });
    }

    function ccyFormat(num) {
        return `${num.toFixed(2)}`;
    }

  return (
    <div>
        <Header/>
        <div>
            <div className='orderContainer'>
                <Accordion sx={{ width: '70%', justifyContent: 'center' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMore/>}
                        aria-controls="panel1a-content"
                        id='panel1a-header'
                        sx={{ height: '80px', marginLeft: '5%', marginRight: '5%' }}
                    >
                        <Typography variant='h4' gutterBottom><b>Order Summary</b></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="containerData">
                        <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={1}><h2>Book Name</h2></TableCell>
                                <TableCell colSpan={1} align="left"><h2>Authore Name</h2></TableCell>
                                <TableCell colSpan={1} align="center"><h2>Quantity</h2></TableCell>
                                <TableCell colSpan={1} align="center"><h2>Price</h2></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {cartBooks.length>0 ? cartBooks.map((book) => {
                                return (
                                    <TableRow key={book.cartBookId}>
                                        <TableCell colSpan={1}>{book.books.bookName}</TableCell>
                                        <TableCell colSpan={1} align="left">{book.books.authorName}</TableCell>
                                        <TableCell colSpan={1} align="center">{book.quantity}</TableCell>
                                        <TableCell colSpan={1} align="center">₹{ccyFormat(book.totalPrice)}</TableCell>
                                    </TableRow>
                                )
                                }): "no Books"
                            }

                            <TableRow/>
                            <TableRow>
                                <TableCell colSpan={2}><h2>Total</h2></TableCell>
                                <TableCell align="center"><h2>{totalCartQty}</h2></TableCell>
                                <TableCell  align="center"><h2>₹{ccyFormat(totalCartAmount)}</h2></TableCell>
                            </TableRow>
                        </TableBody>
                        </Table>
                        </TableContainer> 
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div className='orderContainer'>
                <Accordion sx={{ width: '70%', justifyContent: 'center' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMore/>}
                        aria-controls="panel1a-content"
                        id='panel1a-header'
                        sx={{ height: '80px', marginLeft: '5%', marginRight: '5%' }}
                    >
                        <Typography variant="h4" gutterBottom><b>Shipping Details</b></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box component="form" noValidation sx={{ mt: 3}}>
                            <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(event) => {setFirstName(event.target.value)}}
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">First Name:</InputAdornment>,
                                      }}
                                    name='firstName'
                                    autoComplete='off'
                                    value={userData.firstName}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(event) => {setLastName(event.target.value)}}
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">Last Name:</InputAdornment>,
                                      }}
                                    name='lastName'
                                    autoComplete='off'
                                    value={userData.lastName}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(event) => {setAddress(event.target.value)}}
                                    required
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">Address:</InputAdornment>,
                                      }}
                                    name='address'
                                    autoComplete='off'
                                    value={userData.address}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(event) => {setLocality(event.target.value)}}
                                    required
                                    fullWidth
                                    id="locality"
                                    label="Locality"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">Locality:</InputAdornment>,
                                      }}
                                    name='locality'
                                    autoComplete='off'
                                    value={userData.locality}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    onChange={(event) => {setCity(event.target.value)}}
                                    required
                                    fullWidth
                                    id="city"
                                    label="City"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">City:</InputAdornment>,
                                      }}
                                    name='city'
                                    autoComplete='off'
                                    value={userData.city}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    onChange={(event) => {setPinCode(event.target.value)}}
                                    required
                                    fullWidth
                                    id="pinCode"
                                    label="Pin Code"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">Pin Code:</InputAdornment>,
                                      }}
                                    name='pinCode'
                                    autoComplete='off'
                                    value={userData.pinCode}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    onChange={(event) => {setLandMark(event.target.value)}}
                                    required
                                    fullWidth
                                    id="landMark"
                                    label="Landmark"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">Landmark:</InputAdornment>,
                                      }}
                                    name='landMark'
                                    autoComplete='off'
                                    value={userData.landMark}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(event) => {setPhoneNo(event.target.value)}}
                                    required
                                    fullWidth
                                    id="phoneNo"
                                    label="Contact Number"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">Contact No:</InputAdornment>,
                                      }}
                                    name='phoneNo'
                                    autoComplete='off'
                                    value={userData.phoneNo}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(event) => {setAddressType(event.target.value)}}
                                    required
                                    fullWidth
                                    id="addressType"
                                    label="Address Type(Home/Work/Other)"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">Address Type:</InputAdornment>,
                                      }}
                                    name='addressType'
                                    autoComplete='off'
                                    value={userData.addressType}
                                />
                            </Grid>
                            </Grid>
                            <Button
                                disabled={cartBooks.length === 0}
                                onClick={placeOrder}
                                variant="contained"
                                sx={{ mt: 3, mb: 2, ml: '42.8%' , fontWeight: 'bold' }}
                            >
                                checkout
                            </Button>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
        <ToastContainer autoClose={2000} />
    </div>
  )
}

export default PlaceOrder
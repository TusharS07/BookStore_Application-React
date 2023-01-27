import { Card, CardActions, CardContent, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast, ToastContainer } from 'react-toastify';
import './Orders.css';


const Orders = () => {

    let navigate = useNavigate();

    const [ orders, setOrders] = useState([])

    useEffect (() => {
        document.title = 'Orders';
        fetchOrders();
    })

    const fetchOrders = () => {
        axios.get(`http://localhost:8083/OrderPage/Show_All_Orders/User?token=${localStorage.getItem("Token")}`)
        .then((res) => {
            console.log(res.data.obj)
            setOrders(res.data.obj);
        })
        .catch((err) => {
            console.log(err.response.data)
        })
    }

    const cancelOrder = (orderId) => {
        axios.post(`http://localhost:8083/OrderPage/Cancel_Order?orderId=${orderId}&token=${localStorage.getItem("Token")}`)
        .then((res) => {
            toast.success(res.data.message, {position: toast.POSITION.BOTTOM_CENTER});
            console.log(res.data)
            fetchOrders();
        })
        .catch((err) => {
            toast.error(err.response.data);
        });
    }

  return (
    <div>
        <Header/>
        <div className='containerbody'>
        <div className='container'>
        <div className='cardcontainer'>
        {orders.length>0 ? (orders.map((order) => {
                console.log(orders.length);
                return (
                        <Card key={order.orderId} className='card' sx={{ maxWidth: 200 }}>
                            {order.isCancel === true &&
                            <h1 className='content'>Order is cancelled</h1>}
                                <CardContent class="cardcontent">
                                    <label className='cardtitle'>
                                        Order-Id:- {order.orderId}
                                    </label><br/>

                                    <label className='cardtitle'>
                                    Order Quantity:- {order.orderQuantity}
                                    </label><br />

                                    <label className='cardtitle'>
                                        Total Order Price:- Rs.{order.price}
                                    </label><br />
                                </CardContent>

                                <CardActions>
                                    <Button onClick={() => cancelOrder(order.orderId)} disabled={order.isCancel === true} variant="outlined" startIcon={<DeleteIcon />}>
                                        Cancel
                                    </Button>
                                </CardActions>
                        </Card>
                )
            })) : "no orders available"
            }
        </div>
        </div>
        </div>
        <ToastContainer autoClose={2000} />  
    </div>
  )
}

export default Orders
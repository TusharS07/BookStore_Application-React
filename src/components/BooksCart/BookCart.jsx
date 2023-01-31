import { Button, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header';
import { toast, ToastContainer } from 'react-toastify';
import './BookCart.css';
import emptyCartImg from '../../assets/empty_cart.png';

const BookCart = () => {

    let navigate = useNavigate();

    const [cartBooks, setCartBooks] = useState([])
    const [totalCartAmount, setTotalCartAmount] = useState(0)


    useEffect(() => {
      document.title = 'Cart';
      fetchCartData();
    }, [])

    const fetchCartData = () => {
      axios.get(`http://localhost:8083/CartPage/Show_Cart_Record?token=${localStorage.getItem("Token")}`)
      .then((res) => {
        console.log(res.data.obj)
        setCartBooks(res.data.obj);
      })
      .catch((err) => {
        console.log(err.response.data)
      })
      console.log(cartBooks.length)
    }


    const increaseBookQty= (bookId) => {
      axios.put(`http://localhost:8083/CartPage/IncreaseBookQty?bookId=${bookId}&token=${localStorage.getItem("Token")}`)
      .then((res) => {
        toast.success(res.data.message, {position: toast.POSITION.BOTTOM_CENTER} );
        console.log(res.data)
        fetchCartData();
      })
      .catch((err) => {
        toast.error(err.response.data);
    });
    }

    const decreaseBookQty= (bookId) => {
      axios.put(`http://localhost:8083/CartPage/DecreaseBookQty?bookId=${bookId}&token=${localStorage.getItem("Token")}`)
      .then((res) => {
        toast.success(res.data.message, {position: toast.POSITION.BOTTOM_CENTER});
        fetchCartData();
      })
      .catch((err) => {
        toast.error(err.response.data);
    });
    }

    const removeBookFromCart=(id) => {
      axios.delete(`http://localhost:8083/CartPage/Remove_Book_From_Cart?cartBookId=${id}&token=${localStorage.getItem("Token")}`)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message, {position: toast.POSITION.BOTTOM_CENTER});
        fetchCartData();
    })
    .catch((err) => {
        console.log(err);
    });
    }


  return (
    <div>
      <Header/>
      <div className='cartContainer'>
        {cartBooks.length>0 ? (cartBooks.map((cartBook) => {
          console.log(cartBooks.length);
          return (
            <div className='cartcontainerbody'>
              <Card key={cartBook.cartBookId} className='card' sx={{ display: 'flex', marginBottom: '1%', marginTop: '1%', width: '75%', maxHeight: '90%' }}>
                <div>
                  <CardMedia
                    component="img"
                    height="100px"
                    image={`../../uploads/${cartBook.books.profilePic}`}
                    alt="Image not Available"
                    sx={{ objectFit: "contain", width: '150px' }} />
                </div>
                <div className='cardContent'>
                  <CardContent class="cardcontent">
                    <label className='cardtitle'>
                        {cartBook.books.bookName}
                    </label><br />

                    <label className='authorname'>
                        {cartBook.books.authorName}
                    </label><br />

                    <label className='cardtitle'>
                        Rs. {cartBook.totalPrice}
                    </label><br />

                    <div className='countOfItems'>
                      <button onClick={() => decreaseBookQty(cartBook.books.bookId)} disabled={cartBook.quantity === 1}> - </button>
                      <input  value={cartBook.quantity} className="count" type="text" name="countOfBook" id="Name" required />
                      <button onClick={() => increaseBookQty(cartBook.books.bookId)}> + </button>
                    </div>
                  </CardContent>
                </div>
                <div className='cardAction'>
                  <CardActions>
                    <Button onClick={() => removeBookFromCart(cartBook.cartBookId)} variant="outlined" startIcon={<DeleteIcon />}>
                        Remove
                    </Button>
                  </CardActions>
                </div>
              </Card>
            </div>
          );
        })):(<img src={emptyCartImg} className="emptyCartImg"/>)
      }{cartBooks.length>0 &&
      <button class="place-order" onClick = {() => { navigate("/PlaceOrder") }}>
        Place Order
      </button> 
      }      
      </div>
      <ToastContainer autoClose={2000} />  
    </div>
  )
}

export default BookCart
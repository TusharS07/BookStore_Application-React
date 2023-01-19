import { Button, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import Header from '../Header/Header';
import './Home.css';
import Pagination from '../pagination/Pagination';



const Home = () => {
  const [books, setBooks] = useState([]);
  const [login, setLogin] = useState(false);
  const [showPerPage,setShowPerPage]=useState(8);
  const [pagination,setPagination]=useState({start:0,end:showPerPage})

  const onPaginationChange=(start,end)=>{
    setPagination({start:start,end:end})
  }
  
  useEffect (() => {
    fetchBooks();
    if (localStorage.getItem("Token") === null) {
      setLogin(false)
      console.log(localStorage.getItem("Token"))
    } else {
      setLogin(true)
      console.log(localStorage.getItem("Token"))
    } 
  }, [])

  const fetchBooks =() => {
    axios.get("http://localhost:8083/BooksPage/Show All Books Data")
    .then((response) => {
      setBooks(response.data.obj)
      console.log(response.data.obj)
      console.log(books) 
    })
  }

  const addToCart = (bookId) => {
    if (login) {
      axios.post(`http://localhost:8083/CartPage/AddToCart?bookId=${bookId}&token=${localStorage.getItem("Token")}`)
      .then((res) => {
        toast.success(res.data.message)
        console.log(res)
      })
      .catch((err) => {
        toast.error(err.response.data);
        console.log(err);
      })
    } else {
      toast.error("Please Login to buy Book.");
    }
  }

  return (   
    <div>
      <Header/>
      <div className='containerbody'>
        <div className='container'>
          <div className='cardcontainer'>
            {
              books.length>0 ? books.slice(pagination.start,pagination.end).map((book) => {
                return (
                  <Card key={book.bookId} className='card' sx={{ maxWidth: 200 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image="src/Uploads/3dPrinting.PNG"
                      alt="Image Not Available"
                      sx={{ objectFit: "contain" }}
                    ></CardMedia>

                    {book.bookQuantity === 0 &&
                      <h1 className='content'>Out of Stock</h1>
                    }

                    <CardContent class="cardcontent">
                      <label className='cardtitle'>
                        {book.bookName}
                      </label><br />

                      <label className='authorname'>
                        by {book.authorName}
                      </label><br />

                      <label className='cardtitle'>
                        Rs. {book.price}
                      </label>
                    </CardContent>

                    <CardActions>
                      <Button disabled={book.bookQuantity === 0} onClick={() => addToCart(book.bookId)} size="small" variant="contained">Add To Cart</Button>
                      <Button variant="outlined" size="small">WishList</Button>
                    </CardActions>
                  </Card>
                )
              }): "No Books Avaikable Here"
            }
          </div>
          <div className='pagination'>
          <Pagination showPerPages={showPerPage} onPagination={onPaginationChange} totalPage={books.length}/>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  )
}

export default Home
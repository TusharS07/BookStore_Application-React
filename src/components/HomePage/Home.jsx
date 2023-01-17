import { Button, Card, CardActions, CardContent, CardMedia, Pagination, Stack } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../Header/Header';
import './Home.css';

const Home = () => {
  const [books, setBooks] = useState([]);


  useEffect (() => {
    fetchBooks()
    
  }, [])

  const fetchBooks =() => {
    axios.get("http://localhost:8087/BooksPage/Show All Books Data")
    .then((response) => {
      setBooks(response.data.obj)
      console.log(response.data.obj)
      console.log(books) 
    })
  }

  const addToCart = (bookId) => {

  }


  return (   
    <div>
      <Header/>
      <div className='containerbody'>
        <div className='container'>
          <div className='cardcontainer'>
            {
              books.map((book) => {
                return (
                  <Card key={book.bookId} className='card' sx={{ maxWidth: 200 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={book.profilePic}
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
              })
            }
          </div>
          <div className='pagination'>
            <Stack spacing={2}>
              <Pagination count={10} shape="rounded" />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
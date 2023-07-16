import { Button, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import Header from '../Header/Header';
import './Home.css';
import Pagination from '../pagination/Pagination';
import { ShoppingCartRounded } from '@mui/icons-material';



const Home = () => {
  const [books, setBooks] = useState([]);
  const [login, setLogin] = useState(false);
  const [showPerPage,setShowPerPage]=useState(8);
  const [pagination,setPagination]=useState({start:0,end:showPerPage})
  const[search, setSearch]= useState("")

  const onPaginationChange=(start,end)=>{
    setPagination({start:start,end:end})
  }
  
  useEffect (() => {
    document.title = 'Book-Store Home';
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
        toast.error(err.data.data);
        console.log(err);
      })
    } else {
      toast.error("Please Login to buy Book.");
    }
  }

  const sorting = (e) => {
    console.log(e.target.value);
    if (e.target.value === "Asc") {
      axios.get("http://localhost:8083/BooksPage/Sort_Books_By_Price_LowToHigh")
      .then((res) => {
        setBooks(res.data.obj);
      })
    }

    if (e.target.value === "Dsc") {
      axios.get("http://localhost:8083/BooksPage/Sort_Books_By_Price_HighToLow")
      .then((res) => {
        setBooks(res.data.obj);
      })
    }

    if (e.target.value === "New") {
      axios.get("http://localhost:8083/BooksPage/Sort_Books_By_Newest_Arrivals")
      .then((res) => {
        setBooks(res.data.obj);
      })
    }

  }

  return (   
    <div>
      <Header></Header>
      <div className='searchSortBar'>
      <text className='bookText'>Books
      </text>
      <input type="text" id='myInput' placeholder="Search for Book.." title="Type in a name" onChange={(event) => {setSearch(event.target.value)}}/>
      <select  className='selectBar' onChange={sorting}>
        <option >Sort by Relevance</option>
        <option value="Asc">Price: Low to High</option>
        <option value="Dsc">Price: High to Low</option>
        <option value="New">Newest Arrivals</option>  
      </select>
      </div>
      <div className='containerbody'>
        <div className='container'>
          <div className='cardcontainer'>
            {
              books.length>0 ? books.filter(book => {
                if (search === " ") {
                  return book;
                } else if (book.bookName.toLowerCase().includes(search) || book.authorName.toLowerCase().includes(search) ){
                  return book;
                }
              }).slice(pagination.start,pagination.end).map((book) => {
                return (
                  <Card key={book.bookId} className='card' sx={{ maxWidth: 200 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`./uploads/${book.profilePic}`}
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
                      <Button startIcon={<ShoppingCartRounded />} disabled={book.bookQuantity === 0} onClick={() => addToCart(book.bookId)} size="small" variant="contained">Add To Cart</Button>
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
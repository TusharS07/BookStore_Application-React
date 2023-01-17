import axios from 'axios'
import React, { useEffect, useState } from 'react'

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


  return (
    
    <div>Home</div>
  )
}

export default Home
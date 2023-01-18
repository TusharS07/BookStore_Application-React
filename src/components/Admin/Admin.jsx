import { Avatar, Box, Button, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import React, { useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const Admin = () => {

  const [bookName, setBookName] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [bookQuantity, setBookQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [profilePic, setProfilePic] = useState("");

  let BookData = {
    bookName: bookName,
    authorName: authorName,
    bookQuantity: bookQuantity,
    price: price,
    profilePic: profilePic.name,
    bookDescription: bookDescription
  }

  

  const handleSubmit = (e) => {
    e.preventDefault();
      console.log(BookData);
      axios.post(`http://localhost:8083/BooksPage/Add_Books/Admin?token=${localStorage.getItem("Token")}`, BookData)
     .then((res) => {
        console.log(res.data);
        console.log(profilePic);
        toast.success(res.data.message);
     })
     .catch((error) => {
        toast.error(error.response.data);
        console.log(error) }) 
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
        <Avatar sx={{ m : 1, bgcolor: "secondary.main" }}>
          <MenuBookTwoToneIcon />
        </Avatar>
        <Typography component="h1" variant="h6">
          Add Books
        </Typography>
        <Box component="form" noValidate sx={{ mt : 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => {setBookName(event.target.value)}}
                required
                fullWidth
                id="bookName"
                label="Book Name"
                name="bookName"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                onChange={(event) => {setBookDescription(event.target.value)}}
                required
                fullWidth
                id="bookDescription"
                label="Book Description"
                name="bookDescription"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(event) => {setAuthorName(event.target.value)}}
                required
                fullWidth
                id="authorName"
                label="Book AuthorName"
                name="authorName"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField 
                type="file"
                accept='image/*'
                onChange={(event) => {setProfilePic(event.target.files[0])}}
                required
                fullWidth
                id="profilePic"
                name="profilePic"
                InputProps={{
                  endAdornment: <InputAdornment position="end">Upload Book Image</InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(event) => {setBookQuantity(event.target.value)}}
                required
                fullWidth
                id="bookQuantity"
                label="Book Quantity"
                name="bookQuantity"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(event) => {setPrice(event.target.value)}}
                required
                fullWidth
                id="price"
                label="Book Price"
                name="price"
                autoComplete="off"
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
            Submit
          </Button>
        </Box>
        <ToastContainer autoClose={2000} />
        </Box>  
    </Container>
  )
}

export default Admin
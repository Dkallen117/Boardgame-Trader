import React, { useState } from 'react';

import {Box, TextField, Button, Grid, MenuItem, InputAdornment} from '@mui/material';

import { useMutation } from '@apollo/client';
import { ADD_LISTING } from '../../utils/mutations';

import data from '../../utils/data';

import Auth from '../../utils/auth';

const ListingForm = () => {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    quantity: 1,
    price: '',
    genre: '',
    img: '',
  });
  const [addUser] = useMutation(ADD_LISTING);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    switch(name) {
      default: 
        setFormState({
          ...formState,
          [name]: value,
        });
        break;
      case 'price': 
        setFormState({
          ...formState,
          price: parseFloat(value),
        });
        break;
      case 'quantity': 
        setFormState({
          ...formState,
          quantity: parseInt(value),
        });
        break;
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const userData = await Auth.getProfile();
      if(!userData) {
        alert('Log in foo');
        return false
      }
      
      const response = await addUser({
        variables: { listingInput: formState },
      });
      window.location.replace(`/listing/${response.data.addListing._id}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={handleFormSubmit}
    >
      <h1>Create a New Listing</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
          fullWidth
          required         
          label="Title"
          name="title"
          variant="outlined"
          defaultValue={formState.title}
          onChange={handleChange}
          />
        </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          label="Description"
          name="description"
          variant="outlined"
          defaultValue={formState.description}
          onChange={handleChange}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="URL Link to Image"
          name="img"
          variant="outlined"
          defaultValue={formState.img}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          required
          type='number'
          id='outlined-start-adornment'
          label="Price"
          name="price"
          variant="outlined"
          defaultValue={formState.price}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
            inputProps: {
              placeholder: '0.00',
              min: 0.00,
              step: 0.01
            }
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          required
          type='number'
          id='outlined-start-adornment'
          label="Quantity"
          name="quantity"
          variant="outlined"
          defaultValue={formState.quantity}
          onChange={handleChange}
          InputProps={{ inputProps: { min: 1 } }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          select
          id='outlined-start-adornment'
          label="Genre"
          name="genre"
          variant="outlined"
          defaultValue={formState.genre}
          onChange={handleChange}
        >
          {data.genres.map(genre => (
            <MenuItem value={genre}>{genre}</MenuItem>
          ))}
          
        </TextField>
      </Grid>

      <Grid item>
        <Button  type="submit"
         variant="contained"
        >Create</Button>
      </Grid>

      </Grid>
    </Box>
  );
};

export default ListingForm;
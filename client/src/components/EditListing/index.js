import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import {Box, TextField, Button, Grid, MenuItem, InputAdornment, Container} from '@mui/material';

import { useMutation, useQuery } from '@apollo/client';
import { EDIT_LISTING } from '../../utils/mutations';
import { QUERY_SINGLE_LISTING } from '../../utils/queries';

import Auth from '../../utils/auth';

const EditListing = () => {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    quantity: 1,
    price: '',
    genre: '',
    img: '',
  });

  const { listingId } = useParams();
  console.log(listingId)
  
  const query = useQuery(QUERY_SINGLE_LISTING, {
    variables: { listingId: listingId },
    onCompleted: () => {
      setFormState({
        title: query.data.listing.title,
        description: query.data.listing.description,
        quantity: query.data.listing.quantity,
        price: query.data.listing.price,
        genre: query.data.listing.genre,
        img: query.data.listing.img,
      })
    }
  });

  const [editListing, { error, data }] = useMutation(EDIT_LISTING);

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
    console.log(formState)
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
  
    try {
      const userData = await Auth.getProfile();
      if(!userData) {
        alert('Log in foo');
        return false
      }

      const response = await editListing({
        variables: { listingId, listingInput: formState },
      });

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      {query.loading ? (
        <h1>Loading...</h1>
      ) : (
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleFormSubmit}
      >
        <h1>Edit a Listing</h1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
            fullWidth
            required         
            label="Title"
            name="title"
            variant="outlined"
            defaultValue={query.data.listing.title}
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
            defaultValue={query.data.listing.description}
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
            defaultValue={query.data.listing.img}
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
            defaultValue={query.data.listing.price}
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
            defaultValue={query.data.listing.quantity}
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
            defaultValue={query.data.listing.genre}
            onChange={handleChange}
          >
            <MenuItem value='Classic'>Classic</MenuItem>
            <MenuItem value='Card Game'>Card Game</MenuItem>
            <MenuItem value='Strategy'>Strategy</MenuItem>
            <MenuItem value='Word Game'>Word Game</MenuItem>
          </TextField>
        </Grid>

        <Grid item>
          <Button  type="submit"
           variant="contained"
          >Save</Button>
        </Grid>

        </Grid>
      </Box>
    )}
    </Container>
  );
};

export default EditListing;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);


  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleFormSubmit}
      >
      <div>
      <TextField
        required
        className="form-input"
        id="filled-required"
        label="Username"
        type="username"
        name="username"
        variant="filled"
        defaultValue={formState.username}
        onChange={handleChange}
      />
      <TextField
        required
        className="form-input"
        id="filled-required"
        label="Email"
        type="email"
        name="email"
        variant="filled"
        defaultValue={formState.email}
        onChange={handleChange}
      />
      <TextField
        required
        className="form-input"
        id="filled-password-input"
        label="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        variant="filled"
        defaultValue={formState.password}
        onChange={handleChange}


      />
      </div>
      <Button  type="submit"
       variant="contained"
       >Sign Up</Button>
  </Box>
  );
};

export default Signup;

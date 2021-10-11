import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Login (props)  {
  const [formState, setFormState] = useState({ email: '', password: '' });

  const [login] = useMutation(LOGIN_USER);
  const [open, setOpen] = React.useState(false);
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value)
    setFormState({
      ...formState,
      [name]: value,
    });
  
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {

      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({ email: '', password: '' });
  

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      >Log In</Button>
      <Button  href={`/signup`}
        variant='contained'
      >Need an account?</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
</Box>
  );
};

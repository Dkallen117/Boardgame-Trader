import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <Box
component="form"
sx={{
  '& .MuiTextField-root': { m: 1, width: '25ch' },
}}
noValidate
autoComplete="off"
>
<div>
<TextField
  required
  className="form-input"
  id="filled-required"
  label="Username"
  defaultValue="Username"
  variant="filled"
  onChange={handleChange}
/>
<TextField
  required
  className="form-input"
  id="filled-required"
  label="Email"
  type="email"
  defaultValue="Email"
  variant="filled"
  value={formState.email}
  onChange={handleChange}
/>
<TextField
  id="filled-password-input"
  label="Password"
  type="password"
  autoComplete="current-password"
  variant="filled"
  value={formState.password}
  onChange={handleChange}
/>
</div>
<Button onClick={() => {
    handleFormSubmit();
  }}
 variant="contained">Contained</Button>

</Box>
  );
};

export default Login;

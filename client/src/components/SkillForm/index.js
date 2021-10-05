
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_SKILL } from '../../utils/mutations';

import Auth from '../../utils/auth';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const SkillForm = ({ profileId }) => {
//   const [skill, setSkill] = useState('');

//   const [addSkill, { error }] = useMutation(ADD_SKILL);

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const data = await addSkill({
//         variables: { profileId, skill },
//       });

//       setSkill('');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h4>Endorse some more skills below.</h4>

//       {Auth.loggedIn() ? (
//         <form
//           className="flex-row justify-center justify-space-between-md align-center"
//           onSubmit={handleFormSubmit}
//         >
//           <div className="col-12 col-lg-9">
//             <input
//               placeholder="Endorse some skills..."
//               value={skill}
//               className="form-input w-100"
//               onChange={(event) => setSkill(event.target.value)}
//             />
//           </div>

//           <div className="col-12 col-lg-3">
//             <button className="btn btn-info btn-block py-3" type="submit">
//               Endorse Skill
//             </button>
//           </div>
//           {error && (
//             <div className="col-12 my-3 bg-danger text-white p-3">
//               {error.message}
//             </div>
//           )}
//         </form>
//       ) : (
//         <p>
//           You need to be logged in to endorse skills. Please{' '}
//           <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
//         </p>
//       )}
//     </div>
//   );
const [skill, setSkill] = useState('');

const [addSkill, { error }] = useMutation(ADD_SKILL);

const handleFormSubmit = async (event) => {
  event.preventDefault();

 try {
   const data = await addSkill({
     variables: { profileId, skill },
  });

  setSkill('');
 } catch (err) {
   console.error(err);
  }
};
return(
 
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
  id="filled-required"
  label="Required"
  defaultValue="Hello World"
  variant="filled"
/>
<TextField
  disabled
  id="filled-disabled"
  label="Disabled"
  defaultValue="Hello World"
  variant="filled"
/>
<TextField
  id="filled-password-input"
  label="Password"
  type="password"
  autoComplete="current-password"
  variant="filled"
/>
<TextField
  id="filled-read-only-input"
  label="Read Only"
  defaultValue="Hello World"
  InputProps={{
    readOnly: true,
  }}
  variant="filled"
/>
<TextField
  id="filled-number"
  label="Number"
  type="number"
  InputLabelProps={{
    shrink: true,
  }}
  variant="filled"
/>
<TextField
  id="filled-search"
  label="Search field"
  type="search"
  variant="filled"
/>
<TextField
  id="filled-helperText"
  label="Helper text"
  defaultValue="Default Value"
  helperText="Some important text"
  variant="filled"
/>
</div>
<Button onClick={() => {
    handleFormSubmit();
  }}
 variant="contained">Contained</Button>

</Box>
);
 };

export default SkillForm;

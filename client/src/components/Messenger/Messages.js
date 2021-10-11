import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: '50vh',
      width: '750px',
      padding: '10px 30px',
      margin: '-160px 400px',
    },
  });

export default function Messages() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            These are the displayed messages
        </div>
    )
}
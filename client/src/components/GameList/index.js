import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useHistory } from 'react-router-dom';

import { Grid } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import data from '../../utils/data';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const GameList = ({listings})  =>  {
  const [expanded, setExpanded] = React.useState(-1);
  const [results, editResults] = React.useState({
    category: '',
    sort: '',
    active: listings,
    last: [],
    original: listings,
  })

  const handleListChange = (event) => {
    console.log('Clicked!');
    // const name = event.target.name;
    // const value = event.target.value;
    // let category = results.category;
    // let list = results.active;

    // if(name === 'category') {
    //   list = listings.filter(item => item.genre === category);
    // }
    
    // if(name === 'sort') {
      
    // }
  };
  
  const handleExpandClick = (i) => {
    setExpanded(expanded === i ? -1 : i);
  };
  let history = useHistory();
 
  const [favorite, setFavorite] = useState([]);  

  const addToFavorite = _id => {
    if (!favorite.includes(_id)) setFavorite(favorite.concat(_id));
    console.log(_id);
  };


  
  return(
    <>

    <Grid container>

      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={results.category}
            name='category'
            label="Category"
            onChange={handleListChange}
            >
            <MenuItem value={''}>None</MenuItem>
            {data.genres.map((genre, i) => (
              <MenuItem value={genre} key={i}>{genre}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
    
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Sort</InputLabel>
          <Select
            value={results.sort}
            label="Sort"
            name='sort'
            onChange={handleListChange}
            >
            <MenuItem value={''}>None</MenuItem>
            <MenuItem value={'AA'}>Alphabetical Asc.</MenuItem>
            <MenuItem value={'AD'}>Alphabetical Desc.</MenuItem>
          </Select>
        </FormControl>
      </Grid>

    </Grid>

    <div className="flex-row justify-space-around" style={{ backgroundColor: "white",  }}>
    {listings &&
      results.active.map((listing, i) => (
    <Card key={listing._id} sx={{ my: 5, border: 3, width: "30%", boxShadow: "0px 10px 20px" }}>
      <CardHeader 
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            G
          </Avatar>
        }
        title={listing.title} 
        component='button'
        onClick={()=> history.push(`/listing/${listing._id}`)}
        sx={{my: 2, mx: "auto" }}
      > 
      </CardHeader> 
      <CardMedia
        component="img"
        height="194"
        image={listing.img}
        alt="Game"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" >
          {listing.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites"
        onClick={()=>addToFavorite(listing._id)}
       >
          <FavoriteIcon 
           />
        </IconButton>
        <ExpandMore        
          onClick={() => handleExpandClick(i)}
          aria-expanded={expanded === i}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded === i} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Listing Details:</Typography>
          <Typography  >
           Price: {listing.price}
          </Typography>
          <Typography >
          Quantity: {listing.quantity}
          </Typography>
          <Typography >
          Genre: {listing.genre}
          </Typography>
          <Typography>
            Seller: {listing?.seller?.username}
          </Typography>
        </CardContent>
      </Collapse>
    </Card> 
    ))}
    </div>
    </>
  )};       

  export default GameList;
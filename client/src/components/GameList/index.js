import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
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
import { ADD_FAVORITE } from '../../utils/mutations';
import { useMutation} from '@apollo/client';
import { Local } from '../../utils/local';
import Auth from '../../utils/auth';

import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const GameList = ({listings})  =>  {
  const [expanded, setExpanded] = React.useState(-1);
  const [category, setCategory] = React.useState('');
  const [activeList, setActiveList] = React.useState(listings);

  const handleCategoryChange = (event) => {
    const newCat = event.target.value
    setCategory(newCat);
    if(newCat) {
      const newList = listings.filter(item => item.genre === event.target.value);
      setActiveList(newList);
    } else {
      setActiveList(listings);
    }
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

  const [SearchTerms, setSearchTerms] = useState("");
 

  const onChangeSearch = (event) => {
 
   const newSearch = event.target.value;
   
 
   if(newSearch !== '') {
 
     const searchResult = listings.filter((listings) => {

      return listings.title.toLowerCase().startsWith(newSearch.toLowerCase())

     });
     setActiveList(searchResult);
    } else {
      setActiveList(listings);
    }
   
    setSearchTerms(newSearch);
 
  } 

  return(
    <>

    <Search>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
      placeholder="Search by Title"
     
      value = {SearchTerms}
      onChange={onChangeSearch}
    />
  </Search>

    <FormControl fullWidth>
      <InputLabel>Category</InputLabel>
      <Select
        value={category}
        label="Category"
        onChange={handleCategoryChange}
      >
        <MenuItem value={''}>None</MenuItem>
        {data.genres.map(genre => (
          <MenuItem value={genre}>{genre}</MenuItem>
        ))}

      </Select>
    </FormControl>

    <div className="flex-row justify-space-around" style={{ backgroundColor: "white",  }}>
    {listings &&
      activeList.map((listing, i) => (
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
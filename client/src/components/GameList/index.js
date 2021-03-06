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

import { Grid } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import data from '../../utils/data';
import sorting from '../../utils/sorting';


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
  const [SearchTerms, setSearchTerms] = useState("");
  const [favorite, setFavorite] = useState([]);
  const [results, editResults] = React.useState({
    category: '',
    sort: '',
    searchTerm: '',
    active: [...listings],
    last: [],
    original: [...listings],
  });
 
 
  const handleListChange = (event) => {
    const selectName = event.target.name;
    const value = event.target.value;
    let search = results.searchTerm;;
    let category = results.category;
    let sort = results.sort;
    let list = [...listings];

    // If search terms are being entered
    if(selectName === 'search') {
      // Set the search var to the entered value
      search = value;
    }

    // If search terms exist
    if(search) {
      // Filter the list based on the terms
      list = list.filter(listings =>
        listings.title.toLowerCase().startsWith(search.toLowerCase())
      );
    }

    // If the box is the 'category' select
    if(selectName === 'category') {
      // Change the category into the value selected
      category = value;
    }

    // If a category is selected
    if(category) {
      // Filter the original list received
      list = list.filter(item => item.genre === category);
    }

    // If the box is the 'sort' select
    if(selectName === 'sort') {
      // Change the sort to the value selected
      sort = value;
    }

    // Determine how to sort with a switch
    switch(sort) {
      case 'AA':
        list = list.sort(sorting.titleSort);
        break;
      case 'AD':
        list = list.sort(sorting.titleSort).reverse();
        break;
      case 'PA':
        list = list.sort(sorting.priceSort);
        break;
      case 'PD':
        list = list.sort(sorting.priceSort).reverse();
        break;
      default:
        // Don't sort if nothing selected
        break;
    }

    editResults({
      ...results,
      category: category,
      sort: sort,
      searchTerm: search,
      active: [...list],
      last: [...results.active]
    });
    setSearchTerms(search);
  };
  
  const handleExpandClick = (i) => {
    setExpanded(expanded === i ? -1 : i);
  };

  let history = useHistory();

  const addToFavorite = _id => {
    if (!favorite.includes(_id)) setFavorite(favorite.concat(_id));
  };
  
  return(
    <>
    <Grid container spacing={2} sx={{ p: '2%' }}>

      <Grid item xs={12}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search by Title"
            name='search'
            value = {SearchTerms}
            onChange={handleListChange}
          />
        </Search>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Genre</InputLabel>
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
            {sorting.sortOptions.map((option, i) => (
              <MenuItem value={option.value} key={i}>{option.text}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

    </Grid>

    <div className="flex-row justify-space-around" style={{ backgroundColor: "white",  }}>

      {results.active.length > 0 ? (
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
        ))) : (
          <h4>Looks like there isn't anything like that</h4>
        )
      }

    </div>
    </>
  )};       

  export default GameList;
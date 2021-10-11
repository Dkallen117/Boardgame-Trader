import React from 'react';
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
  
  const handleExpandClick = (i) => {
    setExpanded(expanded === i ? -1 : i);
  };
  let history = useHistory();
  
  return(
    <div className="col-12 col-md-10 my-3">
    {listings &&
      listings.map((listing, i) => (
  <Card key={listing._id} sx={{ my: 5, border: 3 }}>
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
        <IconButton aria-label="add to favorites">
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
            Seller: {listing.seller.username}
          </Typography>
        </CardContent>
      </Collapse>
    </Card> 
    ))}
    </div>
  )};       

  export default GameList;
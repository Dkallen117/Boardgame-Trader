import * as React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Hello = () => {
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="User Avatar"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              User Name
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ maxWidth: 345 }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >

        <Link href="#" variant="">
          {"Order / Listing"}
        </Link>
        <br />
        <Link href="#" variant="">
          {"Saved Items"}
        </Link>
        <br />
        <Link href="#" variant="">
          {"Message"}
        </Link>
        <br />
        <Link href="#" variant="">
          {"Purchased"}
        </Link>
        <br />
        <Link href="#" variant="">
          {"Settings"}
        </Link>
        <br />
        <CardActions>
          <Button size="small">Log Out</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Hello;

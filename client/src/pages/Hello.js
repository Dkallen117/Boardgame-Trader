import * as React from "react";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import OrderList from "./OrderList";
import { Box } from "@mui/system";

const userName = "Subash Sunuwar";

const Hello = () => {
  const onLinkClick = (event) => {
    this.showComponent = true;
  };

  return (
    <div>
      {/* <div>{this.showComponent ? <OrderList /> : null}</div> */}

      {/* <Card sx={{ maxWidth: 345 }} >
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
      </Card> */}

      <Paper sx={{ maxWidth: 500, my: 1, mx: "auto", p: 2 }}>
        <Grid container wrap="nowrap" spacing={0}>
          <Grid item>
            <Avatar>S</Avatar>
          </Grid>
          <Grid item xs>
            <Typography>{userName}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Card
        sx={{ maxWidth: 500, my: 1, mx: "auto", p: 2 }}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {/* <Link href="#" variant="" onClick={() => this.onLinkClick}>
          {"Order / Listing"}
        </Link>
        <br /> */}
        <a href="/OrderList" onClick={() => this.toggModal("Whatever")}>
          Order / Listing
        </a>
        <br />
        <a href="/message" onClick={() => this.toggModal("Whatever")}>
          Message
        </a>
        <br />
        <a href="/purchased" onClick={() => this.toggModal("Whatever")}>
          Purchased
        </a>
        <br />
        <a href="/setting" onClick={() => this.toggModal("Whatever")}>
          Setting
        </a>
        <br />
        <CardActions>
          <Button size="small">Log Out</Button>
        </CardActions>
      </Card>

      <Card sx={{ maxWidth: 500, my: 1, mx: "auto", p: 2 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            User Profile
            <hr />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Edit Profile</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Hello;

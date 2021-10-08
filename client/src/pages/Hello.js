import * as React from "react";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";


const Hello = () => {
  return (
    <div>
      <p>This is profile page...</p>
      <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            User Name
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
    </div>
  );
};

export default Hello;

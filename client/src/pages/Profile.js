import * as React from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Auth from '../utils/auth';

// import React from 'react'

const Profile = () => {
  const { data, loading } = useQuery(QUERY_ME);

  return (
    <div>
      { loading ? (
        <h1>Loading...</h1>
      ) : (
        <Grid container spacing={3} style={{ marginTop: "9px" }}>

          <Grid item xs={4}>
            <Paper
              sx={{
                maxWidth: 400,
                height: 125,
                my: 1,
                mx: "auto",
                p: 2,
                backgroundColor: "#C9D1D7",
                color: "#437A85",
              }}
            >
              <Grid container>
                <Grid item>
                  <Avatar>{data?.me?.username[0]}</Avatar>
                </Grid>
                <Grid item>
                  <Typography
                    style={{ paddingLeft: "0.5625rem", marginTop: "0.4375rem" }}
                  >
                    {data?.me?.username}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            <Card
              style={{ lineHeight: "2" }}
              sx={{
                maxWidth: 400,
                height: 215,
                my: 1,
                mx: "auto",
                p: 2,
                backgroundColor: "#C9D1D7",
                color: "#437A85",
              }}
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <a href="/OrderList" onClick={() => this.toggModal("Whatever")}>
                My Listings
              </a>
              <br />
              <a href="/favorites" onClick={() => this.toggModal("Whatever")}>
                Saved Listings
              </a>
              <br />
              <a href="/setting" onClick={() => this.toggModal("Whatever")}>
                Setting
              </a>
              <hr style={{ marginTop: "20px" }} />

              <CardActions>
                <Button size="small" onClick={Auth.logout}>Log Out</Button>
              </CardActions>

            </Card>
          </Grid>

          <Grid item xs={7} style={{ marginLeft: "7px" }}>
            <Card
              sx={{
                maxWidth: "100%",
                height: 348,
                my: 1,
                mx: "auto",
                p: 2,
                backgroundColor: "#FDFDFD",
                color: "#437A85",
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {data?.me?.username}'s Profile
                </Typography>
                  
                <hr style={{ marginTop: "20px" }} />

                <Grid container spacing={2}>
                  <Grid item xs={7}>
                    <Card style={{ paddingTop: "7px", height: "150px" }}>
                      <label
                        style={{
                          color: "#C9D1D7",
                          paddingLeft: "9px",
                          alignItems: "center",
                        }}
                      >
                        User Name: {data?.me?.username}
                      </label>
                      <br />
                      <label
                        style={{
                          color: "#C9D1D7",
                          paddingLeft: "9px",
                          alignItems: "center",
                        }}
                      >
                        Email: {data?.me?.email}
                      </label>
                      <CardActions style={{ marginTop: "29px" }}>
                        <Button size="small">Change Password</Button>
                      </CardActions>
                    </Card>
                  </Grid>

                  <Grid item xs={3} style={{ marginLeft: "7px" }}>
                    <Card style={{ width: "263px" }}>
                      <CardMedia
                        component="img"
                        height="150"
                        image="/ProfileImage"
                        alt="Profile Image"
                      />
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>

              <CardActions style={{ marginTop: "29px" }}>
                <Button size="small">Edit Profile</Button>
              </CardActions>

            </Card>
          </Grid>

        </Grid>
      )}
      
    </div>
  );
}

export default Profile

// @ts-nocheck
"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React from "react";

const HomePage = () => {
  const [users, setUsers] = React.useState(null);

  const auth = getAuth();

  React.useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setUsers(user);
      } else {
        setUsers(null);
      }
    });
  }, [auth, users]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Home</h1>
        <h2 style={{ margin: "15px" }}>Email: {users?.email || "___"}</h2>
        {users ? (
          <button
            style={{ padding: "10px", fontWeight: 700 }}
            onClick={() => signOut(auth)}
          >
            Logout
          </button>
        ) : (
          ""
        )}
      </div>
      <Box sx={{ width: "90%", mx: "auto", my: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HomePage;

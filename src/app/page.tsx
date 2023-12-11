// @ts-nocheck
"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React from "react";
import { useFirebase } from "../../context/firebase";
import UploadImage from "../../components/UploadImage";

const HomePage = () => {
  const [users, setUsers] = React.useState(null);
  const [getData, setGetData] = React.useState(null);

  const auth = getAuth();
  const firebase = useFirebase();

  React.useEffect(() => {
    firebase.getIsData().then((data) => setGetData(data.docs, "data"));
    // firebase.getImaageUrl().then((url) => setGetData(data.docs, "data"));
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setUsers(user);
      } else {
        setUsers(null);
      }
    });
  }, [auth, firebase, users]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1>Home</h1>
      </div>
      <Box
        sx={{
          width: "90%",
          m: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: "15px" }}>Email: {users?.email || "___"}</h2>
        {users ? (
          <Button
            variant="contained"
            style={{ fontWeight: 700, borderRadius: "20px" }}
            onClick={() => signOut(auth)}
          >
            Logout
          </Button>
        ) : (
          ""
        )}
      </Box>
      <Box sx={{ width: "90%", mx: "auto", my: 2 }}>
        <Grid container spacing={2}>
          {getData?.map((val) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <Grid item xs={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <UploadImage urls={val.data()} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {val.data().title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {val.data().body}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default HomePage;

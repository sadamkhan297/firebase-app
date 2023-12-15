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
import { getAuth } from "firebase/auth";
import React from "react";
import { useFirebase } from "../../context/firebase";
import UploadImage from "../../components/UploadImage";

const HomePage = () => {
  const [getData, setGetData] = React.useState(null);

  const auth = getAuth();
  const firebase = useFirebase();

  React.useEffect(() => {
    firebase.getIsData().then((data) => setGetData(data.docs, "data"));
  }, [auth, firebase]);

  return (
    <>
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

//@ts-nocheck
"use client";
import { Box, CardMedia } from "@mui/material";
import React, { useState } from "react";
import { useFirebase } from "../context/firebase";

const UploadImage = ({ urls }: any) => {
  const [imgUrl, setImageUrl] = useState(null);

  const firebase = useFirebase();

  React.useEffect(() => {
    firebase
      .getImaageUrl(urls.imageSrc)
      .then((url: React.SetStateAction<null>) => setImageUrl(url));
  }, [firebase, urls.imageSrc]);

  return (
    <Box>
      <CardMedia sx={{ height: 140 }} image={imgUrl} title="green iguana" />
    </Box>
  );
};

export default UploadImage;

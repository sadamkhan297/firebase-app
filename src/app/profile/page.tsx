// @ts-nocheck
"use client";
import { useState } from "react";
import { useFirebase } from "../../../context/firebase";
import { Avatar, TextField } from "@mui/material";

const Page = () => {
  const firebase = useFirebase();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

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
        <h1>Your Profile</h1>
        <br />
        <label htmlFor="photo-upload" className="custom-file-upload fas">
          <div className="img-wrap img-upload">
            <Avatar
              alt="saim khan"
              src={selectedImage || firebase.user?.photoURL || ""}
              sx={{ width: 100, height: 100 }}
            />
          </div>
          <input
            id="photo-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </label>
        <br />

        <div
          style={{
            display: "flex",
          }}
        >
          <TextField type="name" value={firebase.user?.displayName} disabled />
          <TextField type="email" value={firebase.user?.email} disabled />
        </div>
      </div>
    </>
  );
};

export default Page;

// @ts-nocheck
"use client";
import { useState } from "react";
import { useFirebase } from "../../../context/firebase";
import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const firebase = useFirebase();

  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [imageSrc, setImageSrc] = useState();

  const handleClick = async () => {
    try {
      await firebase.handleCreate(title, body, imageSrc);
      router.push("/");
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Add Product</h1>
      <br />
      <TextField
        type="title"
        name="title"
        value={title}
        placeholder="title..."
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <TextField
        type="body"
        name="body"
        value={body}
        placeholder="body..."
        onChange={(e) => setBody(e.target.value)}
      />
      <br />
      <TextField
        type="file"
        inputProps={{ accept: "image/*" }}
        onChange={(e) => setImageSrc(e.target.files[0])}
      />
      <br />
      <button
        style={{ padding: "10px", fontWeight: 700 }}
        onClick={handleClick}
      >
        Register Now
      </button>
    </div>
  );
};

export default Page;

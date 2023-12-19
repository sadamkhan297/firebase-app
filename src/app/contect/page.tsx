// @ts-nocheck
"use client";
import { useState } from "react";
import { useFirebase } from "../../../context/firebase";
import { TextField } from "@mui/material";

const Page = () => {
  const firebase = useFirebase();

  const [message, setMessage] = useState();

  const handleClick = async () => {
    try {
      await firebase.sendmsg(message);
    } catch (error) {
      console.log("not submit form", error.message);
    }
  };

  return (
    <div
      style={{
        width: "50%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Contect Us</h1>
      <br />
      <TextField
        fullWidth
        type="email"
        name="email"
        value={firebase.user?.email}
        placeholder="Email..."
        disabled
      />
      <br />
      <TextField
        fullWidth
        multiline
        type="Message"
        name="Message"
        value={message}
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <button
        style={{ padding: "10px", fontWeight: 700 }}
        onClick={handleClick}
      >
        Submit
      </button>
    </div>
  );
};

export default Page;

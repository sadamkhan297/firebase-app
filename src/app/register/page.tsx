// @ts-nocheck
"use client";
import { useState } from "react";
import { useFirebase } from "../../../context/firebase";
import { TextField } from "@mui/material";

const Page = () => {
  const firebase = useFirebase();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleClick = async () => {
    try {
      await firebase.signUpUser(email, password);
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
      <h1>Register Form by Firebase</h1>
      <br />
      <TextField
        type="email"
        name="email"
        value={email}
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <TextField
        type="password"
        name="password"
        value={password}
        placeholder="Password..."
        onChange={(e) => setPassword(e.target.value)}
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

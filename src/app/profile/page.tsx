// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { useFirebase } from "../../../context/firebase";
import { TextField } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Page = () => {
  const firebase = useFirebase();
  const [users, setUsers] = useState(null);
  const auth = getAuth();

  useEffect(() => {
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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Your Profile</h1>
        <br />
        <div
          style={{
            display: "flex",
          }}
        >
          <TextField type="name" value={users?.displayName} disabled />
          <TextField type="email" value={users?.email} disabled />
        </div>
      </div>
    </>
  );
};

export default Page;

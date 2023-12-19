// @ts-nocheck
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseConfig from "../firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();
const provider = new GoogleAuthProvider();

const firebaseContext = createContext(null);
export const useFirebase = () => useContext(firebaseContext);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  console.log(user);

  const signUpUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleCreate = async (title, body, imageSrc) => {
    try {
      const imageRef = ref(
        storage,
        `uploads/images/${Date.now()}-${imageSrc.name}`
      );
      const snapshot = await uploadBytes(imageRef, imageSrc);
      const imagePath = snapshot.ref.fullPath;
      await addDoc(collection(db, "books"), {
        title,
        body,
        imageSrc: imagePath,
      });
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };

  const getIsData = () => {
    return getDocs(collection(db, "books"));
  };
  const getImaageUrl = (path) => {
    return getDownloadURL(ref(storage, path));
  };
  const signInGoodle = () => {
    return signInWithPopup(auth, provider);
  };

  const sendmsg = async (message) => {
    try {
      await addDoc(collection(db, "contects"), {
        email: user.email,
        message,
      });
    } catch (error) {
      console.log("user not added", error.message);
    }
  };

  return (
    <firebaseContext.Provider
      value={{
        signUpUser,
        signInUser,
        handleCreate,
        getIsData,
        getImaageUrl,
        signInGoodle,
        sendmsg,
        user,
        userList,
      }}
    >
      {props.children}
    </firebaseContext.Provider>
  );
};

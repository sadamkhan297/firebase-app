// @ts-nocheck
"use client";
import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseConfig from "../firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();

const firebaseContext = createContext(null);
export const useFirebase = () => useContext(firebaseContext);

export const FirebaseProvider = (props) => {
  const signUpUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleCreate = async (title, body, imageSrc) => {
    if (imageSrc && imageSrc instanceof File) {
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
    } else {
      console.error("No image provided for upload");
    }
  };

  const getIsData = () => {
    return getDocs(collection(db, "books"));
  };
  const getImaageUrl = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  return (
    <firebaseContext.Provider
      value={{ signUpUser, signInUser, handleCreate, getIsData, getImaageUrl }}
    >
      {props.children}
    </firebaseContext.Provider>
  );
};

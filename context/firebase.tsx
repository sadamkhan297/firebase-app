// @ts-nocheck
"use client";
import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { getDatabase, set, ref } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import firebaseConfig from "../firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();
// const database = getDatabase(app);

// const sanitizeKey = (key: string) => {
//   return key.replace(/[.@#$[\]]/g, "_");
// };

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

  // const putData = (key: any, data: any) => {
  //   const sanitizedKey = sanitizeKey(key);
  //   return set(ref(database, sanitizedKey), data);
  // };

  // const storageRef = ref(storage, "some-child");
  // uploadBytes(storageRef, file).then((snapshot) => {
  //   console.log("Uploaded a blob or file!");
  // });

  return (
    <firebaseContext.Provider value={{ signUpUser, signInUser, handleCreate }}>
      {props.children}
    </firebaseContext.Provider>
  );
};

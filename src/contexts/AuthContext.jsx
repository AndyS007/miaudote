import React, { useContext, useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateEmail as updateEmailFn,
  updatePassword as updatePasswordFn,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

/**
 *
 * @returns {
 *  currentUser: firebase.User,
 * login: (email, password) => Promise<firebase.auth.UserCredential>,
 * signInWithGoogle: () => Promise<firebase.auth.UserCredential>,
 * signup: (email, password) => Promise<firebase.auth.UserCredential>,
 * logout: () => Promise<void>,
 * resetPassword: (email) => Promise<void>,
 * updateEmail: (email) => Promise<void>,
 * updatePassword: (password) => Promise<void>,
 * }
 *
 */
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth).then(() => navigate("/"));
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateEmail(email) {
    return updateEmailFn(currentUser, email);
  }

  function updatePassword(password) {
    return updatePasswordFn(currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      console.log("user state changed", user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    logIn,
    signInWithGoogle,
    signup,
    logOut,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase.js";

const userAuthContext = createContext({});

export function UserAuthContextProvider({ children }: any) {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [sucessMessage, setSucessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("login");
  let navigate = useNavigate();

  const logIn = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        navigate("/home");
      })
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  };
  const changeMode = (mode: string) => {
    setMode(mode);
    setSucessMessage(null)
  };
  const signUp = (username: string, email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        return updateProfile(auth.currentUser, {
          displayName: username,
        });
      })
      .then((res) => {
        navigate("/home");
      })
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  };
  const logOut = () => {
    return signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err: any) => setError(err.message));
  };
  const clearMessages = () => {
    return setError(null);
  };
  const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  };

  const forgotPassword = (email: string) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        setSucessMessage("Password reset email had send!");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const contextValue = {
    user,
    logIn,
    signUp,
    logOut,
    googleSignIn,
    forgotPassword,
    error,
    loading,
    changeMode,
    mode,
    clearMessages,
    sucessMessage,
  };
  return (
    <userAuthContext.Provider value={contextValue}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}

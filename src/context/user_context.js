import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../utils/init-firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { upload_url, default_profile_image } from '../utils/constants';
import axios from 'axios';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(0)
  const [userAddress, setUserAddress] = useState("");
  const handleType = (usertype) => {
    console.log("i am called",usertype)
    // if (!currentUser) return;
    // console.log("getting the user");
    // setCurrentUser({ ...currentUser, usertype });
    setUserType(usertype)
  };
  const handleAddress = (_address) =>{
    console.log("calling to update address");
    setUserAddress(_address);
  }

  const handleChangeUserAddress = (address) => {
    if (!address || !currentUser) return;
    setCurrentUser({ ...currentUser, address });
  };

  const registerUser = async (email, password, userType) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logoutUser = () => {
    return signOut(auth);
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email, {
      url: 'http://localhost:3000/login',
    });
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const resetPassword = (oobCode, newPassword) => {
    return confirmPasswordReset(auth, oobCode, newPassword);
  };

  const updateUserProfileImage = async (imageURL) => {
    return updateProfile(currentUser, {
      photoURL: imageURL,
    });
  };

  const updateUserProfileName = async (name) => {
    return updateProfile(currentUser, {
      displayName: name,
    });
  };

  const reauthenticateUser = async (existingPassword) => {
    const credentials = EmailAuthProvider.credential(
      currentUser.email,
      existingPassword
    );
    return reauthenticateWithCredential(currentUser, credentials);
  };

  const updateUserProfilePassword = async (newPassword) => {
    return updatePassword(currentUser, newPassword);
  };

  const uploadProfileImage = async (image) => {
    try {
      const response = await axios.post(upload_url, { image });
      const { success, data } = response.data;
      return { success, data };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setCurrentUser(null);
      } else {
        setCurrentUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    if (!currentUser.photoURL) {
      updateUserProfileImage(default_profile_image)
        .then(() => setCurrentUser(currentUser))
        .catch(() => console.log('Error occured'));
    }
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        userType,
        userAddress,
        registerUser,
        handleType,
        handleAddress,
        handleChangeUserAddress,
        loginUser,
        logoutUser,
        signInWithGoogle,
        forgotPassword,
        resetPassword,
        updateUserProfileImage,
        updateUserProfileName,
        uploadProfileImage,
        updateUserProfilePassword,
        reauthenticateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};

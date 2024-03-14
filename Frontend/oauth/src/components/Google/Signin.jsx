import React, { useEffect } from 'react';
import { useGoogleAuth, useGoogleUser } from 'react-gapi-auth2';

const Signin = () => {
  const { googleAuth, isInitialized } = useGoogleAuth();
  const { currentUser } = useGoogleUser();

  useEffect(() => {
    if (isInitialized && !googleAuth) {
      // Google API is initialized but googleAuth is not yet available
      console.error('Google API initialization error');
    }
  }, [isInitialized, googleAuth]);

  if (!isInitialized || !googleAuth) {
    // Return loading indicator or null while Google API is initializing
    return null;
  }

  if (googleAuth.isSignedIn) {
    return (
      <>
        <p>Welcome user {currentUser.getBasicProfile().getName()}</p>
        <button onClick={() => googleAuth.signOut()}>Sign Out</button>
      </>
    );
  }
  
  return (
    <>
      <p>Click here to sign in:</p>
      <button onClick={() => googleAuth.signIn()}>Sign In</button>
    </>
  );
};

export default Signin;
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import SigninV2 from './components/Google/SigninV2';
import axios from 'axios';
import SigninV3 from './components/Google/SigninV3';

const App = () => {
  axios.defaults.withCredentials = true


  const [user, setUser] = useState(null);
  


 return(
  <>
  hi
  
  <GoogleOAuthProvider clientId="379000890776-qo5barhgf591cgec70s92o2fs4bnb12s.apps.googleusercontent.com">
    <GoogleLogin
      onSuccess={credentialResponse => {
        console.log(credentialResponse);
        const userCredential = jwtDecode(credentialResponse.credential);
         try {
          axios.post('http://localhost:8080/verify', credentialResponse)
          .then(response => {
            console.log(response.data); // Log the response data
          })
          .catch(error => {
            console.error(error); // Log any errors
          });
        }catch (error) {
          console.log(error)
        } 

        console.log(userCredential)
        if(userCredential.email){
          setUser(userCredential);

        }else{
          console.log("EmptyEmail!")
        }
      }}

      onError={() => {
        console.log('Login Failed');
      }}

      useOneTap
      />

  </GoogleOAuthProvider>
    


  {user ? 
  <div>
    {user.email}
    
  </div>
  :

  <div>
    HI PLEASE LOGIN!
  </div>
  }



  <SigninV2/>
  </>

    

 )
 };

export default App;
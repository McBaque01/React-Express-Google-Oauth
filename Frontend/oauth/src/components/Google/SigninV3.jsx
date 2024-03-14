import React, { useEffect } from 'react';

const SigninV3 = ({ clientId, loginUri }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.gapi.load('auth2', () => {
        const params = {
          'client_id': clientId,
          'login_uri': loginUri,
          // Add your custom parameters here if needed
        };
        window.gapi.auth2.signIn(params);
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [clientId, loginUri]);

  return (
    <div id="g_id_onload" data-client_id={clientId} data-login_uri={loginUri}></div>
  );
};

export default SigninV3;
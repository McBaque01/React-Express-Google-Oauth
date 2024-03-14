import React from 'react'

function SigninV2() {

    const GoogleRoute = () => {
        window.location.href = "http://localhost:5173/auth/google";
    }
  return (
    <div>
        SigninV2
        <button onClick={GoogleRoute}>Login with Google</button>
    </div>
  )
}

export default SigninV2
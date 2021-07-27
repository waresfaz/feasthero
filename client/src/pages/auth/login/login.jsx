import React from 'react';

import GoogleLogin from 'react-google-login';

class Login extends React.Component {
    render() {
        return (
            <>
                <GoogleLogin
                    clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
                    onSuccess={()=>{}}
                    onFailure={()=>{}}
                />
            </>
        )
    }
}

export default Login;
import React from 'react';

import GoogleLogin from 'react-google-login';
import { settings } from '../../../settings';

class Login extends React.Component {
    render() {
        return (
            <>
                <GoogleLogin
                    clientId={settings.OAUTH_CLIENT_ID}
                    onSuccess={()=>{}}
                    onFailure={()=>{}}
                />
            </>
        )
    }
}

export default Login;
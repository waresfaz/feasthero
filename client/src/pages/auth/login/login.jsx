import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import Button from '../../../components/button/button';

import { connect } from 'react-redux';
import { isAtLoginPage } from '../../../services/auth/actions';
import EmailValidator from '../../../validators/email';
import { login, oAuthLogin } from '../../../services/auth/api';
import history from '../../../history';
import { setAccount } from '../../../services/accounts/actions';
import Loader from '../../../components/loader/loader';
import ShouldRedirectToAccount from '../../../hoc/should-redirect-to-account/should-redirect-to-account';

import './login.scss';
import '../auth.scss';


class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {},
            loading: false,
        }
    }

    handleChange = (evt) => {
        const { name, value } = evt.target;
        this.setState({
            [name]: value,
        })
    }

    handleSubmitStandardLogin = async (evt) => {
        evt.preventDefault();
        this.clearErrors();

        if (!this.validateStandardLoginData())
            return;

        this.setState({
            loading: true
        })

        const loginRequestResult = await login(this.state);
        if (!this.handleLoginRequestResult(loginRequestResult))
            return;

        this.setState({
            loading: false
        })

        history.push('/account');
    }

    validateStandardLoginData = () => {
        let errors = {};
        errors['email'] = EmailValidator.validate(this.state.email);

        let valid = Object.values(errors).every(error => error === null);
        if (!valid)
            this.setState({ errors });

        return valid;
    }

    handleSubmitForOAuthLogin = async (oAuthData) => {
        this.clearErrors();

        const loginRequestResult = await oAuthLogin(oAuthData.tokenId);
        if (!this.handleLoginRequestResult(loginRequestResult))
            return;

        history.push('/account');
    }

    clearErrors = () => {
        this.setState({
            errors: {},
        })
    }

    handleLoginRequestResult = (loginRequestResult) => {
        if (loginRequestResult.error) {
            this.handleLoginError(loginRequestResult.error);
            return false;
        }
        this.props.setAccount(loginRequestResult.data);
        return true;
    }

    handleLoginError = (errorResponse) => {
        if (this.requestErrorHasAdditionalInfo(errorResponse)) {
            this.setState({
                errors: errorResponse.data['errors'],
                loading: false,
            })
            return
        }

        this.setState({
            errors: { error: 'failed to login, please try again later' },
            loading: false,
        })
    }

    requestErrorHasAdditionalInfo = (errorResponse) => {
        return (errorResponse.status === 400 || errorResponse.status === 404 || errorResponse.status === 401) && errorResponse.data['errors'];
    }


    componentDidMount() {
        this.props.atLoginPage();
    }

    componentWillUnmount() {
        this.props.leftLoginPage();
    }

    render() {
        return (
            <section id='login'>
                <Loader show={this.state.loading} />
                <Container>
                    <form onSubmit={this.handleSubmitStandardLogin}>
                        <div className='mb-3'>
                            <Form.Control
                                onChange={this.handleChange}
                                value={this.state.email}
                                name='email' required
                                type='email' placeholder='Email'
                            />
                            <span className='text-danger'>{this.state.errors['email']}</span>
                        </div>
                        <div className='mb-3'>
                            <Form.Control
                                onChange={this.handleChange}
                                value={this.state.password}
                                name='password' required
                                type='password' placeholder='Password'
                            />
                        </div>


                        <Row className='justify-content-center'>
                            <Col md={12} className='text-center'>
                                <Button isButton={true}>Sign In</Button>
                                <span className='text-danger'>{this.state.errors['error']}</span>
                                <div className="strike-through my-3">
                                    <span className='text-muted'>or sign in with google</span>
                                </div>
                                <GoogleLogin
                                    className='sign-in-with-google'
                                    clientId='585615552509-ve5qcffqars3nnrg10d2o6do4jhnp7ep.apps.googleusercontent.com'
                                    onSuccess={this.handleSubmitForOAuthLogin}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </Col>
                        </Row>
                    </form>
                </Container>
            </section>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        atLoginPage: () => dispatch(isAtLoginPage(true)),
        leftLoginPage: () => dispatch(isAtLoginPage(false)),
        setAccount: (account) => dispatch(setAccount(account))
    }
}

export default connect(null, mapDispatchToProps)(ShouldRedirectToAccount(Login));
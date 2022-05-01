import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import Button from '../../../components/button/button';

import { connect } from 'react-redux';
import { atLoginPage, leftLoginPage, login, oAuthLogin } from '../../../services/auth/actions';
import Loader from '../../../components/loader/loader';
import ShouldRedirectToAccount from '../../../hoc/should-redirect-to-account';

import './login.scss';
import '../auth.scss';


class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
        }
    }

    componentDidMount() {
        this.props.atLoginPage();
    }

    componentWillUnmount() {
        this.props.leftLoginPage();
    }

    handleChange = (evt) => {
        const { name, value } = evt.target;
        this.setState({
            [name]: value,
        })
    }

    handleSubmitStandardLogin = async (evt) => {
        evt.preventDefault();
        this.setState({ loading: true });
        await this.props.login(this.state.email, this.state.password);
        this.setState({ loading: false });
    }

    handleSubmitForOAuthLogin = async (oAuthData) => {
        this.setState({ loading: true });
        await this.props.oAuthLogin(oAuthData);
        this.setState({ loading: false });
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
                            <span className='text-danger'>{this.props.errors['email']}</span>
                        </div>
                        <div className='mb-3'>
                            <Form.Control
                                onChange={this.handleChange}
                                value={this.state.password}
                                name='password' required
                                type='password' placeholder='Password'
                            />
                            <span className='text-danger'>{this.props.errors['password']}</span>
                        </div>


                        <Row className='justify-content-center'>
                            <Col md={12} className='text-center'>
                                <Button isButton={true}>Sign In</Button>
                                <span className='text-danger'>{this.props.errors['error']}</span>
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

const mapStateToProps = (state) => {
    return {
        errors: state.auth.loginErrors,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        atLoginPage: () => dispatch(atLoginPage()),
        leftLoginPage: () => dispatch(leftLoginPage()),
        login: (email, password) => dispatch(login(email, password)),
        oAuthLogin: (oAuthData) => dispatch(oAuthLogin(oAuthData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShouldRedirectToAccount(Login));
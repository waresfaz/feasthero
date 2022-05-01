import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';

import Button from '../../../components/button/button';
import Loader from '../../../components/loader/loader';
import ShouldRedirectToAccount from '../../../hoc/should-redirect-to-account';

import { register, oAuthRegister } from '../../../services/auth/actions';

import './register.scss';
import '../auth.scss';


class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            registerData: {
                email: '',
                firstName: '',
                lastName: '',
                passwordOne: '',
                passwordTwo: '',
            },
            loading: false,
        }
    }

    handleChange = (evt) => {
        const { name, value } = evt.target;
        this.setState((prevState) => ({
            registerData: {
                ...prevState.registerData,
                [name]: value,
            }
        }));
    }

    standardRegister = async (evt) => {
        evt.preventDefault();
        this.setState({ loading: true });
        await this.props.register(this.state.registerData);
        this.setState({ loading: false });
    }

    oAuthRegister = async (oAuthData) => {
        this.props.oAuthRegister(oAuthData);
    }

    render() {
        const { errors } = this.props;
        const { registerData } = this.state;

        return (
            <section id='register'>
                <Loader show={this.state.loading} />
                <Container>
                    <form onSubmit={this.standardRegister}>
                        <div className='mb-3'>
                            <Form.Control value={registerData.email} onChange={this.handleChange} name='email' required type='email' placeholder='Email' />
                            <span className='text-danger'>{errors['email']}</span>
                        </div>

                        <Row className='mb-3'>
                            <Col md={6}>
                                <Form.Control value={registerData.firstName} onChange={this.handleChange} name='firstName' required type='text' placeholder='First Name' />
                                <span className='text-danger'>{errors['firstName']}</span>
                            </Col>
                            <Col md={6}>
                                <Form.Control value={registerData.lastName} onChange={this.handleChange} name='lastName' required type='text' placeholder='Last Name' />
                                <span className='text-danger'>{errors['lastName']}</span>
                            </Col>
                        </Row>

                        <div className='mb-3'>
                            <Form.Control
                                value={registerData.passwordOne}
                                onChange={this.handleChange}
                                name='passwordOne' required
                                type='password'
                                placeholder='Password'
                            />
                            <span className='text-danger'>{errors['passwordOne']}</span>
                        </div>

                        <div className='mb-3'>
                            <Form.Control
                                value={registerData.passwordTwo}
                                onChange={this.handleChange}
                                name='passwordTwo' required
                                type='password'
                                placeholder='Re-enter Password'
                            />
                            <span className='text-danger'>{errors['passwordTwo']}</span>
                        </div>

                        <Row className='justify-content-center'>
                            <Col md={12} className='text-center'>
                                <Button isButton={true}>Register</Button>
                                <span className='text-danger'>{errors['error']}</span>
                                <div className="strike-through my-3">
                                    <span className='text-muted'>or sign up with google</span>
                                </div>
                                <GoogleLogin
                                    className='sign-up-with-google'
                                    buttonText='Sign up with Google'
                                    clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
                                    onSuccess={this.oAuthRegister}
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
        errors: state.auth.registerErrors,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (registerData) => dispatch(register(registerData)),
        oAuthRegister: (oAuthData) => dispatch(oAuthRegister(oAuthData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShouldRedirectToAccount(Register));
import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';

import Button from '../../../components/button/button';
import Loader from '../../../components/loader/loader';
import ShouldRedirectToAccount from '../../../hoc/should-redirect-to-account/should-redirect-to-account';

import { clearErrors, register, oAuthRegister } from '../../../services/auth/actions';

import './register.scss';
import '../auth.scss';


class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            passwordOne: '',
            passwordTwo: '',
        }
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    handleChange = (evt) => {
        const { name, value } = evt.target;
        this.setState({
            [name]: value,
        })
    }

    standardRegister = async (evt) => {
        evt.preventDefault();
        this.props.register(this.state);
    }

    oAuthRegister = async (oAuthData) => {
        this.props.oAuthRegister(oAuthData);
    }

    render() {
        const { errors } = this.props;

        return (
            <section id='register'>
                <Loader show={this.props.loading} />
                <Container>
                    <form onSubmit={this.standardRegister}>
                        <div className='mb-3'>
                            <Form.Control value={this.state.email} onChange={this.handleChange} name='email' required type='email' placeholder='Email' />
                            <span className='text-danger'>{errors['email']}</span>
                        </div>

                        <Row className='mb-3'>
                            <Col md={6}>
                                <Form.Control value={this.state.firstName} onChange={this.handleChange} name='firstName' required type='text' placeholder='First Name' />
                                <span className='text-danger'>{errors['firstName']}</span>
                            </Col>
                            <Col md={6}>
                                <Form.Control value={this.state.lastName} onChange={this.handleChange} name='lastName' required type='text' placeholder='Last Name' />
                                <span className='text-danger'>{errors['lastName']}</span>
                            </Col>
                        </Row>

                        <div className='mb-3'>
                            <Form.Control
                                value={this.state.passwordOne}
                                onChange={this.handleChange}
                                name='passwordOne' required
                                type='password'
                                placeholder='Password'
                            />
                            <span className='text-danger'>{errors['passwordOne']}</span>
                        </div>

                        <div className='mb-3'>
                            <Form.Control
                                value={this.state.passwordTwo}
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
        loading: state.auth.loading,
        errors: state.auth.errors,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (registerData) => dispatch(register(registerData)),
        oAuthRegister: (oAuthData) => dispatch(oAuthRegister(oAuthData)),
        clearErrors: () => dispatch(clearErrors()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShouldRedirectToAccount(Register));
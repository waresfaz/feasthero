import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import GoogleLogin from 'react-google-login';

import Button from '../../../components/button/button';
import Loader from '../../../components/loader/loader';
import ShouldRedirectToAccount from '../../../hoc/should-redirect-to-account';
import useMutate from '../../../redux/hooks/mutate';
import { register, oAuthRegister as oAuthRegisterActionCreator } from '../../../services/auth/actions';

import './register.scss';
import '../auth.scss';


function Register() {
    const [registerData, setRegisterData] = useState({});
    const [mutationCallback, loading, errors] = useMutate();


    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setRegisterData((prev) => ({ ...prev, [name]: value }))
    }

    const standardRegister = async (evt) => {
        evt.preventDefault();
        await mutationCallback(register, registerData);
    }

    const oAuthRegister = async (oAuthData) => {
        await mutationCallback(oAuthRegisterActionCreator, oAuthData);
    }

    return (
        <section id='register'>
            <Loader show={loading} />
            <Container>
                <form onSubmit={standardRegister}>
                    <div className='mb-3'>
                        <Form.Control value={registerData.email} onChange={handleChange} name='email' required type='email' placeholder='Email' />
                        <span className='text-danger'>{errors['email']}</span>
                    </div>

                    <Row className='mb-3'>
                        <Col md={6}>
                            <Form.Control value={registerData.firstName} onChange={handleChange} name='firstName' required type='text' placeholder='First Name' />
                            <span className='text-danger'>{errors['firstName']}</span>
                        </Col>
                        <Col md={6}>
                            <Form.Control value={registerData.lastName} onChange={handleChange} name='lastName' required type='text' placeholder='Last Name' />
                            <span className='text-danger'>{errors['lastName']}</span>
                        </Col>
                    </Row>

                    <div className='mb-3'>
                        <Form.Control
                            value={registerData.passwordOne}
                            onChange={handleChange}
                            name='passwordOne' required
                            type='password'
                            placeholder='Password'
                        />
                        <span className='text-danger'>{errors['passwordOne']}</span>
                    </div>

                    <div className='mb-3'>
                        <Form.Control
                            value={registerData.passwordTwo}
                            onChange={handleChange}
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
                                onSuccess={oAuthRegister}
                                cookiePolicy={'single_host_origin'}
                            />
                        </Col>
                    </Row>
                </form>
            </Container>
        </section>
    )

}


export default ShouldRedirectToAccount(Register);
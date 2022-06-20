import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import Button from '../../../components/button/button';

import { useDispatch } from 'react-redux';
import useMutate from '../../../redux/hooks/mutate';
import { atLoginPage, leftLoginPage, login, oAuthLogin } from '../../../services/auth/actions';
import Loader from '../../../components/loader/loader';
import ShouldRedirectToAccount from '../../../hoc/should-redirect-to-account';

import './login.scss';
import '../auth.scss';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mutationCallback, loading, errors] = useMutate();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(atLoginPage());

        return () => {
            dispatch(leftLoginPage());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmitStandardLogin = async (evt) => {
        evt.preventDefault();
        await mutationCallback(login, email, password);
    }

    const handleSubmitForOAuthLogin = async (oAuthData) => {
        await mutationCallback(oAuthLogin, oAuthData);
    }

    return (
        <section id='login'>
            <Loader show={loading} />
            <Container>
                <form onSubmit={handleSubmitStandardLogin}>
                    <div className='mb-3'>
                        <Form.Control
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            name='email' required
                            type='email' placeholder='Email'
                        />
                        <span className='text-danger'>{errors['email']}</span>
                    </div>
                    <div className='mb-3'>
                        <Form.Control
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            name='password' required
                            type='password' placeholder='Password'
                        />
                        <span className='text-danger'>{errors['password']}</span>
                    </div>


                    <Row className='justify-content-center'>
                        <Col md={12} className='text-center'>
                            <Button isButton={true}>Sign In</Button>
                            <span className='text-danger'>{errors['error']}</span>
                            <div className="strike-through my-3">
                                <span className='text-muted'>or sign in with google</span>
                            </div>
                            <GoogleLogin
                                className='sign-in-with-google'
                                clientId='585615552509-ve5qcffqars3nnrg10d2o6do4jhnp7ep.apps.googleusercontent.com'
                                onSuccess={handleSubmitForOAuthLogin}
                                cookiePolicy={'single_host_origin'}
                            />
                        </Col>
                    </Row>
                </form>
            </Container>
        </section>
    )
}

export default ShouldRedirectToAccount(Login);
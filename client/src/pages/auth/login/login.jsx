import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import Button from '../../../components/button/button';

import { connect } from 'react-redux';
import { isAtLoginPage } from '../../../services/auth/actions';

import './login.scss';
import '../auth.scss';

class Login extends React.Component {
    componentDidMount() {
        this.props.atLoginPage();
    }

    componentWillUnmount() {
        this.props.leftLoginPage();
    }

    render() {
        return (
            <section id='login'>
                <Container>
                    <form>
                        <Form.Control required className='mb-3' type='email' placeholder='Email'></Form.Control>
                        <Form.Control required className='mb-3' type='password' placeholder='Password'></Form.Control>

                        <Row className='justify-content-center'>
                            <Col md={12} className='text-center'>
                                <Button isButton={true}>Sign In</Button>
                                <div className="strike-through my-3">
                                    <span className='text-muted'>or sign in with google</span>
                                </div>
                                <GoogleLogin
                                    className='sign-in-with-google'
                                    clientId='585615552509-ve5qcffqars3nnrg10d2o6do4jhnp7ep.apps.googleusercontent.com'
                                    onSuccess={() => { }}
                                    onFailure={() => { }}
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
        leftLoginPage: () => dispatch(isAtLoginPage(false))
    }
}

export default connect(null, mapDispatchToProps)(Login);
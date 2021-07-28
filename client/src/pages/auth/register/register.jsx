import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import GoogleLogin from 'react-google-login';

import Button from '../../../components/button/button';

import EmailValidator from '../../../validators/email';
import NameValidator from '../../../validators/name';
import PasswordValidator from '../../../validators/password';

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
            formErrors: {},
        }
    }

    validate = () => {
        let formErrors = {};
        const { email, firstName, lastName, passwordOne, passwordTwo } = this.state;

        formErrors['email'] = EmailValidator.validate(email);
        formErrors['firstName'] = NameValidator.validate(firstName);
        formErrors['lastName'] = NameValidator.validate(lastName);
        formErrors['passwordOne'] = PasswordValidator.passwordsEqual(passwordOne, passwordTwo);

        if (!formErrors['passwordOne'])
            formErrors['passwordOne'] = PasswordValidator.validate(passwordOne)


        let valid = Object.values(formErrors).every(error => error === null);
        if (!valid)
            this.setState({ formErrors });

        return valid;
    }

    handleChange = (evt) => {
        const { name, value } = evt.target;
        this.setState({
            [name]: value,
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault();

        if (!this.validate())
            return;
    }

    render() {
        const { formErrors } = this.state;

        return (
            <section id='register'>
                <Container>
                    <form onSubmit={this.handleSubmit}>
                        <div className='mb-3'>
                            <Form.Control onChange={this.handleChange} name='email' required type='email' placeholder='Email' />
                            <span className='text-danger'>{formErrors['firstName']}</span>
                        </div>

                        <Row className='mb-3'>
                            <Col md={6}>
                                <Form.Control onChange={this.handleChange} name='firstName' required type='text' placeholder='First Name' />
                                <span className='text-danger'>{formErrors['firstName']}</span>
                            </Col>
                            <Col md={6}>
                                <Form.Control onChange={this.handleChange} name='lastName' required type='text' placeholder='Last Name' />
                                <span className='text-danger'>{formErrors['lastName']}</span>
                            </Col>
                        </Row>

                        <div className='mb-3'>
                            <Form.Control onChange={this.handleChange} name='passwordOne' required type='password' placeholder='Password' />
                            <span className='text-danger'>{formErrors['passwordOne']}</span>
                        </div>

                        <div className='mb-3'>
                            <Form.Control onChange={this.handleChange} name='passwordTwo' required type='password' placeholder='Re-enter Password' />
                            <span className='text-danger'>{formErrors['passwordTwo']}</span>
                        </div>

                        <Row className='justify-content-center'>
                            <Col md={12} className='text-center'>
                                <Button isButton={true}>Register</Button>
                                <div className="strike-through my-3">
                                    <span className='text-muted'>or sign up with google</span>
                                </div>
                                <GoogleLogin
                                    className='sign-up-with-google'
                                    buttonText='Sign up with Google'
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


export default Register;
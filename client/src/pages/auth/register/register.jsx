import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import Select from 'react-select';
import { connect } from 'react-redux';

import Button from '../../../components/button/button';
import Loader from '../../../components/loader/loader';

import EmailValidator from '../../../validators/email';
import NameValidator from '../../../validators/name';
import PasswordValidator from '../../../validators/password';
import AccountTypeValidator from '../../../validators/account-type';

import { register as registerRequest } from '../../../services/auth/api';
import { accountTypes, registerAccountTypeDropDownStyle } from '../../../constants/app-constants';
import { setAccount } from '../../../services/accounts/actions';
import history from '../../../history';

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
            accountType: '',
            formErrors: {},
            error: '',
            loading: false,
        }
    }

    handleChange = (evt) => {
        const { name, value } = evt.target;
        this.setState({
            [name]: value,
        })
    }

    handleSubmit = async (evt) => {
        evt.preventDefault();
        this.clearErrors();

        if (!this.validate())
            return;

        this.setState({
            loading: true
        })

        if (!(await this.register()))
            return;

        this.setState({
            loading: false
        })
        history.push('/account');
    }

    clearErrors = () => {
        this.setState({
            error: '',
            formErrors: {},
        })
    }

    validate = () => {
        let formErrors = {};
        const { email, firstName, lastName, passwordOne, passwordTwo, accountType } = this.state;

        formErrors['email'] = EmailValidator.validate(email);
        formErrors['firstName'] = NameValidator.validate(firstName);
        formErrors['lastName'] = NameValidator.validate(lastName);
        formErrors['passwordOne'] = PasswordValidator.passwordsEqual(passwordOne, passwordTwo);
        formErrors['accountType'] = AccountTypeValidator.validate(accountType)

        if (!formErrors['passwordOne'])
            formErrors['passwordOne'] = PasswordValidator.validate(passwordOne)


        let valid = Object.values(formErrors).every(error => error === null);
        if (!valid)
            this.setState({ formErrors });

        return valid;
    }

    register = async () => {
        const registerResult = await registerRequest(this.state);
        if (registerResult.error) {
            this.handleRegisterError(registerResult.error);
            return false;
        }
        this.props.setAccount(registerResult.data);
        return true;
    }

    handleRegisterError = (error) => {
        if (error.data) {
            if (error.status === 400 || error.status === 409) {
                this.setState({
                    error: error.data,
                    loading: false,
                });
                return;
            }
        }
        this.setState({
            error: 'Failed to register, please try again',
            loading: false,
        });
    }

    render() {
        const { formErrors } = this.state;

        return (
            <section id='register'>
                <Loader show={this.state.loading} />
                <Container>
                    <form onSubmit={this.handleSubmit}>
                        <div className='mb-3'>
                            <Form.Control value={this.state.email} onChange={this.handleChange} name='email' required type='email' placeholder='Email' />
                            <span className='text-danger'>{formErrors['firstName']}</span>
                        </div>

                        <Row className='mb-3'>
                            <Col md={6}>
                                <Form.Control value={this.state.firstName} onChange={this.handleChange} name='firstName' required type='text' placeholder='First Name' />
                                <span className='text-danger'>{formErrors['firstName']}</span>
                            </Col>
                            <Col md={6}>
                                <Form.Control value={this.state.lastName} onChange={this.handleChange} name='lastName' required type='text' placeholder='Last Name' />
                                <span className='text-danger'>{formErrors['lastName']}</span>
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
                            <span className='text-danger'>{formErrors['passwordOne']}</span>
                        </div>

                        <div className='mb-3'>
                            <Form.Control
                                value={this.state.passwordTwo}
                                onChange={this.handleChange}
                                name='passwordTwo' requireda
                                type='password'
                                placeholder='Re-enter Password'
                            />
                            <span className='text-danger'>{formErrors['passwordTwo']}</span>
                        </div>

                        <div className='mb-3'>
                            <Select
                                required
                                name='accountType'
                                value={accountTypes.filter((option) => option.target.value === this.state.accountType)}
                                styles={registerAccountTypeDropDownStyle}
                                options={accountTypes}
                                onChange={this.handleChange}
                                placeholder='Account type'
                            />
                            <span className='text-danger'>{formErrors['accountType']}</span>
                        </div>

                        <Row className='justify-content-center'>
                            <Col md={12} className='text-center'>
                                <Button isButton={true}>Register</Button>
                                <span className='text-danger'>{this.state.error}</span>
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

const mapDispatchToProps = (dispatch) => {
    return {
        setAccount: (account) => dispatch(setAccount(account))
    }
}

export default connect(null, mapDispatchToProps)(Register);
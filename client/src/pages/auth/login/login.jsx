import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import Button from '../../../components/button/button';

import { connect } from 'react-redux';
import { isAtLoginPage } from '../../../services/auth/actions';

import './login.scss';
import '../auth.scss';
import EmailValidator from '../../../validators/email';
import { login } from '../../../services/auth/api';
import history from '../../../history';
import { setAccount } from '../../../services/accounts/actions';
import Loader from '../../../components/loader/loader';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
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

        if (!this.validate)
            return;

        this.setState({
            loading: true
        })

        if (!(await this.login()))
            return;

        this.setState({
            loading: false
        })

        history.push('/account');
    }

    validate = () => {
        let formErrors = {};
        formErrors['email'] = EmailValidator.validate(this.state.email);

        let valid = Object.values(formErrors).every(error => error === null);
        if (!valid)
            this.setState({ formErrors });

        return valid;
    }

    login = async () => {
        const loginResult = await login(this.state);
        if (loginResult.error) {
            this.handleLoginError(loginResult.error);
            return false;
        }
        this.props.setAccount(loginResult.data);
        return true;
    }

    handleLoginError = (error) => {
        if (error.status === 400 || error.status === 404 || error.status === 401) {
            this.setState({
                error: error.data,
                loading: false,
            })
            return
        }

        this.setState({
            error: 'failed to login, please try again later',
            loading: false,
        })
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
                    <form onSubmit={this.handleSubmit}>
                        <div className='mb-3'>
                            <Form.Control
                                onChange={this.handleChange}
                                value={this.state.email}
                                name='email' required
                                type='email' placeholder='Email'
                            />
                            <span className='text-danger'>{this.state.formErrors['email']}</span>
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
                                <span className='text-danger'>{this.state.error}</span>
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
        leftLoginPage: () => dispatch(isAtLoginPage(false)),
        setAccount: (account) => dispatch(setAccount(account))
    }
}

export default connect(null, mapDispatchToProps)(Login);
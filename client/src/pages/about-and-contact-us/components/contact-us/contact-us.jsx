import React from 'react';
import { Col, Form, Row, Modal } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";

import NameValidator from '../../../../validators/name';

import Title from '../../../../components/title/title';
import Button from '../../../../components/button/button';
import Loader from '../../../../components/loader/loader';

import EmailValidator from '../../../../validators/email';
import NotEmptyValidator from '../../../../validators/not-empty';

import { email as sendEmail } from '../../../../services/contact/api';

import './contact-us.scss';
import { settings } from '../../../../settings';


class ContactUs extends React.Component {
  constructor() {
    super();
    this.recaptchaRef = React.createRef();
    this.state = {
      name: '',
      subject: '',
      email: '',
      message: '',
      errors: {},
      loading: false,
      successfullySentEmail: false,
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    if (this.state.errors)
      this.clearErrors();

    const { name, email, subject, message } = this.state;

    if (!this.validate(name, email, subject, message))
      return;

    this.setState({
      loading: true,
    });

    const response = await sendEmail(name, email, subject, message, this.recaptchaRef.current.getValue());
    this.resetReCaptcha();
    if (response.error) 
      return this.handleContactRequestError(response.error)

    this.setState({
      successfullySentEmail: true,
      loading: false,
    });
  }

  clearErrors = () => {
    this.setState({
      errors: {},
    })
  }

  validate = (name, email, subject, message) => {
    let errors = {};

    errors['name'] = NameValidator.validate(name)
    errors['email'] = EmailValidator.validate(email);
    errors['subject'] = NotEmptyValidator.validate(subject);
    errors['message'] = NotEmptyValidator.validate(message);

    let valid = Object.values(errors).every(error => error === null);
    if (!valid)
      this.setState({ errors });

    return valid;
  }

  handleContactRequestError = (errorResponse) => {
    if (this.responseErrorHasMoreInfo(errorResponse))
      this.setState({
        errors: errorResponse.data['errors'],
        loading: false
      });
    else
      this.setState({
        errors: { error: 'failed to send email' },
        loading: false
      })
  }

  responseErrorHasMoreInfo = (errorResponse) => {
    return errorResponse.status === 400 && errorResponse.data['errors'];
  }

  handleFormChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  resetReCaptcha = () => {
    window.grecaptcha.reset();
  }

  resetEmailSuccessfullySent = () => {
    this.setState({
      successfullySentEmail: false
    })
  }

  render() {
    const { errors, name, subject, email, message } = this.state;

    return (
      <>
        <section id='contact-us'>
          <Loader show={this.state.loading} />
          <Modal
            backdropClassName='p-5'
            contentClassName='text-center p-5'
            centered
            onHide={this.resetEmailSuccessfullySent}
            show={this.state.successfullySentEmail === true}
          >
            <h4 className='text-success'>Sent! We will get back to you shortly...</h4>
          </Modal>
          <Row className='justify-content-center'>
            <Col lg={8}>
              <div className='heading'>
                <Title>
                  Let's Talk
                </Title>
                <h5 className='text-muted'>
                  Want to get in touch? We'd love to hear from you, please fill out the form and we'll get back to you promptly.
                </h5>
              </div>
              <form onSubmit={this.handleSubmit}>
                <Row>
                  <Col lg={6}>
                    <Form.Group>
                      <Form.Control
                        onChange={this.handleFormChange}
                        value={email} name='email'
                        required size='lg' type='email'
                        placeholder='Email...' />
                      <span className='text-danger'>{errors['email']}</span>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group>
                      <Form.Control
                        onChange={this.handleFormChange}
                        value={name} name='name'
                        required size='lg' type='text'
                        placeholder='Name...' />
                      <span className='text-danger'>{errors['name']}</span>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Control
                    onChange={this.handleFormChange}
                    value={subject} name='subject'
                    required size='lg' type='text'
                    placeholder='Subject...' />
                  <span className='text-danger'>{errors['subject']}</span>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    onChange={this.handleFormChange}
                    value={message} name='message'
                    required size='lg' as='textarea'
                    placeholder='Your Message...' />
                  <span className='text-danger'>{errors['message']}</span>
                </Form.Group>
                <Form.Group>
                  <ReCAPTCHA
                    ref={this.recaptchaRef}
                    sitekey={settings.RECAPTCHA_SITE_KEY}
                  />
                  <span className='text-danger'>{errors['recaptcha']}</span>
                </Form.Group>
                <span className='text-danger'>{errors['error']}</span>
                <Button isButton={true} type='submit'>Send</Button>
              </form>
            </Col>
          </Row>
        </section>
      </>
    )
  }
}

export default ContactUs;
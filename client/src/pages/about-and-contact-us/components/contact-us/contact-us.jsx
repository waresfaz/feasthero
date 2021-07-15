import React from 'react';
import { Col, Form, Row, Modal } from 'react-bootstrap';

import NameValidator from '../../../../validators/name';

import Title from '../../../../components/title/title';
import Button from '../../../../components/button/button';
import Loader from '../../../../components/loader/loader';

import EmailValidator from '../../../../validators/email';
import NotEmptyValidator from '../../../../validators/not-empty';

import { email as sendEmail } from '../../../../services/contact/api';

import './contact-us.scss';


class ContactUs extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      subject: '',
      email: '',
      message: '',
      formErrors: {},
      loading: false,
      successfullySentEmail: null,
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    if (this.state.formErrors)
      this.clearFormErrors();

    const { name, email, subject, message } = this.state;

    if (!this.validate(name, email, subject, message))
      return;

    this.setState({
      loading: true,
    });

    if (!(await sendEmail(name, email, subject, message))) {
      this.setState({
        successfullySentEmail: false,
        loading: false,
      });
      return;
    }

    this.setState({
      successfullySentEmail: true,
      loading: false,
    });
  }

  clearFormErrors = () => {
    this.setState({
      formErrors: {},
    })
  }

  validate = (name, email, subject, message) => {
    let formErrors = {};

    formErrors['name'] = NameValidator.validate(name)
    formErrors['email'] = EmailValidator.validate(email);
    formErrors['subject'] = NotEmptyValidator.validate(subject);
    formErrors['message'] = NotEmptyValidator.validate(message);

    let valid = Object.values(formErrors).every(error => error === null);
    if (!valid)
      this.setState({ formErrors });

    return valid;
  }

  handleFormChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  resetEmailSuccessfullySent = () => {
    this.setState({
      successfullySentEmail: null,
    })
  }

  render() {
    const { formErrors, name, subject, email, message, successfullySentEmail } = this.state;

    return (
      <>
        <section id='contact-us'>
          <Loader show={this.state.loading} />
          <Modal
            backdropClassName='p-5'
            contentClassName='text-center p-5'
            centered
            onHide={this.resetEmailSuccessfullySent}
            show={successfullySentEmail === true || successfullySentEmail === false}
          >
            {
              successfullySentEmail === true
                ?
                <h4 className='text-success'>Sent!</h4>
                :
                successfullySentEmail === false
                  ?
                  <h4 className='text-danger'>Error, please try again</h4>
                  :
                  <></>
            }
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
                      <span className='text-danger'>{formErrors['email']}</span>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group>
                      <Form.Control
                        onChange={this.handleFormChange}
                        value={name} name='name'
                        required size='lg' type='text'
                        placeholder='Name...' />
                      <span className='text-danger'>{formErrors['name']}</span>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Control
                    onChange={this.handleFormChange}
                    value={subject} name='subject'
                    required size='lg' type='text'
                    placeholder='Subject...' />
                  <span className='text-danger'>{formErrors['subject']}</span>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    onChange={this.handleFormChange}
                    value={message} name='message'
                    required size='lg' as='textarea'
                    placeholder='Your Message...' />
                  <span className='text-danger'>{formErrors['message']}</span>
                </Form.Group>
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
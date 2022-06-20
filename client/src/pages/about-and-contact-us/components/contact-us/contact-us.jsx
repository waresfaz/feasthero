import React, { useState, useRef } from 'react';
import { Col, Form, Row, Modal } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from 'react-redux';

import Title from '../../../../components/title/title';
import Button from '../../../../components/button/button';
import Loader from '../../../../components/loader/loader';
import { settings } from '../../../../settings';
import { resetContact, sendEmail } from '../../../../services/contact/actions';

import './contact-us.scss';


export default function ContactUs() {
  const [formState, setFormState] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const reCaptchaRef = useRef();
  const errors = useSelector(state => state.contact.errors);
  const emailSent = useSelector(state => state.contact.emailSent);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await dispatch(sendEmail(formState, reCaptchaRef.current.value));
    setLoading(false);
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <section id='contact-us'>
        <Loader show={loading} />
        <Modal
          backdropClassName='p-5'
          contentClassName='text-center p-5'
          centered
          onHide={() => dispatch(resetContact())}
          show={emailSent}
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
            <form onSubmit={handleSubmit}>
              <Row>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Control
                      onChange={handleFormChange}
                      value={formState.email} name='email'
                      required size='lg' type='email'
                      placeholder='Email...' />
                    <span className='text-danger'>{errors['email']}</span>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Control
                      onChange={handleFormChange}
                      value={formState.name} name='name'
                      required size='lg' type='text'
                      placeholder='Name...' />
                    <span className='text-danger'>{errors['name']}</span>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Control
                  onChange={handleFormChange}
                  value={formState.subject} name='subject'
                  required size='lg' type='text'
                  placeholder='Subject...' />
                <span className='text-danger'>{errors['subject']}</span>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  onChange={handleFormChange}
                  value={formState.message} name='message'
                  required size='lg' as='textarea'
                  placeholder='Your Message...' />
                <span className='text-danger'>{errors['message']}</span>
              </Form.Group>
              <Form.Group>
                <ReCAPTCHA
                  ref={reCaptchaRef}
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
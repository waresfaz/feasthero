import React from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import landing_chef from '../../../../assets/resources/images/chef-landing.png';

import './landing.scss';

class Landing extends React.Component {
    render() {
        return (
            <section id='landing'>
                <Row className='justify-content-around'>
                    <Col className='v-center' lg={5}>
                        <div>
                            <h1>Cook Together <br /> From Anywhere</h1>
                            <p>Learn to cook like a pro with others in the comfort of your own kitchen.</p>
                            <Row id='landing-btn-row'>
                                <Col md={5} sm={6}>
                                    <Link className='button-secondary' id='gotoclasses' to='#classlist'>
                                        Book Class
                                    </Link>
                                </Col>
                                <Col md={5} sm={6}>
                                    <Link className='button-primary' id='gotocontactus' to='#contactus'>
                                        Contact Us
                                </Link>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col lg={5} className='text-center' id='chef-col'>
                        <Image width='95%' src={landing_chef} />
                    </Col>
                </Row>
            </section>
        )
    };
}

export default Landing;
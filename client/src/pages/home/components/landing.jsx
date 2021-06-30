import React from 'react';
import { Col, Row, Image, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import landing_chef from '../../../assets/resources/images/chef-landing.png';

import '../home.scss';

class Landing extends React.Component {
    render() {
        return (
            <div id='landing'>
                <Row className='justify-content-around'>
                    <Col lg={4}>
                        <h2>Cook Together From Anywhere</h2>
                        <p>Learn to cook like a pro with others in the comfort of your own kitchen.</p>
                        <Row>
                            <Col>
                                <Link className='button-secondary' to='#classlist'>
                                    Book Class
                                    </Link>
                            </Col>
                            <Col>
                                <Link className='button-primary' to='#contactus'>
                                    Contact Us
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <Image width='100%' src={landing_chef} />
                    </Col>
                </Row>
            </div>
        )
    };
}

export default Landing;
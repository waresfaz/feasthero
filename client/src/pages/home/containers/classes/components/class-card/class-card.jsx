import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import './class-card.scss';

class ClassCard extends React.Component {
    chefsPartial(chefsData) {
        return (
            chefsData.map((chef, key) => {
                return (
                    <Col className='align-self-center' md={2}>
                        <Image fluid className='chef-photo' key={key} src={chef.photo} />
                    </Col>
                )
            })
        )
    }

    render() {
        const classData = this.props.classData;

        return (
            <div className='class-container'>
                <Image className='class-container-background' src={classData.thumbnail} />
                <div className='class-container-content'>
                    <Row>
                        {this.chefsPartial(classData.chefs)}
                        <Col className='align-self-center' md={6}>
                            <h5>{classData.title}</h5>
                            <h6>
                                <span>
                                {classData.duration} Hrs | ${classData.cost}
                                </span>{" "}
                                per device
                            </h6>
                        </Col>
                        <Col className='ml-auto align-self-center' md={4}>
                            <a href={`class/${classData.id}`} className='button-secondary'>Book Now <FontAwesomeIcon size={'sm'} icon={faArrowRight} /></a>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}


export default ClassCard;
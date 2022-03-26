import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'

import getChefFullName from '../../../../../../helpers/get-chef-full-name'
import { setClassData } from '../../../../../../services/booking/actions';

import Button from '../../../../../../components/button/button';

import './class-card.scss';

class ClassCard extends React.Component {
    handleSelect = () => {
        this.props.setClassData(this.props.classData);
    }

    render() {
        const classData = this.props.classData;
        return (
            <div className='class-container'>
                <Image className='class-container-background' src={classData.thumbnail} />
                <div className='class-container-content'>
                    <Container>
                        <Row>
                            {
                                classData.chefs.map((chef, key) => {
                                    return (
                                        <Col className='align-self-center chef-photo-container' key={key} md={2} lg={3} xl={2}>
                                            <Image fluid className='chef-photo' src={chef.profile.photo} />
                                            {
                                                /**
                                                 * the popup is not needed on tablet and smaller screens because it will be
                                                 * very hard to render and view on small screens. the sass already makes it so
                                                 * the popup will not display but might as well not even render the html at all
                                                 */
                                                window.innerWidth > 768
                                                    ?
                                                    <>
                                                        <div className='chef-info-popup'>
                                                            <Row>
                                                                <Col md={4}>
                                                                    <Image
                                                                        src={chef.profile.photo}
                                                                        alt={`${chef.name}'s photo`}
                                                                    />
                                                                </Col>
                                                                <Col md={8}>
                                                                    <div className="chef-info-popup-content">
                                                                        <h3>{getChefFullName(chef)}</h3>
                                                                        <p>{chef.profile.bio}</p>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </>
                                                    :
                                                    <></>
                                            }
                                        </Col>
                                    )
                                })
                            }
                            <Col className='align-self-center' md={6} lg={5} xl={6}>
                                <h5>{classData.title}</h5>
                                <h6>
                                    <span>
                                        {classData.duration} Hrs | ${classData.costPerDevice}
                                    </span>{" "}
                                    per device
                                </h6>
                            </Col>
                            <Col className='ml-auto align-self-center' md={4} lg={4} xl={4}>
                                <Button to={`book/${classData._id}`} onClick={this.handleSelect} primary={true} >
                                    <>
                                        Book Now <FontAwesomeIcon size={'sm'} icon={faArrowRight} />
                                    </>
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div >
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setClassData: (classData) => dispatch(setClassData(classData))
    }
}

export default connect(null, mapDispatchToProps)(ClassCard);
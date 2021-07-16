import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { getAllClasses } from '../../../../services/classes/actions';

import ClassCard from './components/class-card/class-card';

import './classes.scss';
import Title from '../../../../components/title/title';

class Classes extends React.Component {
    componentDidMount() {
        this.props.getAllClasses();
    }

    render() {
        return (
            <section id='classes'>
                <Title className='mb-4 text-center'>Hands-on cooking classes taught by world class chefs</Title>

                {
                    this.props.allClasses
                        ?
                        <Row className='justify-content-center'>
                            {
                                this.props.allClasses.map((classData, key) => {
                                    return (
                                        <Col key={key} className='class-card-container' md={11} lg={5}>
                                            <ClassCard classData={classData} />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        :
                        this.props.allClasses === false
                            ?
                            <h4 className='text-center text-danger'>Error loading classes</h4>
                            :
                            <h4 className='text-center'>Loading...</h4>
                }
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allClasses: state.classes.allClasses,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllClasses: () => dispatch(getAllClasses()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Classes);
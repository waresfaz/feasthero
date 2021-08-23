import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { getAllClassesForBooking } from '../../../../services/classes/actions';

import ClassCard from './components/class-card/class-card';
import Title from '../../../../components/title/title';

import './classes.scss';

class Classes extends React.Component {
    componentDidMount() {
        this.props.getAllClasses();
    }

    tryToRenderAllClasses() {
        const { allClasses } = this.props;

        if (allClasses) {
            return (
                <Row className='justify-content-center'>
                    {
                        allClasses.map((classData, key) => {
                            return (
                                <Col key={key} className='class-card-container' md={11} lg={6} xl={5}>
                                    <ClassCard classData={classData} />
                                </Col>
                            )
                        })
                    }
                </Row>
            )
        }

        if (allClasses === false)
            return <h4 className='text-center text-danger'>Error loading classes</h4>

        return <h4 className='text-center'>Loading...</h4>
    }

    render() {
        return (
            <section id='classes'>
                <Title className='mb-4 text-center'>Hands-on cooking classes taught by world class chefs</Title>

                {this.tryToRenderAllClasses()}
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allClasses: state.classes.allClassesForBooking,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllClasses: () => dispatch(getAllClassesForBooking()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Classes);
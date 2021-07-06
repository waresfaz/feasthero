import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { getAllClasses } from '../../../../services/classes/actions';

import ClassCard from './components/class-card/class-card';

import './classes.scss';

class Classes extends React.Component {
    componentDidMount() {
        this.props.getAllClasses();
    }

    render() {
        return (
            <section id='classes'>
                <h2 className='text-center title mb-4'>Hands-on cooking classes taught by world class chefs</h2>

                {
                    this.props.allClasses
                        ?
                        <Row className='justify-content-center'>
                            {
                                this.props.allClasses.map((classData, key) => {
                                    return (
                                        <Col class='class-card-container' lg={5}>
                                            <ClassCard key={key} classData={classData} />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        : <p>Loading...</p>
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
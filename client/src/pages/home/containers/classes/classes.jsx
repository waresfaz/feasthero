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

    classesPartial() {
        const classes = this.props.allClasses;

        return (
            <>
                <Row id='classes'>
                    {
                        classes.map((classData, key) => {
                            return (
                                <Col xl={6}>
                                    <ClassCard key={key} classData={classData} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </>
        )
    }

    loadingPartial() {
        return (
            <div className='w-100 text-center'>
                <p>Loading...</p>
            </div>
        )
    }

    render() {
        return (
            <section id='classes'>
                <h2 className='text-center title'>Hands-on cooking classes taught by world class chefs</h2>

                {
                    this.props.allClasses
                        ?
                        this.classesPartial()
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
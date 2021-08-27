import React from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';

import ClassCard from './class-card/class-card';

import { setCurrentClass } from '../../../../../../services/chef/actions';
import { allChefsClasses } from '../../../../../../services/chef/api';

class Classes extends React.Component {
    constructor() {
        super();
        this.state = {
            classes: null,
            loading: false,
        }
    }

    async componentDidMount() {
        const classes = await allChefsClasses();
        this.setState({ classes })
    }

    tryToRenderAllClasses() {
        if (!this.state.classes)
            return (
                <div className='d-flex justify-content-center'>
                    <Spinner animation='border' />
                </div>
            )

        if (this.state.classes.error)
            return <h4 className='text-center text-danger'>Error loading classes</h4>


        if (this.state.classes) {
            return (
                <>
                    <Row className='justify-content-center' id='chef-classes'>
                        {
                            this.state.classes.map((classData, key) => {
                                return (
                                    <Col key={key} className='class-card-container' md={11} lg={6} xl={5}>
                                        <ClassCard classData={classData} />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </>
            )
        }

        return (
            <></>
        )
    }

    render() {
        return (
            <>
                <h2 className='text-center font-weight-bold'>Classes</h2>
                {this.tryToRenderAllClasses()}
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentClass: (classData) => dispatch(setCurrentClass(classData))
    }
}

export default connect(null, mapDispatchToProps)(Classes);
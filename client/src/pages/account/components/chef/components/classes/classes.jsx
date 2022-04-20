import React from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';

import ClassCard from './class-card/class-card';

import { getAllClasses, setCurrentClass } from '../../../../../../services/chef/actions';

class Classes extends React.Component {
    async componentDidMount() {
        await this.props.getAllClasses();
    }

    tryToRenderAllClasses() {
        if (!this.props.allClasses)
            return (
                <div className='d-flex justify-content-center'>
                    <Spinner animation='border' />
                </div>
            )

        if (this.props.allClasses.error)
            return <h4 className='text-center text-danger'>Error loading classes</h4>


        if (this.props.allClasses) {
            return (
                <>
                    <Row className='justify-content-center' id='chef-classes'>
                        {
                            this.props.allClasses.map((classData, key) => {
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

const mapStateToProps = (state) => {
    return {
        allClasses: state.chef.allClasses,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentClass: (classData) => dispatch(setCurrentClass(classData)),
        getAllClasses: () => dispatch(getAllClasses()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Classes);
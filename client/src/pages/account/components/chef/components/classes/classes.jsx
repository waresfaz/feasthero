import React from 'react';
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';

import Button from '../../../../../../components/button/button'

import { getAllClasses } from '../../../../../../services/chef/actions';

class Classes extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
        }
    }

    componentDidMount() {
        this.props.getAllClasses();
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
                    {
                        this.props.allClasses.map((classData) => {
                            return (
                                <>
                                    <p>{JSON.stringify(classData)}</p>
                                    <Button className='my-4 p-3' secondary to={`account/class/${classData._id}`}>Edit Class</Button>
                                </>
                            )
                        })
                    }

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
                <h2 className='text-center'>Classes</h2>
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
        getAllClasses: () => dispatch(getAllClasses()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Classes);
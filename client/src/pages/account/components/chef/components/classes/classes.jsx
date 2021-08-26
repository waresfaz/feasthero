import React from 'react';
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';

import Button from '../../../../../../components/button/button'

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
        console.log(classes)
        this.setState({ classes })
    }

    handleSelectClass = (classData) => {
        this.props.setCurrentClass(classData);
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
                    {
                        this.state.classes.map((classData, key) => {
                            return (
                                <div key={key}>
                                    <p>{JSON.stringify(classData)}</p>
                                    <Button className='my-4 p-3' secondary onClick={() => this.handleSelectClass(classData)} to={`account/class/${classData._id}`}>Edit Class</Button>
                                </div>
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

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentClass: (classData) => dispatch(setCurrentClass(classData))
    }
}

export default connect(null, mapDispatchToProps)(Classes);
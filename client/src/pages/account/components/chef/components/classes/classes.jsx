import React from 'react';
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';

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
            return <></>

        if (this.props.allClasses.error)
            return <h4 className='text-center text-danger'>Error loading classes</h4>


        if (this.props.allClasses) {
            return (
                <>
                    {
                        JSON.stringify(this.props.allClasses)
                    }
                </>
            )
        }



        return (
            <div className='d-flex justify-content-center'>
                <Spinner animation='border' />
            </div>
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
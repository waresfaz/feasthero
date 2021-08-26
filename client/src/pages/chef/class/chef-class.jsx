import React from 'react'
import { connect } from 'react-redux'
import { Spinner } from 'react-bootstrap'

import MustBeChef from '../../../hoc/must-be-chef/must-be-chef'
import EditClass from './components/edit-class/edit-class'
import DeleteClass from './components/delete-class/delete-class'

import { getClass } from '../../../services/chef/actions'

class ChefClass extends React.Component {
    async componentDidMount() {
        await this.initClassData();
    }

    initClassData = async () => {
        if (!this.props.currentClass)
            await this.props.getClass(this.props.match.params.id)
    }

    errorLoadingClassData = () => {
        return this.props.currentClass === false;
    }

    classDataRequestHasCompleted = () => {
        return this.props.currentClass !== null && this.props.currentClass !== undefined;
    }

    render() {
        if (this.classDataRequestHasCompleted()) {
            if (this.errorLoadingClassData())
                return <p className='text-danger text-center'>Error loading class</p>
            else
                return (
                    <>
                        <EditClass />
                        <DeleteClass />
                    </>
                )
        }
        return (
            <div className='d-flex justify-content-center'>
                <Spinner animation='border' />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentClass: state.chef.currentClass,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getClass: (classId) => dispatch(getClass(classId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MustBeChef(ChefClass));
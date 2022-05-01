import React from 'react'
import { connect } from 'react-redux'
import { Spinner } from 'react-bootstrap'

import MustBeChef from '../../../hoc/must-be-chef'
import EditClass from './components/edit-class/edit-class'
import DeleteClass from './components/delete-class/delete-class'

import { loadClass } from '../../../services/chef/actions'

class ChefClass extends React.Component {
    async componentDidMount() {
        await this.props.loadClass(this.props.match.params.id)
    }

    errorLoadingClassData = () => {
        return Boolean(this.props.currentClass.error);
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
        loadClass: (classId) => dispatch(loadClass(classId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MustBeChef(ChefClass));
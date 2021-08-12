import React from 'react'
import { connect } from 'react-redux'
import { Spinner } from 'react-bootstrap'

import MustBeChef from '../../../hoc/must-be-chef/must-be-chef'
import EditClass from './components/edit-class/edit-class'
import DeleteClass from './components/delete-class/delete-class'

import { getAllClasses } from '../../../services/chef/actions'

class ChefClass extends React.Component {
    constructor() {
        super();
        this.state = {
            classData: null,
        };
    }

    componentDidMount() {
        if (!this.props.allClasses) {
            this.props.getAllClasses();
        } else {
            this.initClassData(this.props);
        }
    }

    componentDidUpdate(prevProps) {
        const hasChanged = this.props.allClasses !== prevProps.allClasses;
        if (hasChanged) {
            this.initClassData(this.props);
        }
    }

    initClassData = (props) => {
        const classData = props.allClasses.find(class_ => class_._id === props.match.params.id)
        this.setState({ classData: classData });
    }

    errorLoadingClassData = () => {
        return this.state.classData === false || this.state.classData === undefined;
    }

    classDataRequestHasCompleted = () => {
        return this.state.classData !== null;
    }

    render() {
        const { classData } = this.state;

        if (this.classDataRequestHasCompleted()) {
            if (this.errorLoadingClassData())
                return <p className='text-danger text-center'>Error loading class</p>
            else
                return (
                    <>
                        <EditClass classData={classData} />
                        <DeleteClass classData={classData} />
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
        allClasses: state.chef.allClasses,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllClasses: () => dispatch(getAllClasses()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MustBeChef(ChefClass));
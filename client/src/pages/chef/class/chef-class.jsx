import React from 'react'
import { connect } from 'react-redux'
import { Spinner } from 'react-bootstrap'

import MustBeChef from '../../../hoc/must-be-chef/must-be-chef'
import EditClass from './components/edit-class/edit-class'
import DeleteClass from './components/delete-class/delete-class'

import formatClassSchedule from '../../../helpers/format-class-schedule'
import { getClassForChef } from '../../../services/chef/api'

class ChefClass extends React.Component {
    constructor() {
        super();
        this.state = {
            classData: null,
        };
    }

    async componentDidMount() {
        await this.initClassData();
    }

    initClassData = async () => {
        let classData;

        if (!this.props.currentClass)
            classData = await this.getClassDataFromApi();
        else
            classData = this.getClassDataFromRedux();

        this.setState({
            classData: classData,
        })
    }

    getClassDataFromApi = async () => {
        return await getClassForChef(this.props.match.params.id);
    }

    getClassDataFromRedux = () => {
        return formatClassSchedule(this.props.currentClass);
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
                        <EditClass classData={classData} updateClassData={this.getClassDataFromApi} />
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
        currentClass: state.chef.currentClass,
    }
}


export default connect(mapStateToProps)(MustBeChef(ChefClass));
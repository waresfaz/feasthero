import React from 'react'
import { connect } from 'react-redux'
import { Spinner } from 'react-bootstrap'

import MustBeChef from '../../../hoc/must-be-chef/must-be-chef'

import { getAllClasses } from '../../../services/chef/actions'
import ChefClassOptions from './components/chef-class-options/chef-class-options'

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

    tryToRenderClassPage = () => {
        let { classData } = this.state;

        if (classData !== null) {
            if (classData === false)
                return <p className='error'>Error loading class</p>
            else
                return (
                    <>
                        <ChefClassOptions classData={classData} />
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
                {this.tryToRenderClassPage()}
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

export default connect(mapStateToProps, mapDispatchToProps)(MustBeChef(ChefClass));
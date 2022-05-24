import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'

import EditClass from './components/edit-class/edit-class'
import DeleteClass from './components/delete-class/delete-class'

import { loadClass } from '../../../../../../services/chef/actions'
import { selectCurrentClass } from '../../../../../../services/chef/selectors'
import useFetch from '../../../../../../redux/hooks/fetch'


function ChefClass(props) {
    const currentClass = useSelector(selectCurrentClass);
    const loadClassError = useSelector(state => state.chef.loadClassError);

    useFetch(loadClass, props.match.params.id);

    if (currentClass) {
        if (loadClassError)
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


export default ChefClass;
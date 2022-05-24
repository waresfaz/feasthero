import React from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import ClassCard from './class-card/class-card';

import { loadAllClasses } from '../../../../../../services/chef/actions';
import useFetch from '../../../../../../redux/hooks/fetch';

function Classes() {
    const error = useSelector(state => state.chef.loadAllClassesError);
    const allClasses = useSelector(state => state.chef.allClasses);

    const loading = useFetch(loadAllClasses);

    let loadClassesResult = <></>;


    if (loading) {
        loadClassesResult = (
            <div className='d-flex justify-content-center'>
                <Spinner animation='border' />
            </div>
        )
    }

    if (error)
        loadClassesResult = <h4 className='text-center text-danger'>Error loading classes</h4>


    if (allClasses) {
        loadClassesResult = (
            <>
                <Row className='justify-content-center' id='chef-classes'>
                    {
                        allClasses.map((classData, key) => {
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
        <>
            <h2 className='text-center font-weight-bold'>Classes</h2>
            {loadClassesResult}
        </>
    )
}


export default Classes;
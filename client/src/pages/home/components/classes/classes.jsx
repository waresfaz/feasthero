import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import ClassCard from './components/class-card/class-card';
import Title from '../../../../components/title/title';
import { getAllClassesForBooking } from '../../../../services/classes/api';

import './classes.scss';

// TODO

function Classes() {
    const [classes, setClasses] = useState(null);
    let classesState = <></>;

    useEffect(() => {
        const fetchClasses = async () => {
            const data = await getAllClassesForBooking();
            setClasses(data);
        }
        fetchClasses();
    }, []);

    if (classes) {
        if (classes.error)
            classesState = <h4 className='text-center text-danger'>Error loading classes</h4>
        else
            classesState = (
                <Row className='justify-content-center' id='classes'>
                    {
                        classes.map((classData, key) => {
                            return (
                                <Col key={key} className='class-card-container' md={11} lg={6} xl={5}>
                                    <ClassCard classData={classData} />
                                </Col>
                            )
                        })
                    }
                </Row>
            );
    } else {
        classesState = <h4 className='text-center'>Loading...</h4>
    }


    return (
        <section id='classes'>
            <Title className='mb-4 text-center'>Hands-on cooking classes taught by world class chefs</Title>

            {classesState}
        </section>
    )
}

export default Classes;
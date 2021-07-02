import React from 'react';

import Landing from './components/landing';
import Classes from './containers/classes';
import Steps from './components/steps';
import ClassFeaures from './components/class-features';
import { Container } from 'react-bootstrap';

class Home extends React.Component {
    render() {
        return (
            <Container fluid>
                <Landing />
                <Classes />
                <Steps />
                <ClassFeaures />
            </Container>
        )
    }
}

export default Home
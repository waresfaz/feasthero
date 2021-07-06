import React from 'react';
import { Container } from 'react-bootstrap';

import Landing from './components/landing/landing';
import Classes from './containers/classes/classes';
import Steps from './components/steps/steps';
import ClassFeaures from './components/class-features/class-features';
import Subscribe from './components/subscribe/subscribe';

class Home extends React.Component {
    render() {
        return (
            <Container fluid>
                <Landing />
                <Classes />
                <Steps />
                <ClassFeaures />
                <Subscribe />
            </Container>
        )
    }
}

export default Home
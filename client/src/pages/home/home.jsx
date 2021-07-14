import React from 'react';

import Landing from './components/landing/landing';
import Classes from './containers/classes/classes';
import Steps from './components/steps/steps';
import ClassFeaures from './components/class-features/class-features';
import Subscribe from './components/subscribe/subscribe';
import Errors from './containers/errors/errors';
class Home extends React.Component {
    render() {
        return (
            <>
                <Landing />
                <Errors />
                <Classes />
                <Steps />
                <ClassFeaures />
                <Subscribe />
            </>
        )
    }
}

export default Home
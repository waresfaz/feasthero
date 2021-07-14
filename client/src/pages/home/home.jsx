import React from 'react';

import Landing from './components/landing/landing';
import Classes from './containers/classes/classes';
import Steps from './components/steps/steps';
import ClassFeaures from './components/class-features/class-features';
import Subscribe from './components/subscribe/subscribe';
import Errors from './containers/errors/errors';
import AboutUs from './components/about-us/about-us';
import ContactUs from './components/contact-us/contact-us';

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
                <AboutUs />
                <ContactUs />
            </>
        )
    }
}

export default Home
import React from 'react';

import Banner from './components/banner';
import Classes from './components/classes';
import HowItWorks from './components/how-it-works';
import ClassFeature from './components/class-features';
import Subscribe from './components/subscribe';

class Landing extends React.Component {
    render() {
        return (
            <>
                <Banner />
                <Classes />
                <HowItWorks />
                <ClassFeature />
                <Subscribe />
            </>
        )
    }
}

export default Landing
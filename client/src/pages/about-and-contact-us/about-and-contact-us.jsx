import React from 'react';
import AboutUs from './components/about-us/about-us';
import ContactUs from './components/contact-us/contact-us';

class AboutAndContactUs extends React.Component {
    render() {
        return (
            <>
                <AboutUs />
                <ContactUs />
            </>
        );
    }
}

export default AboutAndContactUs;
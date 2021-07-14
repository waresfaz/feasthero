import React from 'react'
import { Container, Image } from 'react-bootstrap';
import { Bounce, Fade } from 'react-awesome-reveal';

import Title from '../../../../components/title/title';

import logofull from '../../../../assets/resources/images/logo-full.png';

import './about-us.scss';

class AboutUs extends React.Component {
    render() {
        return (
            <div id='about-us'>
                <Bounce triggerOnce>
                    <Container>
                        <Title>Who we are</Title>
                        <p>
                            Hey there! We're FeastHero, a brand new start-up in Toronto that offers online group cooking classes by local chefs primarily
                            to organizations that are looking for virtual team engagement opprotunites for their remove workforce
                        </p>
                        <p className='mt-4'>
                            We're also avaliable for private groups of 5 or more if you and your friends are looking for something fun to do together in
                            te comfort of your own home
                        </p>
                        <Fade triggerOnce delay={1000}>
                            <Image src={logofull} />
                        </Fade>
                    </Container>
                </Bounce>
            </div>

        )
    }
}

export default AboutUs;
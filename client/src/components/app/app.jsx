import React from 'react';
import {
  Router,
  Switch,
  Route
} from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { initSettings } from '../../settings';
import history from '../../history';
import Home from '../../pages/home/home';
import BookClass from '../../pages/book-class/book-class';
import Checkout from '../../pages/checkout/checkout';
import BookingSuccess from '../../pages/booking-success/booking-success';
import AboutAndContactUs from '../../pages/about-and-contact-us/about-and-contact-us';
import Faq from '../../pages/faq/faq';
import TopNavbar from '../top-navbar/top-navbar';
import Footer from '../footer/footer';

import './app.scss';

class App extends React.Component {
  constructor() {
    super();
    initSettings();
  }

  render() {
    return (
      <>
        <Router history={history}>
          <Container fluid id='main-container'>
            <TopNavbar />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/book/:id' component={BookClass} />
              <Route exact path='/checkout' component={Checkout} />
              <Route exact path='/booking-success' component={BookingSuccess} />
              <Route exact path='/contact' component={AboutAndContactUs} />
              <Route exact path='/faq' component={Faq} />
            </Switch>
          </Container>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;

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
import BookClass from '../../pages/booking/book-class/book-class';
import Checkout from '../../pages/checkout/checkout';
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
            </Switch>
          </Container>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;

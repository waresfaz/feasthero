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
        <Container fluid id='main-container'>
          <Router history={history}>
            <TopNavbar />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/book/:id' component={BookClass} />
            </Switch>
            <Footer />
          </Router>
        </Container>
      </>
    )
  }
}

export default App;

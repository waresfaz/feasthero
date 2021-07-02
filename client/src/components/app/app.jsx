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
          <TopNavbar />
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </Router>
        </Container>
        <Footer />
      </>
    )
  }
}

export default App;

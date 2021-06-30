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

import './app.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor() {
    super();
    initSettings();
  }

  render() {
    return (
      <>
        <Container>
          <TopNavbar />
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </Router>
        </Container>
      </>
    )
  }
}

export default App;

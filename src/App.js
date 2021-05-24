import Header from "./Header";
import Nav from './Nav';
import Landing from "./Landing";
import List from "./List";
import "./App.css";
import "./css/style.css";
import "./css/nice-select.css";
// import "./css/jquery-ui.css";
import "./css/bootstrap.min.css";
import "./css/all.min.css";
import PaymentSuccessModal from "./PaymentSuccessModal";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import PaymentFailureModal from "./PaymentFailureModal";
// main app function. Everything in the return is what is rendered on the screen
function App() {
  return (
    <Router className="main">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <main>
              <Nav />
              {/* <Landing />
              <List /> */}
            </main>
          )}
        ></Route>
        <Route path="/payment_success" component={PaymentSuccessModal}></Route>
        <Route path="/payment_failure" component={PaymentFailureModal}></Route>
      </Switch>
    </Router>
  );
}

export default App;

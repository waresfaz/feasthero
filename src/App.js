import Header from "./Header";
import Landing from "./Landing";
import List from "./List";
import "./App.css";
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
              <Landing />
              <List />
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

import Header from './Header';
import Landing from './Landing';
import List from './List';
import './App.css';
import Axios from 'axios';

// main app function. Everything in the return is what is rendered on the screen
function App() {
  Axios({
    method: "GET",
    url: "http://localhost:5000",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    console.log(res.data.message)
  })

  return (
    <main>
      <Landing />
      <List />
    </main>
  );
}

export default App;

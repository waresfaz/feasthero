import Header from './Header';
import Landing from './Landing';
import List from './List';
import './App.css';

// main app function. Everything in the return is what is rendered on the screen
function App() {
  return (
    <main>
      {/* <Header /> */}
      <Landing />
      <List />
    </main>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { ReactQueryExample } from './components/ReactQueryExample';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <ReactQueryExample />
      </header>
    </div>
  );
}

export default App;

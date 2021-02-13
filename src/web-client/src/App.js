import logo from './logo.svg';
import './App.css';
import { ReactQueryExample } from './components/ReactQueryExample';
import { Ping } from './components/Ping';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Ping />
        <ReactQueryExample />
      </header>
    </div>
  );
}

export default App;

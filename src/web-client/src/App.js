import './App.css';
import { ReactQueryExample } from './components/ReactQueryExample';
import { Ping } from './components/Ping';
import { NewCharacter } from './components/NewCharacter';

import { ReactQueryDevtools } from 'react-query/devtools';
import { Characters } from './components/Characters';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NewCharacter />
        <Characters />
        <Ping />
        <ReactQueryExample />
      </header>
      <ReactQueryDevtools />
    </div>
  );
}

export default App;

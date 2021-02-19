import './App.css';
import { ReactQueryExample } from './components/ReactQueryExample';
import { Ping } from './components/Ping';
import { NewCharacter } from './components/NewCharacter';

import { Characters } from './components/Characters';
import { Link, Switch, Route } from 'react-router-dom';
import { UserProfile } from './components/UserProfile';
import { Character } from './components/Character';
import { Authentication } from './components/Authentication';
import { NotFound } from './components/NotFound';
import { Home } from './components/Home';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/characters" component={Characters} />
        <Route exact path="/characters/:id" component={Character} />
        <Route component={NotFound} />
      </Switch>
      {/* <NewCharacter />
    // <Characters />
    // <Ping />
    // <ReactQueryExample /> */}
    </main>
  );
}

export default App;

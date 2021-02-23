import './App.css';

import { Characters } from './components/Characters';
import { Switch, Route } from 'react-router-dom';
import { UserProfile } from './components/UserProfile';
import { Character } from './components/Character';
import { NotFound } from './components/NotFound';
import { Home } from './components/Home';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  margin: 1em auto;
  align-self: center;
  color: rgb(1, 185, 0);
`;

function App() {
  return (
    <Container>
      <Title>Ricky and Morty Fun Times Webpage</Title>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/characters" component={Characters} />
        <Route exact path="/characters/:id" component={Character} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  );
}

export default App;

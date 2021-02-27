import { Characters } from './components/Characters';
import { Switch, Route, Link } from 'react-router-dom';
import { UserProfile } from './components/UserProfile';
import { Character } from './components/Character';
import { NotFound } from './components/NotFound';
import { Home } from './components/Home';
import styled from 'styled-components';
import { CenterSmallLayout, LayoutOne, LayoutTwo } from './components/Layouts';
import Navbar from './components/navbar/Navbar';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';
import { LoginAndSignUp } from './components/LoginAndSignUp';

const Container = styled.div`
  font-family: 'Arimo';
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1,
  h2,
  h3,
  h5 {
    margin: 0;
  }
`;

function RouteWrapper({ component: Component, layout: Layout, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

function App() {
  return (
    <Container>
      <Navbar />
      <Switch>
        <RouteWrapper
          exact
          path="/"
          component={Home}
          layout={CenterSmallLayout}
        />
        <RouteWrapper
          exact
          path="/profile"
          component={UserProfile}
          layout={CenterSmallLayout}
        />
        <Route exact path="/characters" component={Characters} />
        <RouteWrapper
          exact
          path="/login-and-signup"
          component={LoginAndSignUp}
          layout={CenterSmallLayout}
        />
        <Route exact path="/phones" component={() => <div>Phones page</div>} />
        <Route exact path="/characters/:id" component={Character} />
        <RouteWrapper
          path="/one"
          component={() => <div>One page</div>}
          layout={LayoutOne}
        />
        <RouteWrapper
          path="/signup"
          component={SignUp}
          layout={CenterSmallLayout}
        />
        <RouteWrapper
          path="/login"
          component={Login}
          layout={CenterSmallLayout}
        />
        <RouteWrapper component={NotFound} layout={CenterSmallLayout} />
      </Switch>
    </Container>
  );
}

export default App;

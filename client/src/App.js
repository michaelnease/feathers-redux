import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './contexts/auth.context';
// import PrivateRoute from './components/privateRoute';
import { With_Header, With_Header_Sidebar } from './components/layouts/main';
import Home from './pages/Home';
import Chat from './pages/chat/application';
import 'beyond-ui/beyond-ui.css';

const App = () => {
  return (
    <Auth>
      <Router>
        <Switch>
          <Route exact path="/">
            <p>Home</p>
          </Route>
          <Route exact path="/historical-data">
            <With_Header_Sidebar>
              <p>Historical Data</p>
            </With_Header_Sidebar>
          </Route>
          <Route exact path="/projects">
            <With_Header>
              <p>projects</p>
            </With_Header>
          </Route>
          <Route exact path="/chat">
            <With_Header>
              <Chat />
            </With_Header>
          </Route>
          {/* <PrivateRoute exact path="/">
            <Template variant="main">
              <Dashboard />
            </Template>
          </PrivateRoute> */}
        </Switch>
      </Router>
    </Auth>
  );
};

export default App;

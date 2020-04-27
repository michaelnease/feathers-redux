import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './contexts/authContext';
// import PrivateRoute from './components/privateRoute';
// import Template from './components/template';
import Home from './pages/Home';
// import Chat from './pages/chat/application';
// import Dashboard from './pages/dashboard';

const App = () => {
  return (
    <Auth>
      <Router>
        <Switch>
          <Route exact path="/">
            {/* <Template variant="clear"> */}
            <Home />
            {/* </Template> */}
          </Route>
          <Route exact path="/chat">
            <p>blah</p>
            {/* <Template variant="clear"> */}
            {/* <Chat /> */}
            {/* </Template> */}
          </Route>
          {/* <PrivateRoute exact path="/">
            <Template variant="main">
              <Dashboard />
            </Template>
          </PrivateRoute> */}
          {/* <PrivateRoute path="/dashboard">
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

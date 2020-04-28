import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './contexts/auth.context';
// import PrivateRoute from './components/privateRoute';
import { WithHeader, WithHeaderSidebar } from './components/layouts/main';

import Home from './pages/home';
import HistoricalData from './pages/historical-data';
import CreateNewProject from './pages/create-new-project';
import Projects from './pages/projects';
import Worksheets from './pages/worksheets';
import Archive from './pages/archive';
import Chat from './pages/chat/application';
import './theme/FPT.css';

const App = () => {
  return (
    <Auth>
      <Router>
        <Switch>
          <Route exact path="/">
            <WithHeaderSidebar initialSidebarState={false}>
              <Home />
            </WithHeaderSidebar>
          </Route>

          <Route exact path="/historical-data">
            <WithHeaderSidebar initialSidebarState={true}>
              <HistoricalData />
            </WithHeaderSidebar>
          </Route>

          <Route exact path="/create-new-project">
            <WithHeaderSidebar initialSidebarState={true}>
              <CreateNewProject />
            </WithHeaderSidebar>
          </Route>

          <Route exact path="/projects">
            <WithHeaderSidebar initialSidebarState={false}>
              <Projects />
            </WithHeaderSidebar>
          </Route>

          <Route exact path="/worksheets">
            <WithHeaderSidebar initialSidebarState={false}>
              <Worksheets />
            </WithHeaderSidebar>
          </Route>

          <Route exact path="/Archive">
            <WithHeaderSidebar initialSidebarState={false}>
              <Archive />
            </WithHeaderSidebar>
          </Route>

          <Route exact path="/chat">
            <WithHeader>
              <Chat />
            </WithHeader>
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

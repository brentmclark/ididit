import React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import TasksLayout from './layouts/Tasks'
import GoalsLayout from './layouts/Goals'
import HomeLayout from './layouts/Home'


Amplify.configure(awsconfig);

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/tasks">Tasks</Link>
              </li>
              <li>
                <Link to="/goals">Goals</Link>
              </li>
            </ul>
          </nav>
        <Switch>
          <Route path="/tasks">
            <TasksLayout />
          </Route>
          <Route path="/goals">
            <GoalsLayout />
          </Route>
          <Route path="/">
            <HomeLayout />
          </Route>
        </Switch>
        </header>
      </div>
      
    </Router>
  );
}

export default withAuthenticator(App, true);

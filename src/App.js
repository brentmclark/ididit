import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';


import React from 'react';
import './App.css';
import TaskList from './primatives/TaskList'

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tasks</h1>
        <TaskList />
      </header>
    </div>
  );
}

export default withAuthenticator(App, true);

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, Connect } from 'aws-amplify-react'; // or 'aws-amplify-react-native';


import React from 'react';
import logo from './logo.svg';
import './App.css';
import TaskList from './primatives/TaskList'

Amplify.configure(awsconfig);

const listTasks = `query listTasks {
  listTasks{
    items{
      id
      title
      value
    }
  }
}`;

const addTask = `mutation createTask($title:String! $value: Int!) {
  createTask(input:{
    title:$title
    value:$value
  }){
    id
    title
    value
  }
}`;

function App() {

  const todoMutation = async () => {
    const taskDetails = {
      title: 'Feed the cat',
      value: 10
    };
  
    const newTodo = await API.graphql(graphqlOperation(addTask, taskDetails));
    alert(JSON.stringify(newTodo));
  };
  
  const listQuery = async () => {
    console.log('listing todos');
    const allTodos = await API.graphql(graphqlOperation(listTasks));
    alert(JSON.stringify(allTodos));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <TaskList />
        <button onClick={listQuery}>GraphQL Query</button>
        <button onClick={todoMutation}>GraphQL Mutation</button>
      </header>
    </div>
  );
}

export default withAuthenticator(App, true);

/* eslint-disable */
import React, { Component } from 'react';
import Entry from './Entry.jsx';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      parsedData: null
    };
  }

  componentDidMount() {
    const sampleData = [{name: 'n1', description: 'd1'},
                        {name: 'n2', description: 'd2'}]
    this.setState({parsedData: sampleData})
  }
  // A CONSTANT REMINDER: use es6 arrow function to let THIS know that it's referring
  // to the class App, otherwise state will never get reached


  render() {
    return (
      <div className="App">
        <h1>
          GutenTech
        </h1>
        <p>
          Welcome!
        </p>
          Switch Name
        {}
      </div>
    );
  }
}

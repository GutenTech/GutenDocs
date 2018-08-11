import React, { Component } from 'react';
import Entry from './Entry.jsx';
import sampleData from '../../dist/parsedData.js';
/* import sampleData from './parsedData.js'; */


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      parsedData: null
    };
  }


  componentDidMount() {
    console.log('component has mounted:');
    console.log(exampleData);
  }

  render() {
    return (
      <div className="App">
        <h1>
          GutenTech
        </h1>
        <p>
          hello
        </p>
          Switch Name
      </div>
    );
  }
}

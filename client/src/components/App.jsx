import React, { Component } from 'react';
import Entry from './Entry.jsx';
import extract from '../../../src/parser/processFile.js';

export default class App extends React.Component { 
  constructor () {
    super();
    this.state = {
      parsedData: null
    }
  }
}

<<<<<<< HEAD
  componentDidMount ();{
    this.setState({parsedData: 'hello'})
    console.log('new state is:', this.state.parsedData)
=======
  componentDidMount() {
    const sampleData = test.test();
    this.setState({parsedData: sampleData})
>>>>>>> Modify Webpack Config for FS File System and Add Processesor File
  }

  render() {
    return (
      <div className="App">
        <h1>
          GutenTech
        </h1>
        <p>
          <Entry name={this.state.parsedData}/>
        </p>
          Switch Name
      </div>
    );
  }
}

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

  componentDidMount() {
    const sampleData = test.test();
    this.setState({parsedData: sampleData})
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

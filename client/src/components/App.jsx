import React, { Component } from 'react';
import Entry from './Entry.jsx';
import sampleData from '../../dist/parsedData.js';

export default class App extends React.Component { 
  constructor () {
    super();
    this.state = {
      parsedData: null
    }
  }
}

  componentDidMount() {
   console.log('component has mounted:');
   console.log(sampleData.exampleData);
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

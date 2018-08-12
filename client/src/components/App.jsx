import React, { Component } from 'react';
import Entry from './Entry.jsx';
import('./parsedData.js').then(result => console.log(result.default.exampleData));

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      parsedData: null
    };
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

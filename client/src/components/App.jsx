import React, { Component } from 'react';
import Entry from './Entry.jsx';

export default class App extends React.Component { 
  constructor () {
    super();
    this.state = {
      parsedData: null
    }
  }
}

  componentDidMount ();{
    this.setState({parsedData: 'hello'})
    console.log('new state is:', this.state.parsedData)
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

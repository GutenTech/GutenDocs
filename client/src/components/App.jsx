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
            <h1>GutenTech</h1>
            <p>Welcome!</p>
            <button onClick ={this.switchParamHandler.bind(this,'mcsteezy')}>Switch Name</button>
            <MockData>
             param = {this.state.params[0].param}
             food= {this.state.params[0].food}
             click={this.switchNameHandler.bind(this,'wompwomp')}>
             My Hobbies: enjoying life!
            </MockData>
        </div>
    );
  }
}

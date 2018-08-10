/* eslint-disable */
import React, { Component } from 'react';
// import MockData from '../.MockData';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      params: [
        { param: 'David' },
        { param: 'Peter' },
        { param: 'Yuqi' },
        { param: 'Uday' },
      ],
    };
  }

  // A CONSTANT REMINDER: use es6 arrow function to let THIS know that it's referring
  // to the class App, otherwise state will never get reached
  switchParamHandler(newParam) {
    this.setState({
      params: [
        { param: newParam, food: 'pizza' },
        { param: 'gierkepet', food: 'burger' },
        { param: 'yzhu', food: 'bbq' },
        { param: 'trivediu', food: 'lasagna' },
      ],
    });
  }

  // /* <MockData>
  //   param = {this.state.params[0].param}
  //   food= {this.state.params[0].food}
  //   click={this.switchNameHandler.bind(this, 'wompwomp')}>
  //   My Hobbies: enjoying life!
  //     </MockData> */

  render() {
    return (
      <div className="App">
        <h1>
          GutenTech
        </h1>
        <p>
          Welcome!
        </p>
        <button type="button" onClick={this.switchParamHandler.bind(this, 'mcsteezy')}>
          Switch Name
        </button>
      </div>
    );
  }
}

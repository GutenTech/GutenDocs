import React, { Component } from 'react';
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      parsedData: null,
    };
  }

  componentWillMount() {
    import('./parsedData.js').then(result => this.setState( { parsedData: result.default.APIdata } ));
  }

  render() {
    if (this.state.parsedData === null) {
      return (<div></div>);
    }
    return (
        <div className="App">
          <h1>
            GutenTech
          </h1>
          {
            this.state.parsedData.map((func, index) => {
              return (
                <div key = {index}>
                  <h2>{func.name}</h2>
                  <h3>{func.description}</h3>
                </div>
              );
            })
        }
      </div>
    );
  }
}

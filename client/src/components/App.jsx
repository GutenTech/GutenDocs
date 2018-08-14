/* eslint-disable */
import React, { Component } from 'react';
/* eslint-enable */
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      parsedData: null,
    };
  }

  componentWillMount() {
    import('./parsedData.js').then(result => this.setState({ parsedData: result.default.APIdata }));
  }

  render() {
    const { parsedData } = this.state;
    if (parsedData === null) {
      return (<div />);
    }
    return (
      <div className="App">
        <h1>
            GutenTech
        </h1>
        {
          parsedData.map(func => (
            <div>
              <h2>
                {func.name}
              </h2>
              <h3>
                {func.description}
              </h3>
            </div>
          ))
      }
      </div>
    );
  }
}

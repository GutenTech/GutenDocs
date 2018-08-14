/* eslint-disable */
import React, { Component } from 'react';
/* eslint-enable */
const getData = () => import('./parsedData.json');
const getConfig = () => import('./configData.json');

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      parsedData: [],
      configData: [],
    };
  }

  componentDidMount() {
    getData().then(data => this.setState({ parsedData: data.default }));
    getConfig().then(data => this.setState({ configData: data.default }));
  }

  render() {
    const { parsedData, configData } = this.state;
    return (
      <div className="App">
        <h1>
          {/*eslint-disable*/}
          <img {...configData.banner} style={configData.banner ? {} : { display: 'none' }} />
          {/* eslint-enable */}
          <div style={configData.banner ? { display: 'none' } : {}} />

          GutenDocs

          <div />
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

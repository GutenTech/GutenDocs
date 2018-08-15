/* eslint-disable */
import React, { Component } from 'react';
import Sidebarr from './SideBar.jsx';
/* eslint-enable */
const getData = () => import('./parsedData.json');
const getConfig = () => import('./configData.json');
const path = require('path');

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
      {console.log(parsedData)}
        <h1>
          {/*eslint-disable*/}
          <img {...configData.banner} style={configData.banner ? {} : { display: 'none' }} />
          {/* eslint-enable */}
          <div style={configData.banner ? { display: 'none' } : {}} />

          GutenDocs

          <div />
        </h1>
        {
          parsedData.map(file => (
            <React.Fragment>
              <h2>
                {
                  `Functions in the file ${path.basename(file.fileName)}`
                }
              </h2>
              <div>
                {
                  file.content.map(func => (
                    <div>
                      <h2>
                        {`${func.name} function`}
                      </h2>
                      <h3>
                        {func.description}
                      </h3>
                    </div>
                  ))
                }
              </div>
            </React.Fragment>
          ))
      }
      </div>
    );
  }
}

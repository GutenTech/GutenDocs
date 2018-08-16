/* eslint-disable */
import React, { Component } from 'react';
// import Sidebarr from './SideBar.jsx';
import Intro from './GettingStarted.jsx';
import '../../dist/styles.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { NavHashLink as NavLink } from 'react-router-hash-link';
// import gutenDocsLogo from '../../dist/resources/gutendocslogo.png';
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
    const { bulma } = configData;
    console.log(this.state);
    return (
<<<<<<< HEAD
      <Router>
        <div className="App">
          <h1 className="logo">
            {/*eslint-disable*/}
            <img {...configData.banner} style={configData.banner ? {} : { display: 'none' }} />
            {/* eslint-enable */}
          </h1>
          <div className = "download">
            <button id="npm"><i class="fa fa-download"></i> npm Download</button>
          </div>
          <div className = "starter">
            <Intro/>
          </div>
          {
            parsedData.map(file => (
              <React.Fragment>
                
                {/* <h2>
                  {
                    `Functions in the file ${path.basename(file.fileName)}`
                  }
                </h2> */}
                <div>
                  {
                    file.content.map(func => (
                      <div className = "body">
                        <h2>
                          {`${func.name} function`}
                        </h2>
                        <p>
                          {func.description}
                        </p>
                      </div>
                    ))
                  }
                </div>
              </React.Fragment>
            ))
        }
        </div>
    </Router>
=======
      <div className="App">
      {console.log(parsedData)}
        <h1>
          {/*eslint-disable*/}
          <img {...configData.banner} style={configData.banner ? {} : { display: 'none' }} />
          {/* eslint-enable */} 
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
>>>>>>> demo stuff
    );
  }
}

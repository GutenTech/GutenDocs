/* eslint-disable */
import React, { Component } from 'react';
// import Sidebarr from './SideBar.jsx';
import Intro from './GettingStarted.jsx';
import '../../dist/styles.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import SideBar from './SideBar.jsx';
import Test1 from './Test1';
// import gutenDocsLogo from '../../dist/resources/gutendocslogo.png';
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
    console.log("appJSX", parsedData, configData);
    return (
      <Router>
        <div className="App">
          <h1 className="logo">
            {/*eslint-disable*/}
            <img {...configData.banner} style={configData.banner ? {} : { display: 'none' }} />
            {/* eslint-enable */}
          </h1>
          <div className="download">
            <button type="button" id="npm">
              <i className="fa fa-download" />
              npm Download
            </button>
          </div>
          <SideBar />
          <div className="starter">
            <Intro />
            <Test1 />
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
                      <div className="body">
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
    );
  }
}
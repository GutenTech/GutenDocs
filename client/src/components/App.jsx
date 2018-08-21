/* eslint-disable */
import React, { Component } from 'react';
// import Sidebarr from './SideBar.jsx';
import Intro from './Intro.jsx';
import '../../dist/styles.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import Header from './Header';
import SideBar from './SideBar.jsx';
import Test1 from './Test1';
// import gutenDocsLogo from '../../dist/resources/gutendocslogo.png';
/* eslint-enable */
const getData = () => import('./parsedData.json');
const getConfig = () => import('./configData.json');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parsedData: undefined,
      configData: undefined,
    };
  }

  componentDidMount() {
    getData().then(data => this.setState({ parsedData: data.default }));
    getConfig().then(data => this.setState({ configData: data.default }));
  }

  render() {
    const { parsedData, configData } = this.state;
    if (parsedData === undefined || configData === undefined) {
      return (<div>Loading</div>);
    }
    return (
      <Router>
        <div className="App">
          <h1 className="logo">
            {/*eslint-disable*/}
            <img {...configData.banner} style={configData.banner ? {} : { display: 'none' }} />
            {/* eslint-enable */}
          </h1>
          <Header />
          <div className="download">
            <button type="button" id="npm">
              <i className="fa fa-download" />
              npm Download
            </button>
          </div>
          <SideBar {...this.state} />
          <div className="starter">
            <Intro text={configData.introTxt} />
            <Test1 />
          </div>
          {
            parsedData.map(comment => (
              <div className="body">
                <h2 id="atName">
                  {`${comment.name} function`}
                </h2>
                <p>
                  {comment.description}
                </p>
              </div>
            ))
          }
        </div>
      </Router>
    );
  }
}
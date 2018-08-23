/* eslint-disable */
import React, { Component } from 'react';
// import Sidebarr from './SideBar.jsx';
import Intro from './Intro.jsx';
import '../../dist/styles.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar.jsx';
import Test1 from './Test1';
import SideBarFuncEntry from './SidebarFuncEntry.jsx';
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
          <SideBar parsedData={parsedData} />
          <div className="starter">
            <Intro text={configData.introTxt} />
            <Test1 />
          </div>
          {
            parsedData.map(comment => (
              <div className="body" key={comment.id}>
                <h2 id={`#${comment.id}`}>
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
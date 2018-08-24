/* eslint-disable */
import React, { Component } from 'react';
// import Sidebarr from './SideBar.jsx';
import Intro from './Intro.jsx';
import '../../dist/styles.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar.jsx';
import BodyFunctionDesc from './BodyFunctionDesc';

// import gutenDocsLogo from '../../dist/resources/gutendocslogo.png';
/* eslint-enable */
const getData = () => import('./parsedData.json');
const getConfig = () => import('./configData.json');

const filterByHeaders = (header, commentsArray) => commentsArray
  .filter(entry => header === entry.header);

const uniqueHeaders = (arrayOfComments) => {
  const headerPriorities = {};
  arrayOfComments.forEach((comment) => {
    headerPriorities[comment.header] = comment.priority;
  });
  let headers = Object.keys(headerPriorities);
  headers = headers.sort((a, b) => {
    if (headerPriorities[a] < headerPriorities[b]) return -1;
    if (headerPriorities[a] > headerPriorities[b]) return 1;
    return 0;
  });
  return headers;
};

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
    if (parsedData === undefined || parsedData.length === 0) {
      return (<div>{'Problem Loading Data, did you run "gutendocs parse [<filename>, --all]"'}</div>);
    }
    if (configData === undefined || configData.length === 0) {
      return (
        <div>
          {'Problem Loading Data, did you run "gutendocs config"'}
        </div>
      );
    }
    const prioritySortedUniqueHeaders = uniqueHeaders(parsedData);
    return (
      <Router>
        <div className="App">
          <h1 className="logo">
            {/*eslint-disable*/}
            <img {...configData.banner} style={configData.banner ? {} : { display: 'none' }} />
            {/* eslint-enable */}
          </h1>
          <Header />
          <SideBar
            parsedData={parsedData}
            sortedHeaders={prioritySortedUniqueHeaders}
            configData={configData}
          />
          <div className="starter">
            <Intro text={configData.introTxt} />
            {/* <Test1 /> */}
          </div>
          {
            prioritySortedUniqueHeaders.map((header, index) => (
              <div className="tagSection" key={header.concat(index)}>
                <h2 className="body" id={header}>
                  {header}
                </h2>
                {filterByHeaders(header, parsedData)
                  .map(funcComment => (
                    <BodyFunctionDesc funcComment={funcComment} key={funcComment.id} />
                  ))
                }
              </div>
            ))
          }
        </div>
      </Router>
    );
  }
}
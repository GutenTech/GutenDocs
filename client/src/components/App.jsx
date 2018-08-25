/* eslint-disable */
import React, { Component } from 'react';
// import Sidebarr from './SideBar.jsx';
import Intro from './Intro.jsx';
import '../../dist/styles.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar.jsx';
import BodyFunctionDesc from './BodyFunctionDesc';

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
    };
  }

  render() {
    if (window.parsedData === undefined || window.parsedData.length === 0) {
      return (<div>{'Problem Loading Data, did you run "gutendocs parse [<filename>, --all]"'}</div>);
    }
    if (window.configData === undefined || window.configData === 0) {
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
            parsedData={window.parsedData}
            sortedHeaders={prioritySortedUniqueHeaders}
            configData={window.configData}
          />
          <div className="starter">
            <Intro text={window.configData.introTxt} />
            {/* <Test1 /> */}
          </div>
          {
            prioritySortedUniqueHeaders.map((header, index) => (
              <div className="tagSection" key={header.concat(index)}>
                <h2 className="body" id={header}>
                  {header}
                </h2>
                {filterByHeaders(header, window.parsedData)
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
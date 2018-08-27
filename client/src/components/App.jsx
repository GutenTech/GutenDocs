/* eslint-disable-next-line import/no-extraneous-dependencies */
import React, { Component } from 'react';
import Intro from './Intro';
import SideBar from './SideBar';
import BodyFunctionDesc from './BodyFunctionDesc';
import '../../dist/styles.css';

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
          {'Problem Loading Configuration Data, make sure your gutenConfig is exporting a valid json.'}
        </div>
      );
    }
    /* eslint-disable-next-line no-undef */ // imported onto window from index.html
    const prioritySortedUniqueHeaders = uniqueHeaders(parsedData);
    return (
      <div className="App">
        <h1 className="logo">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img {...window.configData.banner} style={window.configData.banner ? {} : { display: 'none' }} />
        </h1>
        <div className="headerlogo">
          <h1 id="gutendocs" data="GutenDocs">
          GutenDocs
          </h1>
        </div>
        <SideBar
          parsedData={window.parsedData}
          sortedHeaders={prioritySortedUniqueHeaders}
          configData={window.configData}
        />
        <div className="starter">
          <Intro text={window.configData.introTxt} />
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
    );
  }
}
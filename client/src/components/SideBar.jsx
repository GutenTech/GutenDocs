/* eslint-disable-next-line import/no-extraneous-dependencies */
import React from 'react';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import SideBarSections from './SideBarSections';
/* eslint-enable */
class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parsedData: props.parsedData,
    };
  }

  updateSearch() {
    const { parsedData } = this.props;
    const result = [];
    for (let i = 0; i < parsedData.length; i += 1) {
      if (parsedData[i].name.includes(this.search.value)) {
        result.push(parsedData[i]);
      }
    }
    this.setState({ parsedData: result });
  }

  render() {
    const { sortedHeaders, configData } = this.props;
    const { parsedData } = this.state;
    return (
      <div className="wrapper">
        <nav
          id="sidebar"
          style={configData.colors.primaryColorOne
            ? {
              background:
                'linear-gradient(142deg, '
                + `${configData.colors.primaryColorTwo}, `
                + `${configData.colors.primaryColorThree}) `,
            }
            : {}
          }
        >
          <div
            id="header"
            style={configData.colors.primaryColorOne
              ? { background: configData.colors.primaryColorOne }
              : {}}
          >
            <h5>
              {
                configData.projectName
              }
            </h5>
            <br />
          </div>
          <input
            type="text"
            id="myInput"
            placeholder="Search..."
            ref={(input) => { this.search = input; }}
            onChange={this.updateSearch.bind(this)}
          />
          <ul className="list-unstyled components">
            <li id="home">
              <a href="#Top">
                <i className="fa fa-home" />
                {' '}
                Top
                {' '}
                {' '}
              </a>
            </li>
            <SideBarSections
              parsedData={parsedData}
              sortedHeaders={sortedHeaders}
              configData={configData}
            />
          </ul>
        </nav>
      </div>
    );
  }
}

SideBar.propTypes = {
  /* eslint-disable-next-line */
  parsedData: PropTypes.array.isRequired,
  /* eslint-disable-next-line */
  sortedHeaders: PropTypes.array.isRequired,
  /* eslint-disable-next-line */
  configData: PropTypes.object.isRequired,
};

export default SideBar;
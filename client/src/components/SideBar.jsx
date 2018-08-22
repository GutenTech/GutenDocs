/* eslint-disable */
import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import HeaderComment from './HeaderComment.jsx';
import Header from './Header';
import PropTypes from 'prop-types';
/* eslint-enable */
class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // search: ""
    };
  }

  // updateSearch = (event) => {
  //   this.setState({search: event.target.value.substr(0,25)});
  // };

  render() {
    const { parsedData } = this.props;
    return (
      <div className="wrapper">
        <nav id="sidebar">
          <div id="header">
            <h5>GutenDocs</h5>
            <br />
          </div>
          <input type="text" id="myInput" placeholder="Search..." onChange={this.updateSearch} />
          <ul className="list-unstyled components">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <AnchorLink offset={() => 100} href="#things">Things</AnchorLink>
            </li>
            <HeaderComment parsedData={parsedData} />
          </ul>
        </nav>
      </div>
    );
  }
}

SideBar.propTypes = {
  /* eslint-disable-next-line */
  parsedData: PropTypes.array.isRequired,
};

export default SideBar;
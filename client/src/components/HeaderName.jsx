import React, { Component } from 'react';

class HeaderName extends Component {
    constructor(props) {
      super(props);
  }
  render() {
    return (
        <h5> {this.props.parsedData.header} </h5>
    )
  }
}
// <li> {this.props.parsedData.name} </li>
export default HeaderName;
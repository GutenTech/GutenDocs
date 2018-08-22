import React from 'react';
import PropTypes from 'prop-types';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const HeaderComment = ({ parsedData }) => (
  <ul>
    {parsedData.map((comment, index) => (
      <li className="sideHeader" key={index}>
        <h5>{comment.header}</h5>
        <AnchorLink
          offset={() => 100}
          href="#"
        >
          {comment.name}
        </AnchorLink>
      </li>))}
  </ul>
);

HeaderComment.propTypes = {
  parsedData: PropTypes.string.isRequired,
};

export default HeaderComment;
// import React, { Component } from 'react';

// class HeaderComment extends Component {
//     constructor(props) {
//       super(props);

//       const parsedData = this.props.parsedData;
//       const headers = parsedData.map((comments, index) =>
//         <li className="sideHeader" key={index}> {comments.header} </li>);
//   }
//   render() {
//     return this.headers;
//   }
// }
// // <li> {this.props.parsedData.name} </li>
// export default HeaderComment;


// parsedData = this.props.parsedData
//     headers = parsedData.map((comments, index) =>
//     <ul className="list-unstyled components">
//       <li className="headerComment" key={index}> 
//          <AnchorLink offset={() => 100}    
//            href={comments.header || "#"}>{comments.header}
//          </AnchorLink>
//        </li>
//     </ul>
//     );


// parsedData = this.props.parsedData
// headers = parsedData.map((comments, index) =>
//   (<ul className="list-unstyled components">
//     <li className="headerComment" key={index}> 
//       <AnchorLink offset={() => 100}    
//         href={comments.header || "#"}>{comments.header}
//       </AnchorLink>
//     </li>
//     <li className="nameComment" key={index}> 
//       <AnchorLink offset={() => 100}    
//         href={comments.name || "#"}>{comments.name}
//       </AnchorLink>
//     </li>
//   </ul>)
// );
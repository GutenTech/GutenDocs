/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import AnchorLink from 'react-anchor-link-smooth-scroll';
<<<<<<< HEAD
import SidebarFuncEntry from './SidebarFuncEntry';
/* eslint-enable */

const HeaderComment = ({ parsedData }) => {
  const uniqueHeaders = (arrayOfComments) => {
    const headerPriorities = [];
    arrayOfComments.forEach((comment) => {
      headerPriorities[comment.priority] = comment.header;
    });
    return headerPriorities;
  };

  const filterHeaders = (header, commentsArray) => commentsArray
    .filter(entry => header === entry.header);
  return (
    <ul>
      {
        uniqueHeaders(parsedData).map(header => (
          <div key={header}>
            <h5>
              {header}
            </h5>
            {
              filterHeaders(header, parsedData)
                .map(funcComment => <SidebarFuncEntry comment={funcComment} key={funcComment.id} />)
            }
          </div>
        ))
      }
    </ul>);
};
=======
/* eslint-enable */
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
>>>>>>> logo is aligned and header and name are functioning on the sidebar

HeaderComment.propTypes = {
  /* eslint-disable-next-line */
  parsedData: PropTypes.array.isRequired,
};

export default HeaderComment;
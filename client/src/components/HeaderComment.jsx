/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import SidebarFuncEntry from './SidebarFuncEntry';
/* eslint-enable */

const HeaderComment = ({ parsedData, sortedHeaders }) => {
  const filterHeaders = (header, commentsArray) => commentsArray
    .filter(entry => header === entry.header);
  return (
    <ul>
      {
        sortedHeaders.map(header => (
          <div key={header}>
            <AnchorLink
              offset={() => 100}
              href={`#${header}`}
            >
              <h5 id="headerComment">
                {header}
              </h5>
            </AnchorLink>
            {
              filterHeaders(header, parsedData)
                .map(funcComment => <SidebarFuncEntry comment={funcComment} key={funcComment.id} />)
            }
            <br />
            <br />
          </div>
        ))
      }
    </ul>);
};

HeaderComment.propTypes = {
  /* eslint-disable-next-line */
  parsedData: PropTypes.array.isRequired,
  /* eslint-disable-next-line */
  sortedHeaders: PropTypes.array.isRequired,
};

export default HeaderComment;
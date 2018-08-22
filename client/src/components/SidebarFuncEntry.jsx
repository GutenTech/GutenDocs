/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import AnchorLink from 'react-anchor-link-smooth-scroll';
/* eslint-enable */

const SidebarFuncEntry = ({ comment }) => (
  <li>
    <AnchorLink
      offset={() => 100}
      href={`#${comment.id}`}
    >
      {comment.name}
    </AnchorLink>
  </li>
);

export default SidebarFuncEntry;

SidebarFuncEntry.propTypes = {
  /* eslint-disable-next-line */
  comment: PropTypes.object.isRequired,
};
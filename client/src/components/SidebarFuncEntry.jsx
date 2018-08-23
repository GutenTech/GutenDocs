/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import AnchorLink from 'react-anchor-link-smooth-scroll';
/* eslint-enable */

const SidebarFuncEntry = ({ comment, configData }) => (
  <li id="nameComment">
    <AnchorLink
      offset={() => configData.anchorHashJump}
      href={`#${comment.name.concat(comment.id)}`}
    >
      {comment.name}
      <br />
    </AnchorLink>
  </li>
);

export default SidebarFuncEntry;

SidebarFuncEntry.propTypes = {
  /* eslint-disable-next-line */
  comment: PropTypes.object.isRequired,
  /* eslint-disable-next-line */
  configData: PropTypes.object.isRequired,
};
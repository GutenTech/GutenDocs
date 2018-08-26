/* eslint-disable-next-line import/no-extraneous-dependencies */
import React from 'react';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import AnchorLink from 'react-anchor-link-smooth-scroll';

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
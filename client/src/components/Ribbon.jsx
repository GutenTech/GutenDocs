/* eslint-disable-next-line import/no-extraneous-dependencies */
import React from 'react';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import PropTypes from 'prop-types';

const Ribbon = ({ show }) => (
  <a href="https://github.com/GutenTech/GutenDocs" style={show ? {} : { display: 'none' }}>
    <img
      style={
          {
            position: 'absolute',
            top: 0,
            right: 0,
            border: 0,
          }
        }
      src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png"
      alt="Made with Gutendocs"
    />
  </a>
);

export default Ribbon;

Ribbon.propTypes = {
  show: PropTypes.bool,
};

Ribbon.defaultProps = {
  show: true,
};
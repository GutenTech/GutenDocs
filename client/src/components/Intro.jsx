/* eslint-disable-next-line import/no-extraneous-dependencies */
import React from 'react';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import PropTypes from 'prop-types';

const Intro = ({ text }) => {
  const headers = Object.keys(text);
  return (
    <div className="intros">
      {
        headers.map(header => (
          <div key={header}>
            <h2>
              {header}
            </h2>
            <p>
              {text[header]}
            </p>
          </div>
        ))
      }
    </div>
  );
};

Intro.propTypes = {
  /* eslint-disable-next-line react/forbid-prop-types */
  text: PropTypes.object.isRequired,
};

export default Intro;
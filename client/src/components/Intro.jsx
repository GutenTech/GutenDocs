/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
/* eslint-enable */
// import example from '../../dist/imgs/example.png';
// ideally we would have separate components for each h2
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
/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
/* eslint-enable */
// import example from '../../dist/imgs/example.png';
// ideally we would have separate components for each h2
const Intro = ({ text }) => (
  <div className="intros">
    <h2>Getting Started</h2>
    <p>
      {text.gettingStarted}
    </p>
    <br />
    <br />
    <h2>Installation</h2>
    <p>
      {text.installation}
    </p>
    <br />
    <br />
    <h2>Examples</h2>
    <p>
      {text.examples}
    </p>
    <br />
    <br />
    <h2>Support</h2>
    <p>
      {text.support}
    </p>
    <br />
    <br />
    <h2>FAQ</h2>
    <p>
      {text.FAQ}
    </p>
    <hr />
    <br />
    <br />
  </div>
);

Intro.propTypes = {
  /* eslint-disable-next-line react/forbid-prop-types */
  text: PropTypes.object.isRequired,
};

export default Intro;
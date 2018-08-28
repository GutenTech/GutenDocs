/* eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
/* eslint-enable */

/**
 * @description displays the info about the field
 * @param { object } data about the field
 */
const FieldInfo = ({ data }) => (
  <div>
    <h1>
      Upcoming Events at
      {data.fieldName}
    </h1>
    <h6>
      Notes:
      {data.notes}
    </h6>
  </div>
);

FieldInfo.propTypes = {
  /* eslint-disable */
  data: PropTypes.object.isRequired,
  /* eslint-line */
};

module.exports = FieldInfo;
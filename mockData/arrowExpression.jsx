/* eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
/* eslint-enable */

/**
 * @description displays the info about the field
 * @param props.data.fieldName the name of the field
 * @param props.data.notes the notes on the field
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
/* eslint-disable-next-line import/no-extraneous-dependencies */
import React from 'react';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import PropTypes from 'prop-types';

const TagParam = ({ tags, commentId }) => tags.map((tag, index) => (
  <div key={commentId.toString().concat(tag.title).concat(index)}>
    <div className="tagParam">
      {
        `Param: ${tag.name}`
      }
    </div>
    <div className="tagType">
      {' '}
      {
        `Type: ${tag.type ? tag.type.name : 'undefined'}`
      }
    </div>
    <div className="tagType">
      {' '}
      {
        `Desc: ${tag.description}`
      }
    </div>
  </div>
));


export default TagParam;

TagParam.propTypes = {
  /* eslint-disable-next-line */
  tags: PropTypes.array.isRequired,
  commentId: PropTypes.number.isRequired,
};
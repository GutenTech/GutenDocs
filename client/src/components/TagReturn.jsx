/* eslint-disable-next-line import/no-extraneous-dependencies */
import React from 'react';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import PropTypes from 'prop-types';

const TagReturn = ({ tags, commentId }) => (
  <div style={tags.length ? {} : { display: 'none' }}>
    <div className="tagReturn">
      {
        'Return'
      }
    </div>
    <div>
      {
        tags.map((tag, index) => (
          <div key={commentId.toString().concat(tag.title).concat(index)}>
            <div>
              <span className="tagParamType">
                {
                  `${tag.type ? tag.type.name : 'undefined'} `
                }
              </span>
              <span className="tagType">
                {
                  `${tag.description}`
                }
              </span>
            </div>
          </div>
        ))
      }
    </div>
  </div>
);


export default TagReturn;

TagReturn.propTypes = {
  /* eslint-disable-next-line */
  tags: PropTypes.array.isRequired,
  commentId: PropTypes.number.isRequired,
};
/* eslint-disable-next-line import/no-extraneous-dependencies */
import React from 'react';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import PropTypes from 'prop-types';

const TagParam = ({ tags, commentId }) => (
  <div style={tags.length ? {} : { display: 'none' }}>
    <div className="tagParam">
      {
        'Parameters'
      }
    </div>
    <div>
      {
        tags.map((tag, index) => (
          <div key={commentId.toString().concat(tag.title).concat(index)}>
            <div className="tagParam">
              <span>
                {
                  `${tag.name}`
                }
              </span>
              <span className="tagParamType">
                {
                  `${tag.type ? tag.type.name : 'undefined'} `
                }
              </span>
            </div>
            <div className="tagType">
              {' '}
              {
                `${tag.description}`
              }
            </div>
            <br />
          </div>
        ))
      }
    </div>
  </div>
);


export default TagParam;

TagParam.propTypes = {
  /* eslint-disable-next-line */
  tags: PropTypes.array.isRequired,
  commentId: PropTypes.number.isRequired,
};
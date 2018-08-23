/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import TagDesc from './TagDesc';
import TagParam from './TagParam';
import TagReturn from './TagReturn';
/* eslint-enable */

const BodyFunctionDesc = ({ funcComment }) => {
  const getByTag = (tags, targetTag) => tags
    .filter(tag => (tag.title === targetTag));
  return (
    <div className="body" key={funcComment.id}>
      <h2 id={funcComment.id}>
        {`${funcComment.name} function`}
      </h2>
      <div>
        {funcComment.description}
      </div>
      <TagDesc tags={getByTag(funcComment.tags, 'desc')} commentId={funcComment.id} />
      <TagDesc tags={getByTag(funcComment.tags, 'description')} commentId={funcComment.id} />
      <TagParam tags={getByTag(funcComment.tags, 'param')} commentId={funcComment.id} />
      <TagReturn tags={getByTag(funcComment.tags, 'return')} commentId={funcComment.id} />
    </div>
  );
};

export default BodyFunctionDesc;

BodyFunctionDesc.propTypes = {
  /* eslint-disable-next-line */
  funcComment: PropTypes.object.isRequired,
};
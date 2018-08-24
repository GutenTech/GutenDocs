/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import TagDesc from './TagDesc';
import TagParam from './TagParam';
import TagReturn from './TagReturn';
import GeneratedFunc from './GeneratedFunc';
/* eslint-enable */

const BodyFunctionDesc = ({ funcComment }) => {
  const getByTag = (tags, targetTag) => tags
    .filter(tag => (tag.title === targetTag));
  return (
    <div className="bodyTags" key={funcComment.id}>
      <h5 className="functionName" id={funcComment.name.concat(funcComment.id)}>
        {`${funcComment.name}`}
        <GeneratedFunc funcComment={funcComment} />
      </h5>
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
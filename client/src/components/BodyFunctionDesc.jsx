/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import TagDesc from './TagDesc';
import TagParam from './TagParam';
import TagReturn from './TagReturn';
import TagExample from './TagExample';
import GeneratedFunc from './GeneratedFunc';
/* eslint-enable */

const BodyFunctionDesc = ({ funcComment, configData }) => {
  const getByTag = (tags, targetTag) => tags
    .filter(tag => (tag.title === targetTag));
  return (
    <div className="bodyTags" key={funcComment.id}>
      <h5
        className="functionName"
        id={funcComment.name.concat(funcComment.id)}
        style={configData.colors.primaryColorFour
          ? { background: configData.colors.primaryColorFour }
          : {}}
      >
        {/* {`${funcComment.name}`} */}
        <GeneratedFunc funcComment={funcComment} />
      </h5>
      <div className="tagDescriptions">
        {funcComment.description}
      </div>
      <div className="tags">
        <TagDesc tags={getByTag(funcComment.tags, 'desc')} commentId={funcComment.id} />
        <TagDesc tags={getByTag(funcComment.tags, 'description')} commentId={funcComment.id} />
        <TagParam tags={getByTag(funcComment.tags, 'param')} commentId={funcComment.id} />
        <TagReturn tags={getByTag(funcComment.tags, 'return')} commentId={funcComment.id} />
        <TagExample tags={getByTag(funcComment.tags, 'example')} commentId={funcComment.id} />
      </div>
    </div>
  );
};

export default BodyFunctionDesc;

BodyFunctionDesc.propTypes = {
  /* eslint-disable-next-line */
  funcComment: PropTypes.object.isRequired,
  /* eslint-disable-next-line */
  configData: PropTypes.object.isRequired,
};
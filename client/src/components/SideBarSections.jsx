/* eslint-disable-next-line import/no-extraneous-dependencies */
import React from 'react';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import AnchorLink from 'react-anchor-link-smooth-scroll';
import SidebarFuncEntry from './SidebarFuncEntry';

const SideBarSections = ({ parsedData, sortedHeaders, configData }) => {
  const filterHeaders = (header, commentsArray) => commentsArray
    .filter(entry => header === entry.header);
  return (
    <ul>
      {
        sortedHeaders.map(header => (
          <div className="sidebarHeader" key={header}>
            <AnchorLink
              offset={() => configData.anchorHashJump}
              href={`#${header}`}
            >
              <h5 id="sidebarSections">
                {header}
              </h5>
            </AnchorLink>
            {
              filterHeaders(header, parsedData)
                .map(funcComment => (
                  <SidebarFuncEntry
                    comment={funcComment}
                    key={funcComment.id}
                    configData={configData}
                  />
                ))
            }
            <br />
            <br />
          </div>
        ))
      }
    </ul>);
};

SideBarSections.propTypes = {
  /* eslint-disable-next-line */
  parsedData: PropTypes.array.isRequired,
  /* eslint-disable-next-line */
  sortedHeaders: PropTypes.array.isRequired,
  /* eslint-disable-next-line */
  configData: PropTypes.object.isRequired,
};

export default SideBarSections;
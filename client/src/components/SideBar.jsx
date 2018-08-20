/* eslint-disable */
import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
/* eslint-enable */
// very messy looking here, will be cleaned up
// samples that will be fixed
// hardcoded atm in this branch, wil be mapped

const SideBar = () => (
  <div className="wrapper">
    <nav id="sidebar">
      <div id="header">
        <h5>GutenDocs</h5>
        <br />
      </div>
      <input type="text" id="myInput" onKeyUp="myFunction()" placeholder="Search..." />
      <ul className="list-unstyled components">
        <li className="active">
          <a
            href="#homeSubmenu"
            data-toggle="collapse"
            aria-expanded="false"
            className="dropdown-toggle"
          >
            Getting Started
          </a>
          <ul className="collapse list-unstyled" id="homeSubmenu">
            <li>
              <a href="#installation">Installation</a>
            </li>
            <li>
              <a href="#examples">Examples</a>
            </li>
            <li>
              <a href="#support">Support</a>
            </li>
            <li>
              <a href="#FAQ">FAQ</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#top">Top of the Page</a>
        </li>
        <li>
          <AnchorLink offset={() => 100} href="#things">Things</AnchorLink>
        </li>
      </ul>

    </nav>
  </div>
);

export default SideBar;
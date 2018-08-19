import React from 'react';
import ScrollArea from 'react-scrollbar';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const SideBar = () => (
 <div className="wrapper">
    <nav id="sidebar">
        <div id="header">
            <h5>GutenDocs</h5><br/>
        </div>
        <ul className="list-unstyled components">
            <li className="active">
                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Getting Started</a>
                <ul className="collapse list-unstyled" id="homeSubmenu">
                    <li>
                        <a href="#">Installation</a>
                    </li>
                    <li>
                        <a href="#">Examples</a>
                    </li>
                    <li>
                        <a href="#">Support</a>
                    </li>
                    <li>
                        <a href="#">FAQ</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#">About</a>
            </li>
            <li>
                <a href="#">Portfolio</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
            <li>
             <AnchorLink offset={() => 10} href='#things'>Things</AnchorLink>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
        </ul>

    </nav>
</div>
);

export default SideBar;
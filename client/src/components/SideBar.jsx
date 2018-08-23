/* eslint-disable */
import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import HeaderComment from './HeaderComment.jsx';
import Header from './Header';
import PropTypes from 'prop-types';
/* eslint-enable */
class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // search: ""
    };
  }

  // updateSearch = (event) => {
  //   this.setState({search: event.target.value.substr(0,25)});
  // };

  render() {
    const { parsedData } = this.props;
    return (
      <div className="wrapper">
        <nav id="sidebar">
          <div id="header">
            <h5>GutenDocs</h5>
            <br />
          </div>
          <input type="text" id="myInput" placeholder="Search..." onChange={this.updateSearch} />
          <ul className="list-unstyled components">
            <li>
              {/* eslint-disable-next-line */}
              <a href="#">
                <i className="fa fa-home" />
                {' '}
                  Top
              </a>
            </li>
            <li>
              <AnchorLink offset={() => 100} href="#things">Things</AnchorLink>
            </li>
            <HeaderComment parsedData={parsedData} />
          </ul>
        </nav>
      </div>
    );
  }
}

SideBar.propTypes = {
  /* eslint-disable-next-line */
  parsedData: PropTypes.array.isRequired,
};

export default SideBar;


// class SideBar extends React.Component {
//     construcutor(props) {
//         super(props);
//         this.state = {
//           search: ""
//         }
//       }
//       updateSearch(e) {
//           this.setState({search: event.target.value.substr(0,25)});
//     };
//     render() {
//         const parsedData = this.props.
//         return (
//             <div className="wrapper">
//                 <nav id="sidebar">
//                     <div id="header">
//                         <h5>GutenDocs</h5><br/>
//                     </div>
//                     <input type="text" id="myInput" placeholder="Search..." onChange={this.updateSearch.bind(this)} ></input>
//                     <ul className="list-unstyled components">
//                         <li className="active">
//                             {/* <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Getting Started</a> */}
//                             <ul className="collapse list-unstyled" id="homeSubmenu">
//                                 <li>
//                                     <a href="#">Installation</a>
//                                 </li>
//                                 <li>
//                                     <a href="#">Examples</a>
//                                 </li>
//                                 <li>
//                                     <a href="#">Support</a>
//                                 </li>
//                                 <li>
//                                     <a href="#">FAQ</a>
//                                 </li>
//                             </ul>
//                         </li>
//                         <li>
//                             <a href="#">Home</a>
//                         </li>
//                         <li>
//                         <AnchorLink offset={() => 100} href='#things'>Things</AnchorLink>
//                         </li>
//                         <li>
//                         <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
//                         </li>
//                                     <li>
//                         <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
//                         </li>
//                         <li>
//                         <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
//                         </li>
//                         <li>
//                         <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
//                         </li>
//                         <li>
//                         <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
//                         </li>
//                         <li>
//                         <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
//                         </li>
//                         <li>
//                         <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
//                         </li>
//                         <li>
//                         <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
//                         </li>
//                         <li>
//                         <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
//                         </li>
//                         <li>
//                         <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
//                         </li>
//                         <li>
//                         <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
//                         </li>
//                         <li>
//                         <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
//                         </li>
//                         <li>
//                         <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
//                         </li>
//                                     <li>
//                         <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
//                         </li>
//                         <li>
//                         <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
//                         </li>
//                         <li>
//                         <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
//                         </li>
//                         <li>
//                         <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
//                         </li>
//                         <li>
//                         <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
//                         </li>
//                     </ul>
//                 </nav>
//             </div>
//         )
//     }
// }


// class SideBar extends React.Component {
//     constructor(){
//       super();
//       this.state ={
//         parsedData: [],
//         input: '',
//       }
//     }
//     onChangeHandler(e){
//       this.setState({
//         input: e.target.value,
//       })
//     }
//     render (){
//         const list = this.state.parsedData
//           .filter(d => this.state.input === '' || d.includes(this.state.input))
//           .map((d, index) => <li key={index}>{d}</li>);
//       return (<div>
//         <input value={this.state.input} type="text" onChange={this.onChangeHandler.bind(this)}/>
//           <ul>{list}</ul>
//         </div>
//      );
//     }
//   }

// export default SideBar;

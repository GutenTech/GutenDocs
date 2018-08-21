/* eslint-disable */
import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
/* eslint-enable */
// very messy looking here, will be cleaned up
// samples that will be fixed
// hardcoded atm in this branch, wil be mapped

// const SideBar = () => (
//   <div className="wrapper">
//     <nav id="sidebar">
//       <div id="header">
//         <h5>GutenDocs</h5>
//         <br />
//       </div>
//       <input type="text" id="myInput" placeholder="Search..." />
//       <ul className="list-unstyled components">
//         <li className="active">
//           <a
//             href="#homeSubmenu"
//             data-toggle="collapse"
//             aria-expanded="false"
//             className="dropdown-toggle"
//           >
//             Getting Started
//           </a>
//           <ul className="collapse list-unstyled" id="homeSubmenu">
//             <li>
//               <a href="#installation">Installation</a>
//             </li>
//             <li>
//               <a href="#examples">Examples</a>
//             </li>
//             <li>
//               <a href="#support">Support</a>
//             </li>
//             <li>
//               <a href="#FAQ">FAQ</a>
//             </li>
//           </ul>
//         </li>
//         <li>
//           <a href="#top">Top of the Page</a>
//         </li>
//         <li>
//           <AnchorLink offset={() => 100} href="#things">Things</AnchorLink>
//         </li>
//       </ul>

//     </nav>
//   </div>
// );

// export default SideBar;


class SideBar extends React.Component {
    construcutor(props) {
        super(props);
        this.state = {
          search: ""
        }
      }
      updateSearch(e) {
          this.setState({search: event.target.value.substr(0,25)});
    };
    const parsedData = this.props.parsedData
    const headers = parsedData.map((comments, index) =>
      <ul className="list-unstyled components">
        <li className="headerComment" key={index}> 
          <AnchorLink offset={() => 100}    
            href={comments.header || "#"}>{comments.header}
          </AnchorLink>
        </li>
        <li className="nameComment" key={index}> 
          <AnchorLink offset={() => 100}    
            href={comments.name || "#"}>{comments.name}
          </AnchorLink>
        </li>
      </ul>
    );
    render() {
        return (
            <div className="wrapper">
                <nav id="sidebar">
                    <div id="header">
                        <h5>GutenDocs</h5><br/>
                    </div>
                    <input type="text" id="myInput" placeholder="Search..." onChange={this.updateSearch.bind(this)} ></input>
                    <ul className="list-unstyled components">
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li>
                        <AnchorLink offset={() => 100} href='#things'>Things</AnchorLink>
                        </li>
                    </ul>
                    {headers}
                </nav>
            </div>
        )
    }
}

export default SideBar;

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


// <li className="active">
// {/* <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Getting Started</a> */}
// <ul className="collapse list-unstyled" id="homeSubmenu">
//     <li>
//         <a href="#">Installation</a>
//     </li>
//     <li>
//         <a href="#">Examples</a>
//     </li>
//     <li>
//         <a href="#">Support</a>
//     </li>
//     <li>
//         <a href="#">FAQ</a>
//     </li>
// </ul>
// </li>
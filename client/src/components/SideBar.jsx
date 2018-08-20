import React from 'react';
import ScrollArea from 'react-scrollbar';
import AnchorLink from 'react-anchor-link-smooth-scroll';
//very messy looking here, will be cleaned up
//samples that will be fixed
//hardcoded atm in this branch, wil be mapped

const SideBar = () => (
 <div className="wrapper">
    <nav id="sidebar">
        <div id="header">
            <h5>GutenDocs</h5><br/>
        </div>
        <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search..." ></input>
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
                <a href="#">Top of the Page</a>
            </li>
            <li>
             <AnchorLink offset={() => 100} href='#things'>Things</AnchorLink>
            </li>
            <li>
             <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
            </li>
                        <li>
             <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
            </li>
            <li>
             <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
            </li>
            <li>
             <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
            </li>
            <li>
             <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
            </li>
            <li>
             <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
            </li>
            <li>
             <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
            </li>
            <li>
             <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
            </li>
            <li>
             <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
            </li>
            <li>
             <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
            </li>
            <li>
             <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
            </li>
            <li>
             <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
            </li>
            <li>
             <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
            </li>
                        <li>
             <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
            </li>
            <li>
             <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
            </li>
            <li>
             <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
            </li>
            <li>
             <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
            </li>
            <li>
             <AnchorLink offset={() => 100} href='#atName'>Name</AnchorLink>
            </li>
        </ul>

    </nav>
</div>
);

export default SideBar;


// class SideBar extends React.Component {
//     construcutor(props) {
//         super(props);
//         this.state = {
//           search: "level up"
//         }
//     };
//     render() {
//         return (
//             <div className="wrapper">
//                 <nav id="sidebar">
//                     <div id="header">
//                         <h5>GutenDocs</h5><br/>
//                     </div>
//                     <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search..." ></input>
//                     <ul className="list-unstyled components">
//                         <li className="active">
//                             <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Getting Started</a>
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
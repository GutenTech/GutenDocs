import React, { Component } from "react";
import "./SideBar.css";

import items from "./data";

class App extends Component {
  render() {
    return (
      <div className="app">
          <div className="scroller">
            {items.map(({ name, image }) => {
              return (
                  <div className="item">
                    <img src={image} />
                    {func.name}
                  </div>
              );
            })}
          </div>
      </div>
    );
  }
}

export default App;
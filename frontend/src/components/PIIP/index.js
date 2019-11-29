import React, { Component } from "react";
import styling from "./css/styling.css";
import * as d3 from "d3";

import PIIP_USMAP from "./PIIP_USMAP";

class PIIP extends React.Component {
  state = {
    data: [12, 5, 6, 6, 9, 10],
    width: 400,
    height: 300,
    scale: 20,
    collapse_1: true,
      collapse_2: true,
      collapse_3: true
  };

    handleCollapse_1 = () => {
    this.setState(prevState => ({
        collapse_1: !prevState.collapse_1
    }));
  };
    handleCollapse_2 = () => {
    this.setState(prevState => ({
        collapse_2: !prevState.collapse_2
    }));
  };
    handleCollapse_3 = () => {
    this.setState(prevState => ({
        collapse_3: !prevState.collapse_3
    }));
  };

  componentDidMount() {}

  render() {
    return (
      <div>
        <p> PIIP Visualizations</p>
      </div>
    );
  }
}

export default PIIP;

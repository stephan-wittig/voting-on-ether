import React, { Component } from "react";

// Components
import VOHeader from "../vOHeader/VOHeader"

class ListVotings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <VOHeader/>
      </div>
    );
  }
}

export default ListVotings

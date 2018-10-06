import React, { Component } from "react";
import { DrizzleContext } from "drizzle-react";

// Components
import VOHeader from "../vOHeader/VOHeader"

class ListVotings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DrizzleContext.Consumer>
        {drizzleContext => {
          return <VOHeader drizzle={drizzleContext.drizzle} drizzleState={drizzleContext.drizzleState}/>
        }}
      </DrizzleContext.Consumer>
    );
  }
}

export default ListVotings

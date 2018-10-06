import { Link } from "react-router-dom";
import React, { Component } from "react";

// components
import ContractData from "../contractData/ContractData";

class VOHeader extends Component {
constructor(props) {
  super(props);
}

  render() {
    return (
      <div>
        <h2>
          Voting Office at {this.props.drizzle.contracts.VotingOffice.address}
        </h2>
        <div>
          <b>
            Total Number of votings: <ContractData contract={"VotingOffice"} method={"nextId"} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/>
          </b>
          <hr/>
          <Link to={"/search"}>Search for a specific voting</Link>
        </div>
      </div>
    );
  }
}

export default VOHeader;

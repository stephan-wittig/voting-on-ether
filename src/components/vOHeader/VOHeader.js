import { Link } from "react-router-dom";
import React, { Component } from "react";

// components
import ContractData from "../contractData/ContractData";
import TxWrapper from "../txWrapper/TxWrapper";

class VOHeader extends Component {
constructor(props) {
  super(props);
}

  render() {
    const digest = this.props.drizzle.web3.utils.soliditySha3("abc");
    const sender = this.props.drizzleState.accounts[0];

    return (
      <div>
        <h2>
          Voting Office at {this.props.drizzle.contracts.VotingOffice.address}
        </h2>
        <div>
          <b>
            Total Number of votings:
            <ContractData
              contract={"VotingOffice"}
              method={"votingTitle"}
              args={[1]}
            >
              {(data) => {
                return <span> {data}</span>
              }}
            </ContractData>
          </b>
          <br/>
          <TxWrapper
            contract={"VotingOffice"}
            method={"newVoting"}
            args={["Beispiel", 2, 9999, digest, {from: sender}]}
          >
            {(action, pending) => {
              return(
                <button onClick={action} disabled={pending}>Create Voting</button>
              )
            }}
          </TxWrapper>
          <hr/>
          <Link to={"/search"}>Search for a specific voting</Link>
        </div>
      </div>
    );
  }
}

export default VOHeader;

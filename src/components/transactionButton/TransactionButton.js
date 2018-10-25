import React, { Component } from "react";
import { DrizzleContext } from "drizzle-react";

class ContractData extends Component {
  // Props: contract, method, drizzle, drizzleState, arguments (als Array), label, disabled
  constructor(props) {
    super(props);
    this.state = {
      txHash: null,
      disabled: false,
    };

    if (this.props.arguments) {
      this.state.arguments = this.props.arguments;
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const drizzle = this.props.drizzle;
    const drizzleState = this.props.drizzleState;

    const contract = drizzle.contracts[this.props.contract];
    const stackID = contract.methods[this.props.method].cacheSend(...this.state.arguments);
    this.setState({
      txHash: drizzleState.transactionStack[stackID]
    })
  }

  render() {
    const transaction = this.props.drizzleState.transactions[this.state.txHash];

    console.log(transaction);

    return (
      <button
        disabled={this.state.disabled && this.props.disabled}
        onClick={handleClick}
      >
        {this.props.label}
      </button>
    );
  }
}

export default ContractData;

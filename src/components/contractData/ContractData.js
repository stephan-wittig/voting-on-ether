import React, { Component } from "react";
import { DrizzleContext } from "drizzle-react";

class ContractData extends Component {
  // Props: contract, method, drizzle, drizzleState, arguments (als Array)
  constructor(props) {
    super(props);
    this.state = {
      dataKey: null,
      arguments: []
    };

    if (this.props.arguments) {
      this.state.arguments = this.props.arguments;
    }
  }

  componentDidMount() {
    const drizzle = this.props.drizzle;
    const contract = drizzle.contracts[this.props.contract];

    const dataKey = contract.methods[this.props.method].cacheCall(...this.state.arguments);
    this.setState({
      dataKey: dataKey
    })
  }

  render() {
    const contract = this.props.drizzleState.contracts[this.props.contract];
    const data = contract[this.props.method][this.state.dataKey];
    return <span>{data && data.value}</span>;
  }
}

export default ContractData;

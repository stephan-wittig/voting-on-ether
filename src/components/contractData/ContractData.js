import React, { Component } from "react";
import { DrizzleContext } from "drizzle-react";

class ContractData extends Component {
  // Props: contract, method, drizzle, drizzleState, arguments (als Array)
  constructor(props) {
    super(props);
    this.state = {
      dataKey: null
    };
    this.fetchDataKey = this.fetchDataKey.bind(this);
  }

  fetchDataKey(_method, _arguments = []) {
    const dataKey = _method.cacheCall(..._arguments);
    this.setState({
      dataKey: dataKey
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    var contract = this.props.drizzle.contracts[this.props.contract];
    const method = contract.methods[this.props.method];

    var nextContract = nextProps.drizzle.contracts[nextProps.contract];
    const nextMethod = nextContract.methods[nextProps.method];

    // Wenn sich die Methode oder die Argumente geändert haben, wird ein neuer cacheCall durchgeführt
    if(
      this.props.arguments !== nextProps.arguments ||
      method !== nextMethod
    ){
      this.fetchDataKey(nextMethod, nextProps.arguments);
    }

    contract = this.props.drizzleState.contracts[this.props.contract];
    const data = contract[this.props.method][this.state.dataKey];

    nextContract = nextProps.drizzleState.contracts[nextProps.contract];
    const nextData = nextContract[nextProps.method][nextState.dataKey];

    // Wenn sich die hinter dem Key hinterlegten Daten ändern, wird die Komponente neu gerendert
    if(data !== nextData){
      return true;
    }

    // Ansonsten: Render die Komponente nicht neu
    return false;
  }

  componentDidMount() {
    var contract = this.props.drizzle.contracts[this.props.contract];
    const method = contract.methods[this.props.method];

    this.fetchDataKey(method, this.props.arguments);
  }

  render() {
    const contract = this.props.drizzleState.contracts[this.props.contract];
    const data = contract[this.props.method][this.state.dataKey];
    return <span>{data && data.value}</span>;
  }
}

export default ContractData;

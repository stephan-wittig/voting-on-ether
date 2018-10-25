import React, { Component } from "react";
import { DrizzleContext } from "drizzle-react";
import PropTypes from "prop-types";
import { Drizzle } from "drizzle";

class ContractData extends Component {
  constructor(props) {
    super(props);
    this.fetchDataKey = this.fetchDataKey.bind(this);
    this.state = {
      dataKey: this.fetchDataKey(this.props)
    };
  }

  fetchDataKey(props){
    const contract = props.drizzle.contracts[props.contract];
    const method = contract.methods[props.method];
    const dataKey = method.cacheCall(...props.arguments);
    return dataKey;
  }

  shouldComponentUpdate(nextProps, nextState) {
    //  DataKey wird erneuert, wenn sich die Parameter ändern
    if(
      this.props.arguments !== nextProps.arguments ||
      this.props.method !== nextProps.method ||
      this.props.contract !== nextProps.contract
    ){
      this.setState({
        dataKey: this.fetchDataKey(nextProps)
      });
    }
    // Komponente wird immer neu gerendert
    return true;
  }

  render() {
    //Daten aus dem DrizzleState abholen.
    const contract = this.props.drizzleState.contracts[this.props.contract];
    const data = contract[this.props.method][this.state.dataKey];

    //Daten anzeigen
    return <span>{data && data.value}</span>;
  }
}

ContractData.propTypes = {
  contract: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  drizzle: PropTypes.instanceOf(Drizzle).isRequired,
  drizzleState: PropTypes.object.isRequired,
  arguments: PropTypes.array
};

ContractData.defaultProps = {
  arguments: []
};

export default ContractData;

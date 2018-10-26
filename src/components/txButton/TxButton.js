import React, { Component } from "react";
import { DrizzleContext } from "drizzle-react";
import PropTypes from "prop-types";
import { Drizzle } from "drizzle";

class TxButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stackID: undefined,
      disabled: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Wird ausgeführ sobald die Transaktion ~richtig~ gesendet wurde
    if (nextState.stackID !== undefined && nextProps.drizzleState.transactionStack[nextState.stackID] && nextState.disabled){
        //Reaktiviert Button und führt then-Funktion aus
        this.props.then(this.state.stackID);
        this.setState({
          disabled: false
        });
    }
    return true;
  }

  handleClick() {
    const drizzle = this.props.drizzle;
    const contract = drizzle.contracts[this.props.contract];

    // Sendet Transaktion und beobachtet sie
    const stackID = contract.methods[this.props.method].cacheSend(...this.props.arguments);

    // Speichert StackID und deaktiviert Button
    this.setState({
      stackID: stackID,
      disabled: true
    });
  }

  render() {
    return (
      <button
        disabled={this.props.disabled || this.state.disabled}
        onClick={this.handleClick}
      >
        {this.props.children || this.props.label}
      </button>
    );
  }
}

TxButton.propTypes = {
  contract: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  drizzle: PropTypes.instanceOf(Drizzle).isRequired,
  drizzleState: PropTypes.object.isRequired,
  arguments: PropTypes.array,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  then: PropTypes.func
};

TxButton.defaultProps = {
  arguments: [],

  label: "Transaction",
  then: (stackID)=>{alert("The transaction has been send. StackID is: " + stackID)},
  disabled: false
};

export default TxButton;

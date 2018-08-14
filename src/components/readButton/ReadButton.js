import React from 'react';

const QueryButton = ({changeFunction, disabled}) => (
  <span>
    <button disabled={disabled} onClick={() => readFromContract(changeFunction)}>Read from Blockchain</button>
  </span>
);

export default QueryButton;

function readFromContract(changeFunction){
  changeFunction("This should read from the blockchain.")
}

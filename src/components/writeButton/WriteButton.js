import React from 'react';

const WriteButton = ({value, lockFunction, disabled}) => (
  <span>
    <button onClick={() => writeToContract(value, lockFunction)} disabled={disabled}>
      Write to Blockchain
    </button>
  </span>
);

export default WriteButton;

function writeToContract(value, lockFunction) {
  lockFunction(true);
  setTimeout(() => {
    lockFunction(false);
  }, 2000);
  console.log("This should write the following to the blockchain:");
  console.log(value);
}

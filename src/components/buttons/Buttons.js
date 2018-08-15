import React from "react";

import style from "./Buttons.css"

const Buttons = ({text, lockFunction, setText, disabled}) => (
  <div>
    <button disabled={disabled} onClick={() => readFromContract(setText)}>
      Read from Blockchain
    </button>
    <button onClick={() => writeToContract(text, lockFunction)} disabled={disabled}>
      Write to Blockchain
    </button>
  </div>
);

export default Buttons;

function readFromContract(setText){
  setText("This should read from the blockchain.")
}

function writeToContract(text, lockFunction) {
  lockFunction(true);
  setTimeout(() => {
    lockFunction(false);
  }, 2000);
  console.log("This should write the following to the blockchain:");
  console.log(text);
}

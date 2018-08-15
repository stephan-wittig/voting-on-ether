import React from "react";

//CSS
import style from "./StorageContract.css";

//Components
import TextFieldContainer from "../../containers/TextFieldContainer";

//Container
import ButtonContainer from "../../containers/ButtonContainer";

const StorageContract = ({}) => (
  <div>
    Click one of the buttons below to query the storage value of the smart contract. Write something into the text field and click on the other button to change the storage value.
    <TextFieldContainer />
    <ButtonContainer />
  </div>
);
export default StorageContract;

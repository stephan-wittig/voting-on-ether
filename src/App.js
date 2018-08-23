import React, { Component } from "react";

//CSS
import style from "./App.css";

//Components
import Header from "./components/header/Header";

//Contracts
import VotingOffice from "../build/contracts/VotingOffice.json";

class App extends Component {

  render() {
    return (
      <div className={style.app}>
        <Header />
        Test Eins Zwei Drei Vier
      </div>
    );
  }

}

export default App;

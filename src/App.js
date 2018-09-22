import React, { Component } from "react";

//CSS
import style from "./App.css";

//Components
import Header from "./components/header/Header";
import ListVotingsContent from "./components/listVotings/ListVotings";

//Contracts
import VotingOffice from "../build/contracts/VotingOffice.json";

class App extends Component {

  render() {
    return (
      <div className={style.app}>
        <Header/>
        <ListVotingsContent/>
      </div>
    );
  }

}

export default App;

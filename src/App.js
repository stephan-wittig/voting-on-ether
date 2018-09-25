import React, { Component } from "react";
import { Route } from "react-router-dom";

//CSS
import style from "./App.css";

//Components
import Header from "./components/header/Header";
import ListVotingsContent from "./components/listVotings/ListVotings";
import SearchVoting from "./components/searchVoting/SearchVoting";

//Contracts
import VotingOffice from "../build/contracts/VotingOffice.json";

class App extends Component {

  render() {
    return (
      <div className={style.app}>
        <Header/>
        <Route exact path="/" component={ListVotingsContent}/>
        <Route path="/search" component={SearchVoting}/>
      </div>
    );
  }

}

export default App;

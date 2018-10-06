import React, { Component } from "react";
import { Route } from "react-router-dom";

//CSS
import "./App.css";

//Components
import Header from "./components/header/Header";
import ListVotings from "./components/listVotings/ListVotings";
import SearchVoting from "./components/searchVoting/SearchVoting";

//Contracts
import VotingOffice from "../build/contracts/VotingOffice.json";

class App extends Component {

  render() {
    return (
      <div className="app">
        <Header/>
        <Route exact path="/" component={ListVotings}/>
        <Route path="/search" component={SearchVoting}/>
      </div>
    );
  }

}

export default App;

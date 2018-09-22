import React, { Component } from "react";
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';

// Components
import VOHeader from "../vOHeader/VOHeader"

// Actions
import {setVoting, deleteVotings} from "../../actions"

class ListVotingsContent extends Component {
  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;

    this.createVoteArray = this.createVoteArray.bind(this);
    this.createIdArray = this.createIdArray.bind(this);
  }

  componentDidMount() {
    this.createVoteArray();
    this.createIdArray(false);
  }

  createIdArray(filter){
    return 0;
  }

  createVoteArray(){
    var i;
    var nextId = 20;
    console.log(this.props.VotingOffice.nextId.call());
    // nextId abrufen
    for (i = 0; i < nextId; i++){
      // status und anzahl der stimmen abrufen
      // setVoting(id, active, votes);
    }
  }



  render() {
    return (
      <div>
        <VOHeader/>
      </div>
    );
  }
}

ListVotingsContent.contextTypes = {
  drizzle: PropTypes.object
}

// Container

const mapStatesToProps = state => ({
  pageSize: state.rootReducer.listOptions.pageSize,
  pageNum: state.rootReducer.listOptions.pageNum,
  filterActive: state.rootReducer.listOptions.filterActive,
  votings: state.rootReducer.votings,
  ids: state.rootReducer.displayedVotings,
  VotingOffice: state.contracts.VotingOffice
})

const mapDispatchToProps = dispatch => ({
  setVoting: (id, active, votes) => {
    dispatch(setVoting(id, active, votes));
  },
  deleteVotings: () => {
    dispatch(deleteVotings());
  },
  setDisplayedVotings: (ids) => {
    dispatch(setDisplayedVotings(ids));
  }
})

const ListVotings = drizzleConnect(
  ListVotingsContent,
  mapStatesToProps,
  mapDispatchToProps
);
export default ListVotings

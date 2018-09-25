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

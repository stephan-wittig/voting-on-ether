import React from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components';

const VOHContent = ({VotingOffice}, context) => (
  <div>
    <h2>
      Voting Office at {context.drizzle.contracts.VotingOffice.address.substring(0,7) + "..."}
    </h2>
    <div>
      <b>Total Number of votings: </b><ContractData contract="VotingOffice" method="nextId" />
    </div>
  </div>
);

VOHContent.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return{
    VotingOffice: state.contracts.VotingOffice
  }
}

const VOHeader = drizzleConnect(VOHContent, mapStateToProps);

export default VOHeader;

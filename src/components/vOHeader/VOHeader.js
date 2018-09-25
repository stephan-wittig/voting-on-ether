import React from "react";
import { Link } from "react-router-dom";

const VOHeader = ({VotingOffice}, context) => (
  <div>
    <h2>
      Voting Office at
    </h2>
    <div>
      <b>Total Number of votings: </b>
      <hr/>
      <Link to={"/search"}>Search for a specific voting</Link>
    </div>
  </div>
);

export default VOHeader;

pragma solidity ^0.4.24;

/**
 * @title Standard Voter Registry
 *
 * @dev Registers and de-registers voters
 */

interface VoterRegistry {
  event registrationChange (
    address indexed _voter,
    bool indexed _newStatus
  );

  function isRegistered(address _voter) external view returns (bool);

  function registerVoter(address _voter) external;
  function deregisterVoter(address _voter) external;

  function registerVoters(address[] _voters) external;
  function deregisterVoters(address[] _voters) external;
}

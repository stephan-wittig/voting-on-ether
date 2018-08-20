pragma solidity ^0.4.24;

/**
 * @title Standard Voter Registry
 * @dev ERC165 identifier for this interface is 0x312b5b94
 */

interface VoterRegistry {
  event registrationChange (
    address _voter,
    bool indexed _newStatus
  );

  function getNumberOfVoters() external view returns (uint256);
  function getName() external view returns (string);

  function isRegistered(address _voter) external view returns (bool);

  function registerVoters(address[] _voters) external;
  function deregisterVoters(address[] _voters) external;
}

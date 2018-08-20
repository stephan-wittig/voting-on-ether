pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/introspection/SupportsInterfaceWithLookup.sol";
import "openzeppelin-solidity/contracts/access/Whitelist.sol";
import "./interfaces/VoterRegistry.sol";

/**
 * @title Standard voting Voter Registry
 *
 * @dev Registers and de-registers voters
 */
contract DemocraticRegistry is VoterRegistry, SupportsInterfaceWithLookup, Whitelist {
  string internal name;
  uint256 internal numberOfVoters;

  mapping (address => bool) voters;

  constructor(string _name)
    public
  {
    name = _name;
    bytes4 interfaceId_VoterRegistry = 0x312b5b94;
    bytes4 interfaceId_ERC165 = 0x01ffc9a7;

    //Registering ERC165 interface IDs
    _registerInterface(interfaceId_ERC165);
    _registerInterface(interfaceId_VoterRegistry);

    //Adding owner to whitelist
    addAddressToWhitelist(owner);
  }

  function getNumberOfVoters() external view returns (uint256) {
    return numberOfVoters;
  }

  function getName() external view returns (string) {
    return name;
  }

  function isRegistered(address _voter) public view returns (bool) {
    return voters[_voter];
  }

  function registerVoter(address _voter) public onlyIfWhitelisted(msg.sender) {
    if(voters[_voter] == false) {
      voters[_voter] = true;
      numberOfVoters++;
      emit registrationChange(_voter, true);
    }
  }

  function deregisterVoter(address _voter) public onlyIfWhitelisted(msg.sender) {
    if(voters[_voter] == true) {
      voters[_voter] = false;
      numberOfVoters--;
      emit registrationChange(_voter, false);
    }
  }

  function registerVoters(address[] _voters) external onlyIfWhitelisted(msg.sender) {
    for (uint256 i = 0; i < _voters.length; i++) {
      registerVoter(_voters[i]);
    }
  }

  function deregisterVoters(address[] _voters) external onlyIfWhitelisted(msg.sender) {
    for (uint256 i = 0; i < _voters.length; i++) {
      deregisterVoter(_voters[i]);
    }
  }
}

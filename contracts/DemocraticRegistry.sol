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

  bytes4 public constant interfaceId_VoterRegistry = 0xeb48da06;
  bytes4 public constant interfaceId_ERC165 = 0x01ffc9a7;

  string public name;

  mapping (address => bool) voters;

  constructor(string _name)
    public
  {
    name = _name;

    //Registering ERC165 interface IDs
    _registerInterface(interfaceId_ERC165);
    _registerInterface(interfaceId_VoterRegistry);

    //Adding owner to whitelist
    addAddressToWhitelist(owner);
  }

  function isRegistered(address _voter) public view returns (bool) {
    return voters[_voter];
  }

  function registerVoter(address _voter) public onlyIfWhitelisted(msg.sender) {
      voters[_voter] = true;
      emit registrationChange(_voter, true);
  }

  function deregisterVoter(address _voter) public onlyIfWhitelisted(msg.sender) {
      voters[_voter] = false;
      emit registrationChange(_voter, false);
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

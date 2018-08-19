pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/introspection/SupportsInterfaceWithLookup.sol";
import "openzeppelin-solidity/contracts/access/Whitelist.sol";
import "./interfaces/VoterRegistry.sol";

/**
 * @title Voting Office
 *
 * @dev Contract to manage multiple votings belonging to one token
 */
contract VotingOffice is SupportsInterfaceWithLookup, Whitelist{
  VoterRegistry internal _voterRegistry;
  ERC165 internal _ERC165;

  bytes4 public constant interfaceId_ERC165 = 0x01ffc9a7;
  bytes4 public constant interfaceId_invalid = 0xffffffff;
  bytes4 public constant interfaceId_VoterRegistry = 0xeb48da06;

  mapping(uint256 => Voting) internal votings;
  uint256 nextId;

  struct Voting {
    string title;
    uint8 options;
    uint256 totalVotes;
    uint256[] votes;
    uint256 end;
    mapping(address => bool) voters;
  }


  constructor(address __voterRegistry)
    public
  {
    _voterRegistry = VoterRegistry(__voterRegistry);
    _ERC165 = ERC165(__voterRegistry);

    // Checks target contract for ERC165 interface introspection (positive and negative)
    require(_ERC165.supportsInterface(interfaceId_ERC165), "Target contract does not implement ERC165");
    require(!_ERC165.supportsInterface(interfaceId_invalid), "Target contract does not implement ERC165");

    // Checks target contract fro VoterRegistry interfaece
    require(_ERC165.supportsInterface(interfaceId_VoterRegistry), "Target contract does not implement VoterRegistry");
  }

  function getVotersRegistry() external view returns (address) {
    return _voterRegistry;
  }

  function newVoting(
    string _title,
    uint8 _options,
    uint256 _end
  )
    external
    onlyIfWhitelisted(msg.sender)
    returns (uint256)
  {
    require(_options > 1, "Votes need at least two possible answers");
    require(_end > block.number, "End block number is lower dann current block number");

    uint256[] memory votesArray= new uint256[](_options);

    votings[nextId] = Voting(_title, _options, 0, votesArray, _end);

    return nextId++;
  }

  function votingTitle(uint256 _id) external view returns(string) {
    require(isValidId(_id), "Voting does not exist.");

    return votings[_id].title;
  }

  function votingEnd(uint256 _id) external view returns(uint256) {
    require(isValidId(_id), "Voting does not exist.");

    return votings[_id].end;
  }

  function isValidId(uint256 _id) internal view returns(bool) {
    return (_id < nextId);
  }
}

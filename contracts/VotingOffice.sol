pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/introspection/SupportsInterfaceWithLookup.sol";
import "openzeppelin-solidity/contracts/access/Whitelist.sol";

/**
 * @title ERC165-compatible ERC20 token contract
 *
 * @dev Used as interface by VotingOffice
 */
contract VotingRights is ERC165, ERC20{

}

/**
 * @title Voting Office
 *
 * @dev Contract to manage multiple votings belonging to one token
 */
contract VotingOffice is SupportsInterfaceWithLookup, Whitelist{
  VotingRights internal _votingRights;

  bytes4 public constant interfaceId_ERC20 = 0x36372b07;
  bytes4 public constant interfaceId_ERC165 = 0x01ffc9a7;
  bytes4 public constant interfaceId_invalid = 0xffffffff;

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


  constructor(address __votingRights)
    public
  {
    _votingRights = VotingRights(__votingRights);

    // Checks target contract for ERC165 interface introspection (positive and negative)
    require(_votingRights.supportsInterface(interfaceId_ERC165), "Target contract does not implement ERC165");
    require(!_votingRights.supportsInterface(interfaceId_invalid), "Target contract does not implement ERC165");

    // Checks target contract for ERC20 compatibility
    require(_votingRights.supportsInterface(interfaceId_ERC20), "Target contract does not implement ERC20");
  }

  function getVotersRegistry() external returns (address) {
    return _votingRights;
  }

  function newDemocraticVoting(
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

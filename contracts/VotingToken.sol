pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/introspection/SupportsInterfaceWithLookup.sol";
import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/BasicToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/**
 * @title Standard voting token
 *
 * @dev Token that can only be transferred by the owner of the smart contract.
 */
contract VotingToken is StandardToken, DetailedERC20, SupportsInterfaceWithLookup, Ownable {

  bytes4 public constant interfaceId_ERC20 = 0x36372b07;
  bytes4 public constant interfaceId_ERC165 = 0x01ffc9a7;

  constructor(string _name, string _symbol)
    DetailedERC20(_name, _symbol, 0)
    public
  {
    //Registering ERC165 interface IDs
    _registerInterface(interfaceId_ERC20);
    _registerInterface(interfaceId_ERC165);
  }

  function transferFrom(
    address _from,
    address _to,
    uint256 _value
  )
    public
    onlyOwner
    returns (bool)
  {
    return StandardToken.transferFrom(_from, _to, _value);
  }

  function transfer(address _to, uint256 _value) public returns (bool) {
    require(false, "Voting rights cannot be transferred");
  }
}

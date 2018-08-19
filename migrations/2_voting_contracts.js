var DemocraticRegistry = artifacts.require("./DemocraticRegistry");
var VotingOffice = artifacts.require("./VotingOffice");

module.exports = function(deployer) {

  deployer.deploy(DemocraticRegistry, "Voting Test").then(() => {
    return deployer.deploy(VotingOffice, DemocraticRegistry.address);
  });
};

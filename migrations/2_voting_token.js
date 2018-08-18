var VotingToken = artifacts.require("./VotingToken");
var VotingOffice = artifacts.require("./VotingOffice");

module.exports = function(deployer) {

  deployer.then(() => {
    return VotingToken.new("Voting Rights Test", "VRT");
  }).then((instance) => {
    return VotingOffice.new(instance.address);
  })
};

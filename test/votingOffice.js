function eventPromise(event){
  return new Promise((resolve, reject) => {
    event.watch((err, result) => {
      event.stopWatching();
      if(err){reject(err);}
      resolve(result);
    });
  });
}

var VotingOffice = artifacts.require("./VotingOffice");
var DemocraticRegistry = artifacts.require("./DemocraticRegistry");

contract("VotingOffice", function(accounts) {
  it("should return the address of its registry", () => {
    return VotingOffice.deployed().then((instance) => {
      return instance.getVotersRegistry.call();
    }).then((response) => {
      assert.equal(response, DemocraticRegistry.address, "Returned the wrong address");
    });
  });

  it("should create a new voting correctly", () => {
    var office;
    const gibberish = "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";

    return VotingOffice.deployed().then((instance) => {
      office = instance;
      office.newVoting(
        "Test Vote",
        2,
        9999,
        gibberish,
        {from: accounts[0]});
      //create listener
      let event = office.createdVote({});
      return eventPromise(event);
    }).then((result) => {
      let id = result.args._votingId;
      return Promise.all([
        office.votingTitle.call(id),
        office.votingEnd.call(id),
        office.votingDigest.call(id),
        office.interimResults.call(id),
        office.totalVotes.call(id)
      ]);
    }).then((responses) => {
        assert.equal(responses[0], "Test Vote", "Returned the wrong title");
        assert.equal(responses[1].toNumber(), 9999, "Returned the wrong end block number");
        assert.equal(responses[2], gibberish, "Returned the wrong voting digest");
        assert.equal(responses[3].length, 2, "Returned the wrong voting digest");
        assert.equal(responses[4], 0, "Returned the wrong voting digest");
    });
  });
});
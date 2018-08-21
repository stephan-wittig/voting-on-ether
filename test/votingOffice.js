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
  //Voting ID that will be used in these tests
  var id;

  it("should be deployed correctly", () => {
    return VotingOffice.deployed().then((instance) => {
      return Promise.all([
        instance.getVotersRegistry.call(),
        instance.URIprefix.call()
      ])
    }).then((responses) => {
      assert.equal(responses[0], DemocraticRegistry.address, "Returned the wrong registry address");
      assert.equal(responses[1], "abc.de/view?id=", "Returned the wrong registry address");
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
      id = result.args._votingId.toNumber();
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
      assert.equal(responses[3].length, 2, "Returned the number of options");
      assert.equal(responses[4], 0, "Returned the wrong number of total votes");
    });
  });

  it("should accept votes correctly", () => {
    var office;

    return Promise.all([
      VotingOffice.deployed(),
      DemocraticRegistry.deployed()
    ]).then((instances) => {
      office = instances[0];
      return instances[1].registerVoter(accounts[1], {from: accounts[0]});
    }).then(() => {
      return office.vote(id, 1, {from: accounts[1]});
    }).then(() => {
      return Promise.all([
        office.interimResults.call(id),
        office.totalVotes.call(id)
      ]);
    }).then((responses) => {
      assert.equal(responses[0][1].toNumber(), 1, "Specific vote count was not incremented correctly");
      assert.equal(responses[0][0].toNumber(), 0, "The wrong vote count was incremented");
      assert.equal(responses[1].toNumber(), 1, "Total vote count was not incremented correctly");
    })
  });

  it("should not unregistered addresses to vote", () => {
    return VotingOffice.deployed().then(async (instance) => {
      try {
        await instance.vote(id, 1, {from: accounts[2]});
      } catch (error) {
        //nothing to see here
        return;
      }
      assert(false, "Did not throw when unregistered account tried to vote");
    });
  });

  it("should not allow a voter to vote twice on the same voting", () => {
    return VotingOffice.deployed().then(async (instance) => {
      try {
        await instance.vote(id, 1, {from: accounts[1]});
      } catch (error) {
        //nothing to see here
        return;
      }
      assert(false, "Did not throw when voter tried to vote twice");
    });
  });
});

var DemocraticRegistry = artifacts.require("./DemocraticRegistry");

contract("DemocraticRegistry", function(accounts) {
  it("should have registered interface IDs for ERC165 and VoterRegistry", () => {
    var interfaceId_ERC165 = "0x01ffc9a7";
    var interfaceId_VoterRegistry = "0x312b5b94";
    var interfaceId_invalid = "0xffffffff";

    return DemocraticRegistry.deployed().then((instance) => {
      return Promise.all([
        instance.supportsInterface.call(interfaceId_ERC165),
        instance.supportsInterface.call(interfaceId_invalid),
        instance.supportsInterface.call(interfaceId_VoterRegistry)
      ])
    }).then((responses) => {
      assert(responses[0], "Did not answer TRUE when asked for ERC165 interface");
      assert(!responses[1], "Did not answer FALSE when asked for invalid interface");
      assert(responses[2], "Did not answer TRUE when asked for VoterRegistry interface");
    });
  });

  it("should return correct name when asked for it", () => {
    return DemocraticRegistry.deployed().then((instance) => {
      return instance.getName.call();
    }).then((response) => {
      assert.equal(response, "Voting Test", "Did not return correct name");
    });
  });

  it("should correctly return false when asked for unregistered addresses", () => {
    return DemocraticRegistry.deployed().then((instance) => {
      return instance.isRegistered(accounts[0]);
    }).then((response) => {
      assert(!response, "Did not return FALSE when asked for non-voter");
    });
  });

  it("should register new voters correctly", () => {
    var democ;

    return DemocraticRegistry.deployed().then((instance) => {
      democ = instance;
      return democ.registerVoters([accounts[1], accounts[2], accounts[3]], {from: accounts[0]});
    }).then(() => {
      return Promise.all([
        democ.isRegistered(accounts[1]),
        democ.isRegistered(accounts[2]),
        democ.isRegistered(accounts[3])
      ]);
    }).then((responses) => {
      assert(responses[0] && responses[1] && responses[2], "New voters are not returned as registered");
    });
  });

  it("should deregister voters correctly", () => {
    var democ;

    return DemocraticRegistry.deployed().then((instance) => {
      democ = instance;
      return democ.deregisterVoters([accounts[2], accounts[3]], {from: accounts[0]});
    }).then(() => {
      return Promise.all([
        democ.isRegistered(accounts[2]),
        democ.isRegistered(accounts[3])
      ]);
    }).then((responses) => {
      assert(!responses[0] && !responses[1], "Former voters are returned as registered");
    });
  });

  it("should not allow everyone to register voters", () => {
    // Testing for throws is done asynchronously, because everything else causes sadness and frustration
    return DemocraticRegistry.deployed().then(async (instance) => {
      try {
        await instance.registerVoters([accounts[2]], {from: accounts[1]});
      } catch (error) {
        //nothing to see here
        return;
      }
      assert(false, "Did not throw when non-authorised account tried to register voters");
    });
  });

  it("should not allow everyone to deregister voters", () => {
    return DemocraticRegistry.deployed().then(async (instance) => {
      try {
        await instance.deregisterVoters([accounts[1]], {from: accounts[1]});
      } catch (error) {
        //nothing to see here
        return;
      }
      assert(false, "Did not throw when non-authorised account tried to deregister voters");
    });
  });
});

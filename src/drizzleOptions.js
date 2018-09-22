// Contracts
import DemocraticRegistry from "../build/contracts/DemocraticRegistry.json";
import VotingOffice from "../build/contracts/VotingOffice.json";

// Drizzle Options
const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545"
    }
  },
  contracts: [
    DemocraticRegistry,
    VotingOffice
  ]
};

export default drizzleOptions;

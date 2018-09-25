import { Drizzle, generateStore } from "drizzle";

// Contracts
import DemocraticRegistry from "../build/contracts/DemocraticRegistry.json";
import VotingOffice from "../build/contracts/VotingOffice.json";

// Drizzle Options
const options = {
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

const store = generateStore(options);


const drizzle = new Drizzle(options, store);

export default drizzle;

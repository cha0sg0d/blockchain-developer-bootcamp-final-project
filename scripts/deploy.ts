// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

const SAMPLE_PROPOSAL_OPTIONS = [
  {
    name: "ETH",
    description: "i <3 vitalik",
    uri: "https://ethereum.org/",
  },
  {
    name: "BTC",
    description: "i <3 satoshi",
    uri: "https://nakamotoinstitute.org",
  },
];

async function main() {
  const [owner] = await ethers.getSigners();
  const Vote = await ethers.getContractFactory("Vote", owner);
  const vote = await Vote.deploy();

  await vote.deployed();
  console.log("Vote deployed to:", vote.address);
  const createTx = await vote.createProposal(
    "ETH or BTC?",
    "https://ethresear.ch/",
    SAMPLE_PROPOSAL_OPTIONS
  );
  await createTx.wait();
  console.log("Initial proposal created");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

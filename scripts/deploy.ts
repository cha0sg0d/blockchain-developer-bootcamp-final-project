// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  const Vote = await ethers.getContractFactory("Vote", owner);
  const vote = await Vote.deploy();

  await vote.deployed();
  console.log("Vote deployed to:", vote.address);
  const uri =
    "https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177";
  const createTx = await vote.createProposal(uri);

  await createTx.wait();
  console.log("Vote deployed to:", vote.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

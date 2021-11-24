import { expect } from "chai";
import { ethers } from "hardhat";
// import { SignerWithAddress } from "ethers";
import { Reward } from "../typechain";

describe("Reward", function () {
  let reward: Reward;
  let owner: any

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    const Reward = await ethers.getContractFactory("Reward");
    reward = await Reward.deploy();
    await reward.deployed();
  });

  it("Should deploy with correct name and symbol", async function () {
    // let reward: Reward;

    // const Reward = await ethers.getContractFactory("Reward");
    // reward = await Reward.deploy();
    // await reward.deployed();

    expect(await reward.symbol()).to.equal("CLS");
    expect(await reward.name()).to.equal("AstralColossus");

  });
  it("Reverts if minting more than 1", async function () {

    const mintTx = await reward.mint(owner.address);
    await mintTx.wait()

    console.log("tokens", await reward.balanceOf(owner.address));

    await expect(reward.mint(owner.address)).to.be.revertedWith("Can only mint 1 NFT");

  });
});

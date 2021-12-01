import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
// import { SignerWithAddress } from "ethers";
import { Vote } from "../typechain";

const SAMPLE_PROPOSAL = [
  {
    name: "a",
    description: "b",
    uri: "https://google.com",
  },
  {
    name: "b",
    description: "c",
    uri: "https://google.com",
  },
];

describe("Vote", function () {
  let vote: Vote;
  // let owner, user1: any

  describe("Test proposal creation", function () {
    let user1: SignerWithAddress;
    let owner: SignerWithAddress;
    beforeEach(async function () {
      [owner, user1] = await ethers.getSigners();
      const Vote = await ethers.getContractFactory("Vote");
      vote = (await Vote.deploy()) as Vote;
      await vote.deployed();
    });

    it("owner can create proposal with no options", async function () {
      const createTx = await vote.createProposal(
        "test",
        "testing out proposal",
        []
      );
      await createTx.wait();
      const numProposals = await vote.numProposals();
      expect(numProposals).to.equal(1);
      const proposal = await vote.getProposal(numProposals.toNumber() - 1);
      expect(proposal.optionIds).to.deep.equal([]);
    });

    it("owner can create proposal with multiple options", async function () {
      const createTx = await vote.createProposal(
        "test",
        "testing out proposal",
        SAMPLE_PROPOSAL
      );
      await createTx.wait();
      const numProposals = await vote.numProposals();
      // expect(numProposals).to.equal(1);
      const proposal = await vote.getProposal(numProposals.toNumber() - 1);
      const optionIds = proposal.optionIds;
      const options = await vote.getOptions(optionIds);
      expect(options[0].name).to.equal("a");
    });

    it("non-owner cannot create a proposal", async function () {
      const userVote = vote.connect(user1);
      await expect(
        userVote.createProposal("test", "testing out proposal", [])
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Test voting functions", function () {
    let user1: SignerWithAddress;
    let owner: SignerWithAddress;
    let numProposals: number;

    beforeEach(async function () {
      [owner, user1] = await ethers.getSigners();
      const Vote = await ethers.getContractFactory("Vote");
      vote = (await Vote.deploy()) as Vote;
      await vote.deployed();

      /* create a proposal */

      const createTx = await vote.createProposal(
        "test",
        "testing out proposal",
        SAMPLE_PROPOSAL
      );
      await createTx.wait();
      const numP = await vote.numProposals();
      numProposals = numP.toNumber();
    });

    it("owner can vote on a proposal", async function () {
      const proposalId = numProposals - 1;
      const proposal = await vote.getProposal(proposalId);
      const optionIds = proposal.optionIds;
      const options = await vote.getOptions(optionIds);
      const choice = options[0];
      const voteTx = await vote.vote(choice.proposalId, choice.id);
      await voteTx.wait();
      const option = await vote.options(choice.id);
      expect(option.votes).to.equal(1);
    });

    it("owner cannot vote twice on a proposal", async function () {
      const proposalId = numProposals - 1;
      const proposal = await vote.getProposal(proposalId);
      const optionIds = proposal.optionIds;
      const options = await vote.getOptions(optionIds);
      const choice = options[0];
      const voteTx = await vote.vote(choice.proposalId, choice.id);
      await voteTx.wait();
      /* second vote can't happen */
      await expect(vote.vote(choice.proposalId, choice.id)).to.be.reverted;
      const option = await vote.options(choice.id);
      expect(option.votes).to.equal(1);
    });
  });
});

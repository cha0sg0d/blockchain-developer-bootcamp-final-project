// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract Vote is Ownable {
      
  mapping(uint256 => string) public proposals;
  mapping (uint256 => uint256) public votes;
  mapping (address => bool) public voted;

  uint256 public proposalCounter;

  modifier isWhitelisted() {
    // TODO: add real whitelist gating
    require(true, "Not whitelisted");
    _;
  }

  function createProposal (string calldata uri) external onlyOwner {
    proposals[proposalCounter] = uri;
    proposalCounter++;
  }

  function vote (uint256 proposalId) public isWhitelisted {
    // require(voted[msg.sender] == false, "Already voted");

    votes[proposalId]++;
    voted[msg.sender] = true;
  }

  // function getProposals() public view returns (string [] memory)  {
  //   string[] memory proposalArr = new string[](proposalCounter);
  //   for (uint256 index = 0; index < proposalCounter; index++) {
  //     proposalArr[index] = proposals[index];
  //   }
  //   return proposalArr;
  // }

  function terminate() public onlyOwner {
    selfdestruct(payable (owner()));
  }
}

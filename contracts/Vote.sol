// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title On chain voting
/// @author cha0sg0d
/// @notice You can use this contract for simple voting proposals
/// @dev This are experimental contracts - use carefully
contract Vote is Ownable { 
  uint256 public numProposals;
  uint256 public numOptions;

  struct UserOption {
    string name;
    string description;
    string uri;
  }

  struct Option {
    uint256 id;
    uint256 proposalId;
    uint256 votes;
    string name;
    string description;
    string uri;
  }

  struct UserProposal {
    address owner;
    uint256 id;
    string name;
    string uri;
    uint256[] optionIds;
    uint256 numVoters;
  }

  struct Proposal {
    address owner;
    uint256 id;
    string name;
    string uri;
    uint256[] optionIds;
    uint256 numVoters;
    /* voter -> optionId */
    mapping (address => uint256) votes;
    /* voterId -> voter */
    mapping (uint256 => address) voters;
  }

  mapping (uint256 => Proposal) public proposals;
  mapping (uint256 => Option) public options;

  constructor () {
    /* set numOptions to 1 so 0 can represent a no vote */
    numOptions = 1;
  }

  /// @notice Allows for gating of who can vote for a proposal
  modifier isWhitelisted() {
    // TODO: add real whitelist gating
    require(true, "Not whitelisted");
    _;
  }

  /// @notice Allows for gating of who can vote for a proposal
  /// @param _proposalId id for current proposal
  modifier notVoted(uint256 _proposalId) {
    Proposal storage proposal = proposals[_proposalId];
    require(proposal.votes[msg.sender] == 0, "already voted");
    _;
  }

  /// @notice Access for control for proposalOwner
  /// @param _proposalId id for current proposal
  modifier onlyProposalOwner(uint256 _proposalId){
    require(proposals[_proposalId].owner == msg.sender, "not proposal owner");
    _;
  }

  /// @notice Create a proposal here
  /// @param _name name for current proposal
  /// @param _uri uri for current proposal
  /// @param _options options for current proposal
  /// @dev might be easier to call this from a script due to data complexity
  function createProposal (string calldata _name, string calldata _uri, UserOption[] calldata _options) external onlyOwner {
    /* moment where proposal is allocated to storage */
    Proposal storage proposal = proposals[numProposals];
    proposal.owner = msg.sender;
    proposal.id = numProposals;
    proposal.name = _name;
    proposal.uri = _uri;
    /* This can be a function and be cleaner */
    for (uint256 index = 0; index < _options.length; index++) {
      UserOption calldata currOption = _options[index];
      Option storage option = options[numOptions];
      option.id = numOptions;
      option.proposalId = numProposals;
      option.name = currOption.name;
      option.description = currOption.description;
      option.uri = currOption.uri;
      /* Add to proposal list */
      proposal.optionIds.push(numOptions);
      numOptions++;
    }

    numProposals++;
  }

  /// @notice Fetch a proposal
  /// @param _proposalId id for current proposal
  /// @return List of User Proposals
  function getProposal (uint256 _proposalId) public view returns (UserProposal memory) {
    Proposal storage proposal = proposals[_proposalId];
    return UserProposal(
      proposal.owner,
      proposal.id,
      proposal.name,
      proposal.uri,
      proposal.optionIds,
      proposal.numVoters
    );
  }

  /// @notice Fetch multiple options
  /// @param _optionIds list of current options
  /// @return List of Options
  function getOptions(uint256[] memory _optionIds) public view returns (Option[] memory) {
    Option[] memory tempOptions = new Option[](_optionIds.length);
    for (uint256 index = 0; index < _optionIds.length; index++) {
      tempOptions[index] = options[_optionIds[index]];
    }
    return tempOptions;
  }
  /// @notice Vote for a proposal
  /// @param _proposalId id of current proposals
  /// @param _optionId id of current options
  function vote (uint256 _proposalId, uint256 _optionId) public isWhitelisted notVoted(_proposalId) {
    Option storage option = options[_optionId];
    Proposal storage proposal = proposals[_proposalId];
    /* increment vote for proposal */
    option.votes++;
    /* store vote of msg.sender */
    proposal.votes[msg.sender] = _optionId;
    /* update getter to look up voter's choice later on */
    proposal.voters[proposal.numVoters] = msg.sender;
    proposal.numVoters++;
  }

  /// @notice Destroy the contract
  /// @dev Only for extreme cases
  function terminate() public onlyOwner {
    selfdestruct(payable (owner()));
  }
}

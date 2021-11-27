// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// learn more: https://docs.openzeppelin.com/contracts/3.x/erc721

// GET LISTED ON OPENSEA: https://testnets.opensea.io/get-listed/step-two

contract Reward is ERC721URIStorage, Ownable {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  constructor() ERC721("AstralColossus", "CLS") {
    
  }
 

  modifier isWhitelisted() {
    // TODO: add real whitelist gating
    require(true, "Not whitelisted");
    _;
  }

  function mint()
      public
      isWhitelisted
      returns (uint256 id)
  { 
      // better pattern for this?
      require(balanceOf(msg.sender) == 0, "Can only mint 1 NFT");

      _tokenIds.increment();

      id = _tokenIds.current();

      _safeMint(msg.sender, id);
      // ignoring URI for now
      // _setTokenURI(id, tokenURI);
      return id;
  }

  function terminate() public onlyOwner {
    selfdestruct(payable (owner()));
  }
}

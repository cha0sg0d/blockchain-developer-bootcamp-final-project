https://github.com/cha0sg0d/blockchain-developer-bootcamp-final-project

Please answer the following questions. Does your project:

1. Follow this naming format: https://github.com/YOUR_GITHUB_USERNAME_HERE/blockchain-developer-bootcamp-final-project? 
    - [x] YES

2. Contain a README.md file which:
    - [x] describes the project
    - [x] describes the directory structure
    - [x] where the frontend project can be accessed? 
    - [x] And has your public Ethereum address if you'd like your certification as an NFT (optional)? YES/NO

3. Contain smart contract(s) which:
    - [x] Are commented to the specs described by NatSpec Solidity documentation
    - [x] Use at least two design patterns from the "Smart Contracts" section
      - [x] Access Control
      - [x] Circuit Breaker
      - [x] Inheritance and Interfaces
    - [x] Protect against two attack vectors from the "Smart Contracts" section with its SWC number
      - [x] SWC-106 Unprotected SELF-DESTRUCT
      - [x] SWC-115 Authorization through `tx.origin`
      = [x] Modifiers only for validation
    - [x] Inherits from at least one library or interface
      - [x] OpenZeppelin Ownable
    - [x] Can be easily compiled and tested? YES/NO

4.  Contain a Markdown file named design_pattern_decisions.md and avoiding_common_attacks.md? 
    - [x] design_pattern_decisision
    - [x] avoiding_common_attacks

5. Have at least five smart contract unit tests that pass
    - [x] owner can create proposals with multiple options
    - [x] owner can create proposal with zero options
    - [x] user cannot create a proposal
    - [x] user can vote on a proposal 
    - [x] user cannot vote twice on a proposal

6. Contain a `deployed_address.txt` file which contains the testnet address and network where your contract(s) have been deployed? YES/NO
     - [x] deployed_address.txt

7. Have a frontend interface built with a framework like React or HTML/CSS/JS that:
    - [x] Detects the presence of MetaMask
    - [x] Connects to the current account
    - [x] Displays information from your smart contract
    - [x] Allows a user to submit a transaction to update smart contract state
    - [x] Basic styling
    - [x] Updates the frontend if the transaction is successful or not?

8. Hosted on Github Pages, Heroku, Netlify, Fleek, or some other free frontend service that gives users a public interface to your decentralized application? (That address should be in your README.md document) YES/NO
    - [ ] Hosted? 

9. Have clear instructions for: 
    - [ ] Installing dependencies for your project 
    - [x] No server if your project needs a server (not required) running your project
    - [ ] Running your smart contract unit tests and which port a local testnet should be running on. YES/NO

10. A screencast of you walking through your project?
    - [x] screencast

Congratulations on finishing your final project!
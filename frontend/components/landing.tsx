import { useWallet } from "../hooks/wallet";
import { useContract } from "../hooks/contract";
import { useWeb3React } from "@web3-react/core"
import { useState, useEffect } from "react";
import { Vote } from "./vote";
import { Proposal } from "./proposal";
import { colors } from "../helpers/theme";

export const Landing = () => {


  // connect to contract with wallet.
  const {
    account,
  } = useWeb3React()

  const wallet = useWallet();

  const vote = useContract();

  const [voted, setVoted] = useState(false);
  const [proposals, setProposals] = useState([]);

  const getProposals = async () => {
    let proposalCounter = (await vote.proposalCounter()).toNumber();
    let proposals = [];
    for (let index = 0; index < proposalCounter; index++) {
      let proposal = {};
      proposal['id'] = index;
      proposal['uri'] = await vote.proposals(index);
      proposal ['votes'] = await (await vote.votes(index)).toNumber();
      proposals.push(proposal);
    }
    console.log('proposals', proposals)
    setProposals(proposals);
  }

  const getStatus = async () => {
      const voted = await vote.voted[account];
      setVoted(voted);
  }
  // Load status and proposals on initial render
  useEffect(() => {
    getStatus()
      .catch(console.error);
    
    getProposals()
      .catch(console.error);
  }, []);

  useEffect(() => {
    getStatus()
      .catch(console.error);
    
    getProposals()
      .catch(console.error);
  }, [voted]);

  return (
    <div>
      {
        voted ? 
        <div>Thank you for voting</div> 
        :
        <div>You have not voted yet</div>
      }
      <h1>Proposals</h1>
      {proposals && proposals.map((proposal, index) => (
        <div key={index}>
          <Proposal proposal={proposal}/>
          {
            voted ? 
            null 
            : 
            <Vote 
              proposalId={proposal.id}
              setVoted={setVoted}
            />
          }
        </div>
      ))}
    </div>
  )
} 

import { useState, useEffect } from "react";
import { useContract } from "./use-contract";

type Proposal = {
  id: number
  name: string
  description: string
  uri: string
  votes: number
  voted: false
}

export const useProposals = () => {
  const vote = useContract();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (error) console.log(error)

  useEffect(() => {
    const getProposals = async () => {
      setLoading(true)
        let currProposals = [];
        let proposalCounter = (await vote.proposalCounter()).toNumber();
      
        for (let index = 0; index < proposalCounter; index++) {
          let proposal = {} as Proposal;
          proposal.id = index;
          proposal.name = "sample name";
          proposal.description = "sample description";
          proposal.uri = await vote.proposals(index);
          proposal.votes = await (await vote.votes(index)).toNumber();
          proposal.voted = false;
          currProposals.push(proposal);
        }
        console.log("currProposals", currProposals)
        setProposals(currProposals);
        setLoading(false);
    };

    getProposals().catch((error) => {
      setError(error);
      setLoading(false);
    })

  }, [])

  return {
    proposals,
    loading,
    error
  }
}


// const getProposals = async () => {
//   let proposals = [];
//   setLoading(true)
//   try {
//     let proposalCounter = (await vote.proposalCounter()).toNumber();
  
//     for (let index = 0; index < proposalCounter; index++) {
//       let proposal = {};
//       proposal["id"] = index;
//       proposal["uri"] = await vote.proposals(index);
//       proposal["votes"] = await (await vote.votes(index)).toNumber();
//       proposals.push(proposal);
//     }
//     console.log("proposals", proposals);
//   } catch (error) {
//     setError(error);
//   }
//   return proposals;
// };

// const getStatus = async () => {
//   const voted = await vote.voted[account];
//   return voted;
// };

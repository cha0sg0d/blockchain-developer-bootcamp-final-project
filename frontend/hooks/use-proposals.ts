import { useState, useEffect } from "react";
import { useContract } from "./use-contract";
import { BigNumber } from "@ethersproject/bignumber";

export type Option = {
  id: BigNumber
  proposalId: BigNumber
  votes: BigNumber
  name: string
  description: string
  uri: string
}

export type Proposal = {
  owner: string
  id: BigNumber
  name: string
  uri: string
  optionIds: BigNumber[]
  numVoters: BigNumber
  options: Option[]
}

export const useProposals = () => {
  const vote = useContract();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (error) console.log(error)

  const getProposals = async () => {
    setLoading(true)
      let currProposals = [] as Proposal[]
      const proposalCounter = (await vote.numProposals()).toNumber();
      console.log(`There are ${proposalCounter} proposals`);
      for (let proposalId = 0; proposalId < proposalCounter; proposalId++) {
        // let proposal = {} as Proposal;
        const result = await vote.getProposal(proposalId);
        const optionIds = result.optionIds;
        const options = await vote.getOptions(optionIds);
        // const cleanOptions = optionToNumber(options);
        console.log('options is use-proposals', options);
        let proposal = { 
          ...result,
          options
        }
        /* need to convert BigNumber to number*/
        // const cleanProposal = toNumber(proposal);
        currProposals.push(proposal);
      }
      console.log("currProposals", currProposals)
      setProposals(currProposals);
      setLoading(false);
  };

  useEffect(() => {
    getProposals().catch((error) => {
      setError(error);
      setLoading(false);
    })

  }, [])

  return {
    proposals,
    getProposals,
    setError,
    setLoading,
    loading,
    error
  }
}

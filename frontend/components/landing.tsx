import { useWallet } from "../hooks/wallet";
import { useContract } from "../hooks/contract";
import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { Vote } from "./vote";
import { Proposal } from "./proposal";
import { colors } from "../helpers/theme";
import styles from "../styles/Landing.module.css";

export const Landing = () => {
  // connect to contract with wallet.
  const { account } = useWeb3React();

  const wallet = useWallet();

  const vote = useContract();

  const [voted, setVoted] = useState(true);
  const [proposals, setProposals] = useState([
    {
      id: 0,
      uri: "https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177",
      votes: 1,
      voted: false,
    },
    {
      id: 1,
      uri: "https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177",
      votes: 2,
      voted: true,
    },
    {
      id: 2,
      uri: "https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177",
      votes: 100,
      voted: false,
    },
  ]);

  const getProposals = async () => {
    let proposalCounter = (await vote.proposalCounter()).toNumber();
    let proposals = [];
    for (let index = 0; index < proposalCounter; index++) {
      let proposal = {};
      proposal["id"] = index;
      proposal["uri"] = await vote.proposals(index);
      proposal["votes"] = await (await vote.votes(index)).toNumber();
      proposals.push(proposal);
    }
    console.log("proposals", proposals);
    setProposals(proposals);
  };

  const getStatus = async () => {
    const voted = await vote.voted[account];
    setVoted(voted);
  };
  // Load status and proposals on initial render
  useEffect(() => {
    getStatus().catch(console.error);

    getProposals().catch(console.error);
  }, []);

  useEffect(() => {
    getStatus().catch(console.error);

    getProposals().catch(console.error);
  }, [voted]);

  return (
    <div className={styles.container}>
      <h1>Proposals</h1>
      {proposals &&
        proposals
          .sort((a, b) => b.votes - a.votes)
          .map((proposal, index) => (
            <div key={index} className={styles.proposal}>
              <Proposal proposal={proposal} />
              <Vote
                proposalId={proposal.id}
                voted={true}
                votedFor={proposal.voted}
                setVoted={setVoted}
              />
            </div>
          ))}
    </div>
  );
};
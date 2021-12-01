import { useWallet } from "../hooks/wallet";
import { useContract } from "../hooks/use-contract";
import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { Vote } from "./vote";
import { Proposal } from "./proposal";
import { colors } from "../helpers/theme";
import styles from "../styles/Landing.module.css";
import { Loading } from "../components/loading";
import { ErrorLabel } from "../components/errorLabel";
import { useProposals } from "../hooks/use-proposals";

export const Landing = () => {
  // connect to contract with wallet.
  const { account } = useWeb3React();

  const wallet = useWallet();

  const vote = useContract();

  const {proposals, loading, error} = useProposals();

  return (
    <div className={styles.container}>
      <div>
        {loading && <Loading/>}
        {error && <ErrorLabel error={error}/>}
      </div>
      <h1>Proposals</h1>
      {proposals &&
        proposals
          .sort((a, b) => b.votes - a.votes)
          .map((proposal, index) => (
            <div key={index} className={styles.proposal}>
              <Proposal proposal={proposal} />
              {/* <Vote
                proposalId={proposal.id}
                voted={true}
                votedFor={proposal.voted}
                setVoted={setVoted}
              /> */}
            </div>
          ))}
    </div>
  );
};
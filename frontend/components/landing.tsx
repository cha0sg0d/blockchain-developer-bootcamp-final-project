import { useWallet } from "../hooks/wallet";
import { useContract } from "../hooks/use-contract";
import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { Vote } from "./vote";
import { ProposalView } from "./proposal";
import { colors } from "../helpers/theme";
import styles from "../styles/Landing.module.css";
import { Loading } from "../components/loading";
import { ErrorLabel } from "../components/errorLabel";
import { SuccessLabel } from "./success";
import { useProposals } from "../hooks/use-proposals";
import { kMaxLength } from "buffer";

export const Landing = () => {
  const sendVote = async (option, vote) => {
    try {
      /* remove setVoted */
      setError(null);
      setSuccess(null);
      setVoted(false);
      /* nonce item */
      const voteTx = await vote.vote(option.proposalId, option.id);
      console.log("voteTx", voteTx);
      await voteTx.wait();
      setVoted(true);
      setSuccess("Vote recorded");
    } catch (error) {
      console.log("error in sendVote", error);
      setError(error);
    }
  };

  const {proposals, loading, error, getProposals, setError } = useProposals();

  const [voted, setVoted] = useState(false);
  const [success, setSuccess] = useState(null);

  console.log("landing rendered");

  useEffect(() => {
    getProposals()
    console.log("updated on voted change");
  }, [voted])

  return (
    <div className={styles.container}>
      <div>
        {success && <SuccessLabel success={success}/>}
        {loading && <Loading/>}
        {error && <ErrorLabel error={error}/>}
      </div>
      {proposals && <h1>Proposals</h1>}
      {proposals &&
        proposals
          .map((proposal, index) => (
            <div key={index} className={styles.proposal}>
              <ProposalView 
                proposal={proposal} 
                sendVote={sendVote}
              />
            </div>
          ))}
    </div>
  );
};
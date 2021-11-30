import { useContract } from "../hooks/contract";
import { useWeb3React } from "@web3-react/core";
import styles from "../styles/Landing.module.css";

export const Vote = ({ proposalId, setVoted, voted, votedFor }) => {
  // Send vote transaction to contract
  const vote = useContract();

  const { library } = useWeb3React();

  const buttonText = votedFor
    ? "Voted For"
    : voted
    ? `Already Voted`
    : `Vote Yes`;

  console.log("signer", library.getSigner());
  const sendVote = async () => {
    try {
      /* nonce item */
      const voteTx = await vote.vote(proposalId);
      console.log("voteTx", voteTx);
      await voteTx.wait();
      setVoted(true);
    } catch (error) {
      console.log("vote failed: ", error);
    }
  };

  return (
    <button
      onClick={sendVote}
      disabled={voted}
      className={votedFor ? styles.voteButtonFor : styles.voteButton}
    >
      {buttonText}
    </button>
  );
};
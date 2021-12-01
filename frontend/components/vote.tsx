import { useContract } from "../hooks/use-contract";
import { useWeb3React } from "@web3-react/core";
import styles from "../styles/Landing.module.css";
import type { Option } from "../hooks/use-proposals"

// { option, setVoted, voted, votedFor }
export const Vote = (
  { option, voted, sendVote }: {option: Option, voted: boolean, sendVote: any
  }) => {
  // Send vote transaction to contract
  const vote = useContract();

  const { library } = useWeb3React();

  // const buttonText = votedFor
  //   ? "Voted For"
  //   : voted
  //   ? `Already Voted`
  //   : `Vote Yes`;

  // console.log("signer", library.getSigner());
  // const sendVote = async (option, vote) => {
  //   try {
  //     /* nonce item */
  //     const voteTx = await vote.vote(option.proposalId, option.id);
  //     console.log("voteTx", voteTx);
  //     await voteTx.wait();
  //     // setVoted(true);
  //   } catch (error) {
  //     console.log("vote failed: ", error);
  //   }
  // };

  return (
    <button
      onClick={() => sendVote(option, vote)}
      disabled={voted}
      // className={votedFor ? styles.voteButtonFor : styles.voteButton}
    >
      {"Vote for " + option.name}
    </button>
  );
};
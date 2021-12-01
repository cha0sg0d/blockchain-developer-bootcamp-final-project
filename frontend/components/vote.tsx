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

  return (
    <button
      onClick={() => sendVote(option, vote)}
      disabled={voted}
    >
      {"Vote for " + option.name}
    </button>
  );
};
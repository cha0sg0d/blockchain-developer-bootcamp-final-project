import { useContract } from "../hooks/contract";
import { useWeb3React } from "@web3-react/core"

export const Vote = ({
  proposalId, setVoted
}) => {
  // Send vote transaction to contract
  const vote = useContract();

  const {
    library,
  } = useWeb3React()

  console.log('signer', library.getSigner());
  const sendVote = async () => {
    try {
      /* nonce item */
      const voteTx = await vote.vote(proposalId);
      console.log('voteTx', voteTx);
      await voteTx.wait()
      setVoted(true);
    } catch (error) {
      console.log("vote failed: ", error)
    }
  }

  return (
    <button onClick={sendVote}>Vote for {proposalId}</button>
  )

}
import { useContract } from "../hooks/contract";

export const Proposal = ({
  proposal
}) => {

  return (
    <div key={proposal.id}> 
    <p>ID: {proposal.id}</p>
    <p>Votes: {proposal.votes}</p>
    <p>
      <a href={proposal.uri}>Details</a>
    </p>
  </div>
  )

}
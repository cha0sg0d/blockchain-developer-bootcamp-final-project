import { useContract } from "../hooks/contract";

export const Proposal = ({ proposal }) => {
  const voteMessage =
    proposal.votes === 1
      ? `${proposal.votes} Vote For`
      : `${proposal.votes} Votes For`;

  return (
    <div key={proposal.id} style={{ display: "flex", gap: 16 }}>
      <p>ID: {proposal.id}</p>
      <p style={{ color: "dodgerblue" }}>{voteMessage}</p>
      <p>
        <a href={proposal.uri}>Details</a>
      </p>
    </div>
  );
};
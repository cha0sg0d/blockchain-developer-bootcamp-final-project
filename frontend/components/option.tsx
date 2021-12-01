import type { Proposal, Option } from "../hooks/use-proposals"

export const OptionView = ({ option }) => {
  console.log("option in OptionView", option);
  const voteMessage =
    option.votes.toNumber() === 1
      ? `${option.votes.toNumber()} Vote`
      : `${option.votes.toNumber()} Votes`;

  return (
    <div key={option.id.toNumber()} style={{ display: "flex", gap: 16 }}>
      <p>Name: {option.name}</p>
      <p style={{ color: "green" }}>{voteMessage}</p>
      <p>
        <a target="_blank" href={option.uri} style={{ color: "dodgerblue" }}>Details</a>
      </p>
    </div>
  );
};
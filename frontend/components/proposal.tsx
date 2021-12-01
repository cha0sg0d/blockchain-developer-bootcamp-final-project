import type { Proposal, Option } from "../hooks/use-proposals"
import { OptionView } from "./option";
import { Vote } from "./vote";
import { useState, useEffect } from "react";

export const ProposalView = (
  { proposal, sendVote }: {proposal: Proposal, sendVote: any
  }) => {
  return (
    <div key={proposal.id.toNumber()}>
      <p>{proposal.name}</p>
      <p>
        <a style={{ color: "dodgerblue" }}  target="_blank" href={proposal.uri}>Details</a>
      </p>
      {proposal.options && 
        proposal.options
        .map((option, index) => (
          <div key={index}>
            <OptionView option={option}/>
            <Vote
              option={option}
              voted={false}
              sendVote={sendVote}
            />
          </div>
        ))}
    </div>
  );
};
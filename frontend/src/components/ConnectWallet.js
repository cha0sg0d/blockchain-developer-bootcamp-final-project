import React from "react";
// import { UnsupportedChainIdError } from '@web3-react/core';



export function Wallet() {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-6 p-4 text-center">
          <p>Please connect to your wallet.</p>
          <button
            className="btn btn-warning"
            type="button"
            onClick={() => console.log("yo")}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
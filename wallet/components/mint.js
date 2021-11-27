import { useWeb3React } from "@web3-react/core"
import { useWallet } from "../hooks/wallet";
import { useContract } from "../hooks/contract";


export const Mint = () => {
  // connect to contract with wallet.

   const {
     account,
     library
   } = useWeb3React()

   const reward = useContract();

  async function mint () {
    console.log("contract", await reward.mint(account))

  }


  return (
    <div>
      <button onClick={mint}>Mint an NFT!</button>
    </div>
  )
} 
import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers";

export const useWallet = () => {
  const {
    account,
    library
  } = useWeb3React()
  // @ts-expect-error
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = library.getSigner();
  console.log("account", signer);
  return account
}
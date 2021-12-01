import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers";

export const useWallet = async () => {
  const {
    account,
    library
  } = useWeb3React()
  // @ts-expect-error
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = library.getSigner();
  console.log("signer", signer);
  // console.log('chainId', library.chainId);
  console.log("txCount", await signer.getTransactionCount())

  return account
}
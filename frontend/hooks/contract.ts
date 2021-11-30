import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers";
import { Vote } from "../../typechain"
import VOTE from '../../artifacts/contracts/Vote.sol/Vote.json'

export const useContract = () => {
  const VOTE_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  const {
    library
  } = useWeb3React()
  
  let voteContract: Vote;
  try {
    const signer = library.getSigner()
    voteContract = new ethers.Contract(VOTE_ADDRESS, VOTE.abi, signer) as Vote;
  } catch (error) {
    console.log(error)
  }
  return voteContract
}
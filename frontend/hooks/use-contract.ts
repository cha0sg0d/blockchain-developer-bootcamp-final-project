import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers";
import { Vote } from "../typechain"
import VOTE from '../abis/Vote.json'

export const useContract = () => {
  const VOTE_ADDRESS = '0x697E6d5f8053Af5AeE6cD6f7eCEb81764CfCB84f';
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
import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers";
// import { Reward } from "../../typechain"
import REWARD from '../../artifacts/contracts/Reward.sol/Reward.json'

export const useContract = () => {
  const REWARD_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  const {
    library
  } = useWeb3React()
  
  // ABI
  // address
  let rewardContract // : Reward;
  try {
    const signer = library.getSigner()
    rewardContract = new ethers.Contract(REWARD_ADDRESS, REWARD.abi, signer); //as Reward;
  } catch (error) {
    console.log(error)
  }
  return rewardContract
}
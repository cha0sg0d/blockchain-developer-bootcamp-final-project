import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { injected } from "../components/wallet/connector";
import { Landing } from "../components/landing";
import { useWeb3React } from '@web3-react/core';

export default function Home() {
  const { 
    active, // wallet connected?
    account, // blockchain address
    library, // web3 or ethers
    connector, // current connector (injected connector for MetaMask)
    activate, // method to connect to wallet
    deactivate // method to disconnect from wallet
  } = useWeb3React();

  async function connect () {
    try {
      await activate(injected)
    } catch (error) {
      console.log(error)
    }
  }

  async function disconnect () {
    try {
      console.log("network", library)
      console.log("connector", connector)
      await deactivate()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Vote</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        
        {active ?  
          <div>
            <p>Connected with <b>{account}</b></p>
            <button onClick={disconnect}>Disconnect</button>
          </div>
          : 
          <div>
            <p>Not connected</p>
            <button onClick={connect}>Connect to Metamask</button>
          </div>
        }
        {active ? 
          <Landing/>
          :
          null
        }
      </main>
    </div>
  )
}

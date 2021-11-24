import '../styles/globals.css'
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";


function getLibrary(provider) {
  return new Web3Provider(provider) 
}

function MyApp({ Component, pageProps }) {
  return (
    // A function required by Web3ReactProvider. 
    // provider will be supplied by useWeb3React() I think
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}
export default MyApp

import * as React from 'react';
import './App.css';
import { ConnectWallet} from './components/ConnectWallet';

import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from '@web3-react/injected-connector'
export const injectedProvider = new InjectedConnector({ supportedChainIds: [31337] });

function getLibrary(provider: any, connector: any) {
  return new Web3Provider(provider);
}

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {/* <YourAwesomeComponent />  */}
      <ConnectWallet/>
    </Web3ReactProvider>
  )
}

export default App;

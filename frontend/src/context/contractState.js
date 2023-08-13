import context from './contractContext';
// import artifacts from "../artifacts/contracts/SampleERC5006.sol/SampleERC5006.json";

import shotenAddress from '../utility/shortenAddress'
import { useState } from 'react';
import { useEffect } from 'react';

const ethers = require('ethers');


let ContractState = (props) => {
    const [contract, setContract] = useState(null);
    const [account, setAcc] = useState({ address: null, balance: null });
    const [Provider, setProvider] = useState({ provider: null, signer: null });

    const contractAddress = '0x87Bfdc938124DaA87130981a08673c7c2CD91f5d';

    window.ethereum.on('accountsChanged', async function (accounts) {
        if (Provider.provider) {
            try {
                const _signer = await Provider.provider.getSigner();
                let _accAddress = await _signer.getAddress();
                //_accAddress = shortenAddress(_accAddress);
                // let _accBalance = ethers.utils.formatEther(await _signer.getBalance());
                // _accBalance = _accBalance.match(/^-?\d+(?:\.\d{0,2})?/)[0];
                let _accBalance = 0;
                setAcc({ address: _accAddress, balance: _accBalance });
                setProvider({ provider: Provider.provider, signer: _signer });
            } catch (error) {
                setAcc({ address: null, balance: null });
                console.log("error while handling change in account");
                console.log(error);
            }
        }
    })

    async function connectWallet() {
        // const _provider = new ethers.providers.JsonRpcProvider(`${localRpc}`);
        const _provider = new ethers.BrowserProvider(window.ethereum)
        try {
            await _provider.send("eth_requestAccounts", []);
            const _signer = await _provider.getSigner();
            let _accAddress = await _signer.getAddress();
            let _accBalance = 0;
            //_accAddress = shortenAddress(_accAddress);
            // let _accBalance = ethers.utils.formatEther(await _signer.getBalance());
            // _accBalance = _accBalance.match(/^-?\d+(?:\.\d{0,2})?/)[0];
            setAcc({ address: _accAddress, balance: _accBalance });
            setProvider({ provider: _provider, signer: _signer });
            // !(contract) && (await connectContract());

        } catch (error) {
            console.log("error while connecting with web3 provider");
            console.log(error);
        }


    }

    const contractFunction = {
        // 'getTxCount': getTxCount,
        //'getAllTx': getAllTx
    }

    return (
        <context.Provider value={{ contract, account, Provider, connectWallet, contractFunction }}>
            {props.children}
        </context.Provider>
    )

}

export { ContractState };
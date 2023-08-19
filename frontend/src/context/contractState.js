import context from './contractContext';
import marketplaceArtifacts from "../artifacts/contracts/Marketplace.sol/Marketplace.json";
import nftArtifacts from "../artifacts/contracts/KryptERC1155.sol/KryptERC1155.json"

import shotenAddress from '../utility/shortenAddress'
import filter from '../utility/extractMetadata'
import { useState } from 'react';
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom'

const ethers = require('ethers');

let ContractState = (props) => {
    const [MarketplaceContract, setMarketplaceContract] = useState(null);
    const [NftContract, setNftContract] = useState(null);
    const [account, setAcc] = useState({ address: null, balance: null });
    const [Provider, setProvider] = useState({ provider: null, signer: null });

    const marketplaceContractAddress = '0x0C6564F4101b5D5BEA5d66e78b6676A725A75971';
    const nftContractAddress = '0xe5Cb745D8b8178a8930382D252fACBe25b403838';

    const navigate = useNavigate();

    useEffect(() => {
        // console.log('iam clicked');
        if (account.address === null) {
            navigate('/', {});
        }
    }, [account.address])


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
            !(MarketplaceContract) && (await connectContract());
            !(NftContract) && (await connectContract());

        } catch (error) {
            console.log("error while connecting with web3 provider");
            console.log(error);
        }
    }

    let connectContract = async () => {
        const _markcontract = await new ethers.Contract(marketplaceContractAddress, marketplaceArtifacts.abi, Provider.provider);

        const _nftcontract = await new ethers.Contract(nftContractAddress, nftArtifacts.abi, Provider.provider);

        if (_markcontract) {
            setMarketplaceContract(_markcontract);
        }

        if (_nftcontract) {
            setNftContract(_nftcontract);
        }
    }

    async function minToken(uri, copies) {
        try {
            let _contract = await MarketplaceContract.connect(Provider.signer);
            if (_contract) {
                const res = await _contract.minNFT(uri, copies);
                console.log("Token Minted \n", res);
                return res;
            }
        } catch (error) {
            // // alert('error while minting token');
            console.log('error while minting token');
            console.log(error);
        }
    }

    async function getOwnedTokens(user) {
        try {
            let _nftcontract = await NftContract.connect(Provider.signer);
            let _marketContract = await MarketplaceContract.connect(Provider.signer);
            const maxTokenId = await _marketContract._tokenId();
            const array = [];

            if (_nftcontract) {
                for (let i = 1; i <= Number(maxTokenId); i++) {
                    const balance = await _nftcontract.balanceOf(user, i);

                    if (Number(balance) > 0) {
                        let uri = await _nftcontract._uri(i);
                        let obj = await filter(uri);
                        const updatedObject = { ...obj, balance: Number(balance), tokenId: i, owner: user };
                        array.push(updatedObject);
                    }
                }
            }
            return array;
        } catch (error) {
            console.log('error while getting owned token');
            console.log(error);
        }
    }

    async function getLockedBalance(user, tokenId) {
        try {
            let _marketContract = await MarketplaceContract.connect(Provider.signer);
            const lockedBalance = await _marketContract._lockedBalance(tokenId, user);
            if (Number(lockedBalance) >= 0 ){
                console.log("done");
                return Number(lockedBalance);
            }
            else{
                throw "locked balance < 0"
            }
        } catch (error) {
            console.log('error while getting locked balance');
            console.log(error);
        }
    }

    const contractFunction = {
        'mint': minToken,
        'getOwned': getOwnedTokens,
        'getLocked' : getLockedBalance,
        //'getAllTx': getAllTx
    }

    useEffect(() => {
        // console.log("useEffect: updating account details");
        let updateDetails = async () => {
            connectWallet().then(() => {

            }).catch((error) => {
                console.log(error);
            });
        }
        updateDetails();
    }, [])

    return (
        <context.Provider value={{ MarketplaceContract, account, Provider, connectWallet, contractFunction }}>
            {props.children}
        </context.Provider>
    )

}

export { ContractState };
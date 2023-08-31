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
    let nullAddress = "0x0000000000000000000000000000000000000000";

    const navigate = useNavigate();

    // useEffect(() => {
    //     // console.log('iam clicked');
    //     if (account.address === null) {
    //         navigate('/', {});
    //     }
    // }, [account.address])


    window.ethereum.on('accountsChanged', async function (accounts) {
        if (Provider.provider) {
            try {
                const _signer = await Provider.provider.getSigner();
                let _accAddress = await _signer.getAddress();
                //_accAddress = shortenAddress(_accAddress);
                // let _accBalance = ethers.formatEther(await _signer.getBalance());
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
            // let _accBalance = ethers.formatEther(await _signer.getBalance());
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

    async function mintToken(uri, copies) {
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

    async function list(obj) {
        try {
            obj.buyer = nullAddress;
            obj.price = ethers.parseEther(obj.price);
            let _contract = await MarketplaceContract.connect(Provider.signer);
            if (_contract) {
                console.log(obj);
                const res = await _contract.markForSale(obj);
                return res;
            }
        } catch (error) {
            // // alert('error while minting token');
            console.log('error while listing token');
            console.log(error);
        }
    }

    async function getMarketplaceRecords() {
        try {
            let _nftcontract = await NftContract.connect(Provider.signer);
            let _marketContract = await MarketplaceContract.connect(Provider.signer);
            const array = [];

            if (_nftcontract && _marketContract) {
                const maxRecordId = await _marketContract._recordId();

                for (let i = 1; i <= Number(maxRecordId); i++) {
                    const record = await _marketContract._records(i);

                    if (record && record.seller != nullAddress && record.buyer == nullAddress) {
                        let uri = await _nftcontract._uri(record.tokenId);
                        let obj = await filter(uri);
                        let fullObj = { ...obj, price: Number(ethers.formatEther(record[3])), seller: record[0], tokenId: Number(record[1]), copies: Number(record[2]), recordId: i };
                        array.push(fullObj);
                    }
                }
            }
            return array;
        } catch (error) {
            console.log('error while getting marketplace records');
            console.log(error);
        }
    }

    async function getOwnedTokens(user) {
        try {
            let _nftcontract = await NftContract.connect(Provider.signer);
            let _marketContract = await MarketplaceContract.connect(Provider.signer);
            const maxTokenId = await _marketContract._tokenId();
            const array = [];

            if (_nftcontract && _marketContract) {
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

    async function getNftDetails(user, _tokenId) {
        try {
            let _nftcontract = await NftContract.connect(Provider.signer);
            let _marketContract = await MarketplaceContract.connect(Provider.signer);

            if (_nftcontract && _marketContract) {

                const balance = await _nftcontract.balanceOf(user, _tokenId);

                if (Number(balance) > 0) {
                    let uri = await _nftcontract._uri(_tokenId);
                    let obj = await filter(uri);
                    const updatedObject = { ...obj, balance: Number(balance), tokenId: _tokenId, owner: user };
                    return updatedObject;
                }
            }
        } catch (error) {
            console.log('error while getting NFT details');
            console.log(error);
        }
    }

    async function getMarkedRecords(user) {
        try {
            let _nftcontract = await NftContract.connect(Provider.signer);
            let _marketContract = await MarketplaceContract.connect(Provider.signer);
            const recordIds = await _marketContract.getMarkedRecordIds(user);
            const array = [];

            if (_nftcontract && _marketContract) {
                for (let i = 0; i < recordIds.length; i++) {
                    const record = await _marketContract._records(Number(recordIds[i]));

                    if (record && record.seller != nullAddress && record.buyer == nullAddress) {
                        let uri = await _nftcontract._uri(record.tokenId);
                        let obj = await filter(uri);
                        let fullObj = { ...obj, price: Number(ethers.formatEther(record[3])), seller: record[0], tokenId: Number(record[1]), copies: Number(record[2]), recordId: Number(recordIds[i]) };
                        array.push(fullObj);
                    }
                }
            }

            return array;

        } catch (error) {
            console.log('error while getting marked records');
            console.log(error);
        }
    }

    async function getBoughtRecords(user) {
        try {
            let _nftcontract = await NftContract.connect(Provider.signer);
            let _marketContract = await MarketplaceContract.connect(Provider.signer);
            const recordIds = await _marketContract.getBoughtRecordIds(user);
            const array = [];

            if (_nftcontract && _marketContract) {
                for (let i = 0; i < recordIds.length; i++) {
                    const record = await _marketContract._records(Number(recordIds[i]));

                    if (record && record.seller != nullAddress && record.buyer != nullAddress) {
                        let uri = await _nftcontract._uri(record.tokenId);
                        let obj = await filter(uri);
                        let fullObj = { ...obj, price: Number(ethers.formatEther(record[3])), seller: record[0], tokenId: Number(record[1]), copies: Number(record[2]), recordId: Number(recordIds[i]), buyer: record[4] };
                        array.push(fullObj);
                    }
                }
            }

            return array;

        } catch (error) {
            console.log('error while getting marked records');
            console.log(error);
        }
    }

    async function getSoldRecords(user) {
        try {
            let _nftcontract = await NftContract.connect(Provider.signer);
            let _marketContract = await MarketplaceContract.connect(Provider.signer);
            const recordIds = await _marketContract.getSoldRecordIds(user);
            const array = [];

            if (_nftcontract && _marketContract) {
                for (let i = 0; i < recordIds.length; i++) {
                    const record = await _marketContract._records(Number(recordIds[i]));

                    if (record && record.seller != nullAddress && record.buyer != nullAddress) {
                        let uri = await _nftcontract._uri(record.tokenId);
                        let obj = await filter(uri);
                        let fullObj = { ...obj, price: Number(ethers.formatEther(record[3])), seller: record[0], tokenId: Number(record[1]), copies: Number(record[2]), recordId: Number(recordIds[i]), buyer: record[4] };
                        array.push(fullObj);
                    }
                }
            }

            return array;

        } catch (error) {
            console.log('error while getting sold records');
            console.log(error);
        }
    }

    async function getRecord(recordId) {
        try {
            let _nftcontract = await NftContract.connect(Provider.signer);
            let _marketContract = await MarketplaceContract.connect(Provider.signer);

            if (_nftcontract && _marketContract) {
                const record = await _marketContract._records(recordId);

                if (record) {
                    let uri = await _nftcontract._uri(record.tokenId);
                    let obj = await filter(uri);
                    let fullObj = { ...obj, price: Number(ethers.formatEther(record[3])), seller: record[0], tokenId: Number(record[1]), copies: Number(record[2]), _recordId: recordId };
                    return fullObj
                }

            }

        } catch (error) {
            console.log('error while getting record details');
            console.log(error);
        }
    }

    async function getLockedBalance(user, tokenId) {
        try {
            let _marketContract = await MarketplaceContract.connect(Provider.signer);
            const lockedBalance = await _marketContract._lockedBalance(tokenId, user);
            if (Number(lockedBalance) >= 0) {
                console.log("done");
                return Number(lockedBalance);
            }
            else {
                throw "locked balance < 0"
            }
        } catch (error) {
            console.log('error while getting locked balance');
            console.log(error);
        }
    }

    async function buyRecord(recId, price) {
        try {
            let _contract = await MarketplaceContract.connect(Provider.signer);
            if (_contract) {
                const tx = await _contract.buyRecord(recId, { value: ethers.parseEther(`${price}`) });
                return tx;
            }
        } catch (error) {
            // // alert('error while minting token');
            console.log('error while buying record');
            console.log(error);
        }
    }

    const contractFunction = {
        'mint': mintToken,
        'getOwned': getOwnedTokens,
        'getLocked': getLockedBalance,
        'list': list,
        'getMarketplaceRecords': getMarketplaceRecords,
        'getMarkedRecords': getMarkedRecords,
        'getRecord': getRecord,
        'getNftDetails': getNftDetails,
        'buyRecord': buyRecord,
        'getBoughtRecords': getBoughtRecords,
        'getSoldRecords': getSoldRecords,
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
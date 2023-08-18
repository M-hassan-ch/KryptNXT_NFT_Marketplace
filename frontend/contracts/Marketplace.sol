// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./KryptERC1155.sol";

contract Marketplace is Ownable, Pausable {

    using EnumerableSet for EnumerableSet.UintSet;

    struct MarkedRecord {
        address seller;
        uint tokenId;
        uint copies;
        uint price;
        address buyer;
    }

    KryptERC1155 public _nftContract;

    uint public _recordId;
    uint public _tokenId;
    
    mapping(uint => MarkedRecord) public _records;
    
    // seller
    mapping(address => EnumerableSet.UintSet) _markedRecordIds;
    mapping(address => EnumerableSet.UintSet) _soldRecordIds;
    mapping(uint => mapping(address => uint)) public _lockedBalance;


    // buyer
    mapping(address => EnumerableSet.UintSet) _boughtRecordIds;

    constructor() {
        
    }

    modifier isValidNFTContract(){
        require(address(_nftContract) != address(0), "Marketplace: Null nft contract");
        _;
    }


    function minNFT(string memory uri, uint copies) public {
        require(copies > 0, "Marketplace: copies should be > 0");

        _tokenId++;
        _nftContract.mint(msg.sender, _tokenId, copies, uri);
    }

    function markForSale(MarkedRecord calldata record) public{
        isValidRecord(record);

        _recordId++;
        _records[_recordId] = record;
        _markedRecordIds[msg.sender].add(_recordId);
        _lockedBalance[record.tokenId][record.seller] += record.copies;
    }

    function buyRecord(uint recId) payable public {
        recordExists(recId);
        recordIsNotSold(recId);

        MarkedRecord memory record = _records[recId];

        require(msg.value == record.price, "Marketplace: Insufficient price sent");

        _records[recId].buyer = msg.sender;
        _markedRecordIds[record.seller].remove(recId);
        _soldRecordIds[record.seller].add(recId);
        _boughtRecordIds[msg.sender].add(recId);
        _lockedBalance[record.tokenId][record.seller] -= record.copies;
    }

    function removeFromSale(uint recId) public {
        recordExists(recId);
        isValidRecordOwner(recId);
        recordIsNotSold(recId);

        delete _records[recId];
        _markedRecordIds[msg.sender].remove(recId);
    }

    function updateNftContract(address addr) public onlyOwner {
        require(addr.code.length > 0, "Marketplace: Invalid nft contract");

        _nftContract = KryptERC1155(addr);
    }

    function getUserBalance(address user, uint tokenId) public view returns (uint256) {
        return _nftContract.balanceOf(user, tokenId);
    }

    function getMarkedRecordIds(address user) public view returns(uint[] memory){
        return _markedRecordIds[user].values();
    }

    function getSoldRecordIds(address user) public view returns(uint[] memory){
        return _soldRecordIds[user].values();
    }

    function getBoughtRecordIds(address user) public view returns(uint[] memory){
        return _boughtRecordIds[user].values();
    }

    function recordExists(uint recId)  private view {
        require(_records[recId].seller != address(0), "Marketplace: Record don't exists");
    }

    function isValidRecordOwner(uint recId) private view{
         require(_records[recId].seller == msg.sender, "Marketplace: Not a valid owner of record");
    }

    function recordIsNotSold(uint recId) private view{
         require(_records[recId].buyer == address(0), "Marketplace: Record is sold");
    }

    function isValidRecord(MarkedRecord calldata record) private view{
        if (record.seller != msg.sender || record.seller == address(0) || record.copies == 0 || record.price == 0 || record.buyer != address(0)){
            revert("Marketplace: Got invalid record details");
        }
        if(getUserBalance(record.seller, record.tokenId) < _lockedBalance[record.tokenId][record.seller] + record.copies){
            revert("Marketplace: Insufficient token balance");
        }
    }

}
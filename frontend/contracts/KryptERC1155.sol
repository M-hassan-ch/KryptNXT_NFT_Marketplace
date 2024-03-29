// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

// uri bug

contract KryptERC1155 is ERC1155, Ownable, Pausable, ERC1155Burnable, ERC1155Supply {
    
    address public _marketplace;
    mapping (uint => string) public _uri;

    constructor(string memory baseURI, address marketplace) ERC1155(baseURI) {
        _marketplace = marketplace;
    }

    modifier onlyAllowed {
        require(msg.sender == owner() || msg.sender == _marketplace, "KryptERC1155: Caller is not authorized");
        _;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address account, uint256 id, uint256 amount, string memory uri)
        public
        onlyAllowed
    {
        _uri[id] = uri;
        _mint(account, id, amount, "");
        givePermission(account);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyAllowed
    {
        _mintBatch(to, ids, amounts, data);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public override {
        super.safeTransferFrom(from, to, id, amount, data);
        
        givePermission(from);
        givePermission(to);
    }

    function givePermission(address account) private{
        if (account != _marketplace){
            if (_marketplace != address(0) && !isApprovedForAll(account, _marketplace)){
                updateApproval(account, _marketplace, true);
            }
        }
    }

    function updateApproval(address owner, address operator, bool appproved) public onlyAllowed{
       require(owner != address(0), "TicketsERC1155: Owner address is null");
       require(operator != address(0), "TicketsERC1155: Operator address is null");

       _setApprovalForAll(owner, operator, appproved);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
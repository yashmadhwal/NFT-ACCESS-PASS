// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTACCESSPASS is ERC721, Ownable {
    // Enum representing the access status levels
    enum AccessStatus { FREE, BASIC, SILVER, GOLDEN }

    // Struct to store access information for each recipient
    struct AccessInfo {
        uint256 passId;
        AccessStatus status;
    }

    uint256 private _id;
    
    constructor() ERC721("NFT Access Control", "NFTAC") {
        // Set token URIs for different access levels
        setTokenURI(AccessStatus.BASIC, "Link to BASIC");
        setTokenURI(AccessStatus.SILVER, "Link to SILVER");
        setTokenURI(AccessStatus.GOLDEN, "Link to GOLDEN");
        setAccessPrice(AccessStatus.BASIC, 0.1 ether); // Set prices for each access level
        setAccessPrice(AccessStatus.SILVER, 0.2 ether);
        setAccessPrice(AccessStatus.GOLDEN, 0.3 ether);
    }

    mapping(AccessStatus => string) public tokenURIs;
    mapping(AccessStatus => uint256) public accessPrices;
    mapping(address => AccessInfo) private _accessInformation;

    // Function to obtain a new access pass
    function getPASS(address recipient, AccessStatus status) external payable returns (uint256) {
        require(recipient == msg.sender, "Sender should be the Recipient");
        require(status >= AccessStatus.BASIC && status <= AccessStatus.GOLDEN, "Invalid Status");
        AccessStatus currentStatus = _accessInformation[recipient].status;
        require(status > currentStatus, "You cannot downgrade");
        uint256 price = accessPrices[status];
        require(msg.value == price, "Incorrect payment amount");

        if (status == AccessStatus.BASIC) {
            _updateAccessProfile(recipient, status);
        } else if (status == AccessStatus.SILVER) {
            _updateAccessProfile(recipient, status);
        } else if (status == AccessStatus.GOLDEN) {
            _updateAccessProfile(recipient, status);
        }

        // Transfer the amount to the owner
        address payable owner = payable(owner());
        owner.transfer(msg.value);
        return _id;
    }

    // Internal function to update the access profile for a recipient
    function _updateAccessProfile(address recipient, AccessStatus status) private {
        uint256 currentID = _accessInformation[recipient].passId;
        if (currentID != 0) {
            _burn(currentID);
        }

        _id++;
        _safeMint(recipient, _id);
        _accessInformation[recipient].passId = _id;
        _accessInformation[recipient].status = status;
    }

    function getUserInfo(address recipient) external view returns(uint,AccessStatus,string memory){
        uint _nftId = _accessInformation[recipient].passId; //passID is unique of every user
        AccessStatus _status = _accessInformation[recipient].status;
        string memory _nftURL = tokenURIs[_status];

        return (_nftId, _status, _nftURL);
    }

    // Internal function to set the token URI for a specific access status
    function setTokenURI(AccessStatus status, string memory tokenURI) public onlyOwner {
        tokenURIs[status] = tokenURI;
    }

    function setAccessPrice(AccessStatus status, uint256 price) public onlyOwner {
        accessPrices[status] = price;
    }

    // Override of the _beforeTokenTransfer function to prevent token transfers
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual {
        require(from == address(0) || from == to, "Token is soul-bound and cannot be transferred");
        super._beforeTokenTransfer(from, to, tokenId,1);
    }
}

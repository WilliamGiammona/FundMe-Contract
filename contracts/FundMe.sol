// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error FundMe__NotEnoughEth();
error FundMe__ProblemWithWithdrawal();

/**
 * @title A contract for crowd funding.
 * @author William Giammona.
 */

contract FundMe is Ownable {

    mapping(address => uint256) private s_addressToAmountFunded;
    address[] private s_funders;
    uint256 private immutable i_minFundAmt;

    /**
     * @param minFundAmt - The minimum amount in Wei needed to fund the contract (it can be set to 0).
     */

    constructor( uint256 minFundAmt) {
        i_minFundAmt = minFundAmt;
    }

    /**
     * @dev Receive and Fallback call fund() if user sent ETH w/out calling fund().
     */
    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }

    /**
     * @notice Funds this contract. Reverts if ETH amount < ETH equivalent of i_minFundAmt.
     */

    function fund() public payable {
        if (msg.value< i_minFundAmt) {
            revert FundMe__NotEnoughEth();
        }
        address[] memory funders = s_funders;
        for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
            if (funders[funderIndex] == msg.sender) {
                s_addressToAmountFunded[msg.sender] += msg.value;
                return;
            }
        }
        s_funders.push(msg.sender);
        s_addressToAmountFunded[msg.sender] += msg.value;
    }

    /// @notice Allows contract owner to withdraw treasury.

    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
        if (success) {
            address[] memory funders = s_funders;
            for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
                address funder = funders[funderIndex];
                s_addressToAmountFunded[funder] = 0;
            }
            s_funders = new address[](0);
        } else {
            revert FundMe__ProblemWithWithdrawal();
        }
    }

    /**
     * @param funder Funder's address to find out how much they funded this contract
     * @return s_addressToAmountFunded The value the funder put into this contract
     */
    function getAddressToAmountFunded(address funder) public view returns (uint256) {
        return s_addressToAmountFunded[funder];
    }

    /**
     * @param index The index for the location of the funder in the funders array.
     * @return s_funders Returns the funder's address at the index location.
     */
    function getFunders(uint256 index) public view returns (address) {
        return s_funders[index];
    }
    
    /**
     * @return i_minFundAmt Returns the min amt of Wei needed to fund the contract.
     */
    function getMinFundAmt() public view returns (uint256) {
        return (i_minFundAmt);
    }
}

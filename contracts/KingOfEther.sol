// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "./RetirementOfPreviousKing.sol";

contract KingOfEther {
    address public king;
    uint public balance;

    function claimThrone() external payable {
        require(msg.value > balance, "Need to pay more to become the king");

        if(king != address(0)) {
            new RetirementOfPreviousKing{value: balance}(king);
        }

        balance = msg.value;
        king = msg.sender;
    }
}
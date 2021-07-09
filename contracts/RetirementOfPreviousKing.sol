
// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract RetirementOfPreviousKing {
    constructor(address _kingAddress) payable {
        selfdestruct(payable(_kingAddress));
    }
} 
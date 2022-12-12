import { ethers, network } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

import * as fs from "fs";

const FRONT_END_ADDRESSES_FILE =
  "../fundme-front-end/constants/contractAddresses.json";
const FRONT_END_ABI_FILE = "../fundme-front-end/constants/contractABIs.json";
const deployFrontEnd = async function () {
  if (process.env.UPDATE_FRONT_END === "true") {
    console.log("Updating Front End");
    updateContractAddresses();
    updateABI();
    console.log("Front End Updated");
    console.log("----------------------------------------------------");
  }
};

async function updateContractAddresses() {
  const chainId = network.config.chainId!.toString();
  const FundMe = await ethers.getContract("FundMe");
  const contractAddresses = JSON.parse(
    fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf-8")
  );
  if (chainId! in contractAddresses) {
    if (!contractAddresses[chainId].includes(FundMe.address)) {
      contractAddresses[chainId].push(FundMe.address);
    }
  } else {
    contractAddresses[chainId] = [FundMe.address];
  }

  fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(contractAddresses));
}

async function updateABI() {
  const FundMe = await ethers.getContract("FundMe");
  const contractName = "FundMe";
  const contractAbis = JSON.parse(fs.readFileSync(FRONT_END_ABI_FILE, "utf-8"));
  if (contractName in contractAbis) {
    if (
      !contractAbis[contractName].includes(
        FundMe.interface.format(ethers.utils.FormatTypes.json)
      )
    ) {
      contractAbis[contractName].push(
        FundMe.interface.format(ethers.utils.FormatTypes.json)
      );
    }
  } else {
    contractAbis[contractName] = FundMe.interface.format(
      ethers.utils.FormatTypes.json
    );
  }

  fs.writeFileSync(FRONT_END_ABI_FILE, contractAbis[contractName]);
}

export default deployFrontEnd;
deployFrontEnd.tags = ["all", "FrontEnd"];

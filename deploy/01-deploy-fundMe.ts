import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig } from "../helper-hardhat-config";
import verify from "../utils/verify";

const deployFundMe: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId: number = network.config.chainId!;

  console.log("----------------------------------------------------");
  console.log("Deploying FundMe.....");

  const args = [50];

  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: args,
    log: true,
    autoMine: true,
    waitConfirmations: networkConfig[chainId].blockConfirmations || 1,
  });

  console.log("Fund me deployed!!!");
  console.log("----------------------------------------------------");

  if (chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
    await verify(fundMe.address, args);
  }
};
export default deployFundMe;
deployFundMe.tags = ["all", "fundMe"];

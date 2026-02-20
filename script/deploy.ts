import { ethers } from "hardhat";

import * as dotenv from "dotenv";

dotenv.config();

const DIA_ADDRESSES: { [key: string]: string } = {
  somniaTestnet: process.env.DIA_ADDRESS_TESTNET || "0x9206296Ea3aEE3E6bdC07F7AaeF14DfCf33d865D",
  somniaMainnet: process.env.DIA_ADDRESS_MAINNET || "0xbA0E0750A56e995506CA458b2BdD752754CF39C4",
};

async function main() {
  const privateKey = process.env.PRIVATE_KEY;

  if (!privateKey || privateKey === "") {
    throw new Error("PRIVATE_KEY is not set in .env file. Please add your private key to the .env file.");
  }

  // Get the network provider
  const network = await ethers.provider.getNetwork();

  // Ensure private key has 0x prefix
  const privateKeyWithPrefix = privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`;

  // Create a wallet/signer from the private key
  const deployer = new ethers.Wallet(privateKeyWithPrefix, ethers.provider);

  console.log("=== Deployment Configuration ===");
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH");
  console.log("Network:", network.name, "Chain ID:", network.chainId.toString());
  console.log("Using private key from .env file");

  // Determine the network name
  let networkName: string;

  if (network.chainId === 50312n) {
    networkName = "somniaTestnet";
  } else if (network.chainId === 5031n) {
    networkName = "somniaMainnet";
  } else {
    // For localhost or other networks, default to testnet address
    networkName = "somniaTestnet";
    console.log("Warning: Unknown network, using testnet DIA address");
  }

  const diaAddress = DIA_ADDRESSES[networkName];

  if (!diaAddress || diaAddress === "0x0000000000000000000000000000000000000000") {
    throw new Error(
      `DIA contract address not found for network: ${networkName}. ` +
      `Please set DIA_ADDRESS_TESTNET or DIA_ADDRESS_MAINNET in your .env file, ` +
      `or update the DIA_ADDRESSES mapping in the deploy script.`
    );
  }

  console.log(`Using DIA contract address: ${diaAddress}`);

  // Deploy the DIAOracleIntegration contract using the signer
  const DIAOracleIntegration = await ethers.getContractFactory("DIAOracleIntegration", deployer);
  const diaOracleIntegration = await DIAOracleIntegration.deploy(diaAddress);

  await diaOracleIntegration.waitForDeployment();

  const contractAddress = await diaOracleIntegration.getAddress();

  console.log("\n=== Deployment Successful ===");
  console.log("DIAOracleIntegration deployed to:", contractAddress);
  console.log("DIA contract address:", diaAddress);

  // Wait for a few block confirmations before verifying
  console.log("\nWaiting for block confirmations...");
  await diaOracleIntegration.deploymentTransaction()?.wait(5);

  console.log("\n=== Deployment Summary ===");
  console.log("Contract Address:", contractAddress);
  console.log("Network:", networkName);
  console.log("DIA Contract Address:", diaAddress);
  console.log("Deployer:", deployer.address);

  console.log("\nTo verify the contract, run:");
  console.log(`npx hardhat verify --network ${networkName} ${contractAddress} ${diaAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


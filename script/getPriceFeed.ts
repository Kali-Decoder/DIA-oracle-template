import { ethers } from "hardhat";

import * as dotenv from "dotenv";

dotenv.config();

const CONTRACT_ADDRESS ="0xb6951de07E32AD49DbFb5633AFA8Fc748Dd976B3";

async function getPrice(key: string) {
  const privateKey = process.env.PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("PRIVATE_KEY is not set in .env file");
  }

  const privateKeyWithPrefix = privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`;
  const signer = new ethers.Wallet(privateKeyWithPrefix, ethers.provider);

  const contract = await ethers.getContractAt("DIAOracleIntegration", CONTRACT_ADDRESS, signer);
  console.log("Contract Address:", CONTRACT_ADDRESS);
  // Fetch fresh price data
  const tx = await contract.getPriceInfo(key);
  await tx.wait();

  // Read the stored price and timestamp
  const price = await contract.latestPrice();
  const timestamp = await contract.timestampOflatestPrice();

  console.log("Key:", key);
  console.log("Price (raw):", price.toString());
  console.log("Price (formatted):", ethers.formatUnits(price, 8), "USD");
  console.log("Timestamp:", timestamp.toString());
}

async function main() {
  // Get key from command line arguments or use default
  const key ="BTC/USD"; // Default to BTC/USD if not provided

  await getPrice(key);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

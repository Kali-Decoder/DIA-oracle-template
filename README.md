# Somnia DIA Oracle Template

Template Hardhat project for integrating [DIA Oracle V2](https://docs.diadata.org/) on Somnia networks.

This repo gives you:
- A minimal Solidity integration contract (`DIAOracleIntegration.sol`)
- A deployment script for Somnia testnet/mainnet
- A script to fetch and print a price feed through your deployed contract

## Project Structure

- `contracts/DIAOracleIntegration.sol`: Sample contract that reads a DIA price and stores it on-chain.
- `script/deploy.ts`: Deploys `DIAOracleIntegration` using network-aware DIA oracle addresses.
- `script/getPriceFeed.ts`: Calls `getPriceInfo` and prints stored price/timestamp.
- `hardhat.config.ts`: Network + explorer verification config for Somnia.
- `config/oracleAddresses.ts`: Reference DIA V2 addresses.

## Prerequisites

- Node.js 18+
- npm
- A funded wallet for the target Somnia network

## 1) Install dependencies

```bash
npm install
```

## 2) Configure environment

Create `.env` in the project root:

```env
PRIVATE_KEY=0xyour_wallet_private_key
ETHERSCAN_API_KEY=your_explorer_api_key

# Optional overrides (defaults already exist in code)
SOMNIA_TESTNET_RPC_URL=https://dream-rpc.somnia.network/
SOMNIA_MAINNET_RPC_URL=https://api.infra.mainnet.somnia.network/
DIA_ADDRESS_TESTNET=0x9206296Ea3aEE3E6bdC07F7AaeF14DfCf33d865D
DIA_ADDRESS_MAINNET=0xbA0E0750A56e995506CA458b2BdD752754CF39C4
```

## 3) Compile

```bash
npx hardhat compile
```

## 4) Deploy

Somnia Testnet:

```bash
npx hardhat run script/deploy.ts --network somniaTestnet
```

Somnia Mainnet:

```bash
npx hardhat run script/deploy.ts --network somniaMainnet
```

After deployment, the script prints:
- deployed contract address
- selected DIA oracle address
- a ready-to-run verification command

## 5) Verify (optional)

Example:

```bash
npx hardhat verify --network somniaTestnet <DEPLOYED_CONTRACT_ADDRESS> <DIA_ORACLE_ADDRESS>
```

## 6) Read a price feed

`script/getPriceFeed.ts` currently uses hardcoded values. Before running:

1. Set `CONTRACT_ADDRESS` to your deployed `DIAOracleIntegration` address.
2. (Optional) Change `key` from `"BTC/USD"` to another DIA symbol.

Then run:

```bash
npx hardhat run script/getPriceFeed.ts --network somniaTestnet
```

## How to use this repo as a template

1. Click **Use this template** on GitHub to create your own repository.
2. Update project metadata (`package.json`, README title/links).
3. Replace `DIAOracleIntegration.sol` with your app contract logic.
4. Keep or adjust `script/deploy.ts` constructor args for your contract.
5. Add tests under `test/` for your contract behavior.
6. Configure CI to run `npx hardhat compile` and `npx hardhat test`.

## DIA Oracle V2 addresses used

- Somnia Mainnet: `0xbA0E0750A56e995506CA458b2BdD752754CF39C4`
- Somnia Testnet: `0x9206296Ea3aEE3E6bdC07F7AaeF14DfCf33d865D`

## Notes

- `PRIVATE_KEY` can be with or without `0x` prefix (scripts normalize it).
- `deploy.ts` detects network by chain ID (`50312` testnet, `5031` mainnet).
- If chain ID is unknown, deployment defaults to the testnet DIA address.
# DIA-oracle-template

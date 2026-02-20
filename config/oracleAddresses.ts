/**
 * DIA Oracle V2 Addresses
 * 
 * Mainnet: 0xbA0E0750A56e995506CA458b2BdD752754CF39C4
 * Testnet: 0x9206296Ea3aEE3E6bdC07F7AaeF14DfCf33d865D
 */

export const DIA_ORACLE_ADDRESSES = {
  mainnet: "0xbA0E0750A56e995506CA458b2BdD752754CF39C4",
  testnet: "0x9206296Ea3aEE3E6bdC07F7AaeF14DfCf33d865D",
} as const;

export type Network = keyof typeof DIA_ORACLE_ADDRESSES;


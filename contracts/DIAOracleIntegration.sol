// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IDIAOracleV2 {
    function getValue(string memory) external returns (uint128, uint128);
}

/**
 * @title A sample contract showing how DIA oracles can be used in contracts.
 */
contract DIAOracleIntegration {
    address immutable ORACLE;
    
    uint128 public latestPrice;
    uint128 public timestampOflatestPrice;

    /**
     * @dev Constructor that sets the oracle address based on the network
     * @param oracleAddress - The address of the DIA Oracle contract
     */
    constructor(address oracleAddress) {
        ORACLE = oracleAddress;
    }

    /**
     * @dev A function that retrieves the price and the corresponding timestamp
     * from the DIA oracle and saves them in storage variables.
     * @param key - A string specifying the asset.
     */
    function getPriceInfo(string memory key) external {
        (latestPrice, timestampOflatestPrice) = IDIAOracleV2(ORACLE).getValue(key);
    }

    /**
     * @dev A function that checks if the timestamp of the saved price
     * is older than maxTimePassed.
     * @param maxTimePassed - The max acceptable amount of time passed since the
     * oracle price was last updated.
     * @return inTime - A bool that will be true if the price was updated
     * at most maxTimePassed seconds ago, otherwise false.
     */
    function checkPriceAge(uint128 maxTimePassed) external view returns (bool inTime) {
        if ((block.timestamp - timestampOflatestPrice) < maxTimePassed) {
            inTime = true;
        } else {
            inTime = false;
        }
    }
}


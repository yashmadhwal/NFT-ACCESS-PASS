require("@nomicfoundation/hardhat-toolbox");

import "@typechain/hardhat";
// import "@nomiclabs/hardhat-ethers";
// import "@nomiclabs/hardhat-waffle"
// import "@nomiclabs/hardhat-etherscan";
// import "@nomicfoundation/hardhat-verify";
import "hardhat-gas-reporter";
import "hardhat-deploy";

import 'dotenv/config'
import { HardhatUserConfig } from "hardhat/config"

require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    bsc_testnet: {
      url: process.env.BSC_TEST,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.API_KEY,
  },
  namedAccounts: {
    deployer: 0,
    sender: 1,
  },
};

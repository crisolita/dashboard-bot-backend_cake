/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");

module.exports = {
  defaultNetwork: "mainnet",
  networks: {
    // hardhat: {
    //   forking: {
    //     url: process.env.MAINNET_NODE_URL,
    //     blockNumber: 12232000,
    //   },
    // },
    // testnet: {
    //   url: process.env.TESTNET_NODE_URL,
    //   accounts: [process.env.TESNET_PRIVKEY],
    //   gasMultiplier: 1.2,
    // },
    mainnet: {
      url: "https://bsc-dataseed1.defibit.io/",
      chainId: 56,
      gasLimit: 300000,
      accounts: [process.env.MAINNET_PRIVKEY],
    },
  },
  namedAccounts: {
    deployer: 0,
    registryOwner: 0,
    multisig: 0,
  },
  etherscan: {
    apiKey: process.env.MAINNET_API_KEY,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  mocha: {
    timeout: 240000,
  },
  gasReporter: {
    enable: true,
  },
};

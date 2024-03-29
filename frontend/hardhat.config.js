// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.19",
// };

/////////////////////////////////// Tesnet ///////////////////////////////////////////////////

require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.TESTNET_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.TESTNET_POLYGONSCAN_API_KEY
  },
  solidity: {

    version: "0.8.17",
    // settings: {
    //   optimizer: {
    //     enabled: true,
    //     runs: 200
    //   }
    // }
  },
  paths: {
    artifacts: "./src/artifacts",
  },
}
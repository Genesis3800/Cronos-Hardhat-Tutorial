require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require("@nomiclabs/hardhat-etherscan");
require("@cronos-labs/hardhat-cronoscan");
require("@nomicfoundation/hardhat-chai-matchers");

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "Cronos_testnet",
  networks: {
    Cronos_testnet: {
        url: `${process.env.RPC_URL}`,
        accounts: [process.env.PRIVATE_KEY]
    },
},
    etherscan: {
        apiKey: {
         cronosTestnet: `${process.env.API_KEY}`,
  },
},
};
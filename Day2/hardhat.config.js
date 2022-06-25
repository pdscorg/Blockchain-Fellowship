require("@nomiclabs/hardhat-waffle");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

const PRIVATE_KEY =
  process.env.RINKEBY_PRIVATE_KEY ||
  process.env.PRIVATE_KEY ||
  "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

// If you are using MetaMask, be sure to change the chainId to 1337
module.exports = {
  solidity: "0.7.3",
  networks: {
    hardhat: {
      chainId: 31337
    },
    rinkeby: {
      url:
        process.env.RINKEBY_URL ||
        "",
      accounts: [`${PRIVATE_KEY}`],
    },
    kovan: {
      url: process.env.KOVAN_URL || "",
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: "SQ1A8NSSS7U1KS56JXF1P2WW4FIHA6E98Z",
  },
};

# Hardhat Hackathon Boilerplate

This repository contains a sample project that you can use as the starting point
for your Ethereum project. It's also a great fit for learning the basics of
smart contract development.

This project is intended to be used with the
[Hardhat Beginners Tutorial](https://hardhat.org/tutorial), but you should be
able to follow it by yourself by reading the README and exploring its
`contracts`, `tests`, `scripts` and `frontend` directories.

## Quick start of Hardhat

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/nomiclabs/hardhat-hackathon-boilerplate.git
cd hardhat-hackathon-boilerplate
npm install
```

Once installed, let's run Hardhat's testing network:

```sh
npx hardhat node
```

Then, on a new terminal, go to the repository's root folder and run this to
deploy your contract:

```sh
npx hardhat run scripts/deploy.js --network localhost
```

Finally, we can run the frontend with:

```sh
cd frontend
npm install
npm start
```

> Note: There's [an issue in `ganache-core`](https://github.com/trufflesuite/ganache-core/issues/650) that can make the `npm install` step fail.
>
> If you see `npm ERR! code ENOLOCAL`, try running `npm ci` instead of `npm install`.

Open [http://localhost:3000/](http://localhost:3000/) to see your Dapp. You will
need to have [Metamask](https://metamask.io) installed and listening to
`localhost 8545`.

## Setup of Day 2

1. Clone the repository:

   ```sh
   git clone https://github.com/pdscorg/Blockchain-Fellowship.git
   cd Blockchain-Fellowship
   ```

1. After you have clone the repository change your directory to Day2

   ```sh
   cd Day2
   ```

1. Then after you need to install all the dependencies of node package for that run the command inside `Day2`

   ```sh
   npm install
   ```

1. Change your directory to `frontend` folder where you have to install node package dependencies by running the command

   ```sh
   cd frontend
   npm install
   ```

1. Change you directory to the `Day2` again and run

   ```sh
   cd ../
   ```

   **In one terminal:**

   It will create you some free account to work with

   ```sh
   npx hardhat node
   ```

   _Note:
   Add few of those account in you metamask
   Account 0 is admin account and other are the account to make transactions_

   **In another terminal:**

   It will deploy your `Election` contract locally

   ```sh
   npx hardhat run scripts/deploy_election.js --network localhost
   ```

   _In another terminal:_

   ```sh
   npm start
   ```

   **Then you can play with Election contract you have made.**

1. To test the contract run the command we have written some test case inside `test/election.js`

   ```sh
   npx hardhat test
   ```

## User Guide

You can find detailed instructions on using this repository and many tips in [its documentation](https://hardhat.org/tutorial).

- [Writing and compiling contracts](https://hardhat.org/tutorial/writing-and-compiling-contracts/)
- [Setting up the environment](https://hardhat.org/tutorial/setting-up-the-environment/)
- [Testing Contracts](https://hardhat.org/tutorial/testing-contracts/)
- [Setting up Metamask](https://hardhat.org/tutorial/hackathon-boilerplate-project.html#how-to-use-it)
- [Hardhat's full documentation](https://hardhat.org/getting-started/)

For a complete introduction to Hardhat, refer to [this guide](https://hardhat.org/getting-started/#overview).

## What’s Included?

Your environment will have everything you need to build a Dapp powered by Hardhat and React.

- [Hardhat](https://hardhat.org/): An Ethereum development task runner and testing network.
- [Mocha](https://mochajs.org/): A JavaScript test runner.
- [Chai](https://www.chaijs.com/): A JavaScript assertion library.
- [ethers.js](https://docs.ethers.io/v5/): A JavaScript library for interacting with Ethereum.
- [Waffle](https://github.com/EthWorks/Waffle/): To have Ethereum-specific Chai assertions/mathers.
- [A sample frontend/Dapp](./frontend): A Dapp which uses [Create React App](https://github.com/facebook/create-react-app).

## Troubleshooting

- `Invalid nonce` errors: if you are seeing this error on the `npx hardhat node`
  console, try resetting your Metamask account. This will reset the account's
  transaction history and also the nonce. Open Metamask, click on your account
  followed by `Settings > Advanced > Reset Account`.

## Feedback, help and news

We'd love to have your feedback on this tutorial. Feel free to reach us through
this repository or [our Discord server](https://invite.gg/HardhatSupport).

Also you can [follow us on Twitter](https://twitter.com/HardhatHQ).

**Happy _building_!**

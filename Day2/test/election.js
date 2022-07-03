// This is an example test file. Hardhat will run every *.js file in `test/`,
// so feel free to add new ones.

// Hardhat tests are normally written with Mocha and Chai.

// We import Chai to use its asserting functions here.
const { expect } = require("chai");
const { upgrades, ethers, run } = require("hardhat");

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("Election contract", function () {
  // Mocha has four functions that let you hook into the the test runner's
  // lifecycle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.

  let Election;
  let hardhatElection;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Election = await ethers.getContractFactory("Election");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Election.deploy() and await
    // for it to be deployed(), which happens onces its transaction has been
    // mined.
    hardhatElection = await Election.deploy("Mayor of Kathmandu");

    // We can interact with the contract by calling `hardhatElection.method()`
    await hardhatElection.deployed();
  });

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    // `it` is another Mocha function. This is the one you use to define your
    // tests. It receives the test name, and a callback function.

    // If the callback function is async, Mocha will `await` it.
    it("Should set the right owner", async function () {
      // Expect receives a value, and wraps it in an assertion objet. These
      // objects have a lot of utility methods to assert values.

      // This test expects the owner variable stored in the contract to be equal
      // to our Signer's owner.
      expect(await hardhatElection.owner()).to.equal(owner.address);
    });
  });

  describe("Election", async function () {
    // Start Registration

    it("Election Process", async function () {
      await hardhatElection.startRegistration();

      /*Register as a voter*/
      await hardhatElection.connect(addr1).registerAsVoter(123456789);
      await hardhatElection.connect(addr2).registerAsVoter(987654321);

      /*Approve voter*/
      await hardhatElection.approveVoters(addr1.address);
      await hardhatElection.approveVoters(addr2.address);

      // End Registration
      await hardhatElection.connect(owner).endRegistration();

      it("Add Candidate", async function () {
        // Adding the condidate for the election
        await hardhatElection.addCandidates(
          "Something Nothing",
          "123",
          "something@nothing.com"
        );
        await hardhatElection.addCandidates(
          "Someone Noone",
          "456",
          "someone@noone.com"
        );

        expect(await hardhatElection.getCandidates()[0].candidateName).to.equal(
          "Something Nothing"
        );
        expect(await hardhatElection.getCandidates()[1].candidateName).to.equal(
          "Someone Noone"
        );

        /*Checking total number of candidatec count*/
        expect(await hardhatElection.candidateCount()).to.equal(2);
        it("Start Election", async function () {
          // Start Election
          await hardhatElection.connect(owner).startElection();

          it("Voting Process", async function () {
            // Voting process
            await hardhatElection.connect(addr1).vote(0);
            await hardhatElection.connect(addr2).vote(0);

            it("End Election", async function () {
              // End Election
              await hardhatElection.connect(owner).endElection();
              expect(
                await hardhatElection.connect(addr1).endElection()
              ).to.be.revertedWith("");
            });

            /*Checking results*/
            expect(
              await hardhatElection.checkResults()[0].candidateName
            ).to.equal("Something Nothing");

            /*Checking final stats*/
            expect(
              await hardhatElection.getFinalStats()[0].candidateVoteCount
            ).to.equal(2);
            expect(
              await hardhatElection.getFinalStats()[1].candidateVoteCount
            ).to.equal(0);
          });
        });
      });
    });
  });

  describe("Extras", async function () {
    it("Changing Owner", async function () {
      /*Changing the owner*/
      await hardhatElection.changeOwner(addr1.address);

      expect(await hardhatElection.owner()).to.equal(addr1.address);
    });

    it("Election Name", async function () {
      expect(await hardhatElection.electionName()).to.equal(
        "Mayor of Kathmandu"
      );
    });
  });
});

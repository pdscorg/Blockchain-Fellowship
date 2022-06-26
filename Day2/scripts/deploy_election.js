// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
  
    // ethers is available in the global scope
    const [deployer] = await ethers.getSigners();
    console.log(
      "Deploying the contracts with the account:",
      await deployer.getAddress()
    );
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const Election = await ethers.getContractFactory("Election");
    const election = await Election.deploy("Nepal Votes");
    await election.deployed();
  
    console.log("Election Contract address:", election.address);
  
    // We also save the contract's artifacts and address in the frontend directory
    saveFrontendFiles(election);
  }
  
  function saveFrontendFiles(election) {
    const fs = require("fs");
    const contractsDir = __dirname + "/../frontend/src/contracts";
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
  
    fs.writeFileSync(
      contractsDir + "/contract-address.json",
      JSON.stringify({ Election: election.address }, undefined, 2)
    );
  
    const ElectionArtifact = artifacts.readArtifactSync("Election");
  
    fs.writeFileSync(
      contractsDir + "/Election.json",
      JSON.stringify(ElectionArtifact, null, 2)
    );
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  
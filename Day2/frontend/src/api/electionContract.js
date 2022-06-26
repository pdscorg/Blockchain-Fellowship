import { ethers } from "ethers";

import ElectionArtifact from "../contracts/Election.json";
import contractAddress from "../contracts/contract-address.json";


const provider = new ethers.providers.Web3Provider(
    window.ethereum
);

// for get functions
const election = new ethers.Contract(
    contractAddress.Election,
    ElectionArtifact.abi,
    provider
);

// for external functions
const signer = provider.getSigner()
const contractMethod = new ethers.Contract(
    contractAddress.Election,
    ElectionArtifact.abi,
    signer
)

export { election, contractMethod };

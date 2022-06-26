import { ethers } from "ethers";

const BigN = (n) => {
    if (n === null) {
        return 0;
    }
    return ethers.BigNumber.from(n.toString());
};

export { BigN }
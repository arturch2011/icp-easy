const addr = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

// const { abi } = require("../evm/artifacts/contracts/greet.sol/HelloWorld.json");
import { abi } from "../abi/HelloWorld.json";

//eslint-disable-next-line
const contract = (web3: any) => {
    return new web3.eth.Contract(abi, addr);
};

export default contract;

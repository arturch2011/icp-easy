import Web3 from "web3";
import { MetaMaskInpageProvider } from "@metamask/providers";
//require('dotenv').config()
// require("dotenv").config();

declare global {
    interface Window {
        ethereum: MetaMaskInpageProvider;
    }
}

// const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    // We are in the browser and metamask is running.
    //window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new Web3.providers.HttpProvider(
        `https://testnet.bitfinity.network`
    );
    web3 = new Web3(provider);
} else {
    // We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        `https://testnet.bitfinity.network`
    );
    web3 = new Web3(provider);
}

export default web3;

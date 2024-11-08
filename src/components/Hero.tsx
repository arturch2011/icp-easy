"use client";
import Web3 from "web3";
import contract from "../../instances/greetInstance"
// import web3 from "../../instances/web3";
import { useState } from "react";
/* eslint-disable */

//eslint-disable-next-line
const handleTransaction = async (name: string, setGreet: any, setList: any) => {
  if (typeof window.ethereum === "undefined") {
    alert("MetaMask não encontrado! Por favor, instale o MetaMask.");
    return;
  }

  // Pedir permissão ao usuário para acessar a carteira MetaMask
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  } catch (error) {
    console.error("Usuário rejeitou a conexão com MetaMask", error);
    return;
  }
  const web3 = new Web3(window.ethereum);

  const instance = contract(web3);
  
  console.log("instance", instance);
  
  const accounts = await web3.eth.getAccounts();
  console.log("accounts", accounts);

  
  const transaction = await instance.methods.greet(name).send({ from: accounts[0] });
  console.log("transaction", transaction);
  
  // const transaction = await instance.methods.names(0).call();
  // console.log("transaction", transaction);

  

  const contractReturn = await instance.methods.name().call();
  const list = await instance.methods.getList().call();
  console.log('list', list);
  // console.log("contract return", contractReturn);
  setGreet(contractReturn);
  setList(list);
  // return transaction;
}

export const Hero = () => {
  const [name, setName] = useState("");
  const [greet, setGreet] = useState("");
  const [list, setList] = useState([]);
  return (
    <div className="flex w-full min-h-screen flex-col justify-center items-center gap-10 bg-gradient-to-br from-black to-cyan-900">
      <h1 className="text-2xl font-bold ">{`Hello ${greet ?? 'user'}`}</h1>
      <div className="flex items-center gap-4">
        <input
          placeholder="Your Name"
          className=" bg-gray-500/10 focus:outline-none border border-gray-500/25 focus:border-cyan-400 border-solid  shadow-xl rounded-md p-3"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={async ()=> {await handleTransaction(name, setGreet, setList)}} className="bg-cyan-900 text-white p-3 rounded-md font-bold text-lg shadow hover:bg-cyan-400 active:bg-cyan-900 hover:text-black  ease-in-out duration-500 active:duration-0">
          Send transaction
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {list.map((item: any, index: number) => (
          <div key={index} className="bg-gray-500/10 p-3 rounded-md">
            {item}
          </div>
        ))}
        </div>
    </div>
  );
};

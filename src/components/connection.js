import Web3 from "web3";
import {bep20ABI} from "./abi";
import { factoryABI } from "./abi";
import { poolABI } from "./abi";

var web3;
var connectedAccount ;
var factory;
var pool;
var poolInfo={Address:null,
    token2USD: null,
    USD2token: null,
    buyTax: null,
    saleTax: null,
    name:null,
    supply:null};
var token;

const connectToWeb3 = async ()=>{

    await window.ethereum.request({method:"eth_requestAccounts"});
    connectedAccount = await web3.eth.getAccounts();
    alert("successfully connected to "+connectedAccount[0])

}
const getFactoryContract = async ()=>{
    web3 = new Web3(window.ethereum);
    factory = await new web3.eth.Contract(factoryABI,"0x9dc27eb8Fce1964cCba9Ee3015d5040b700E9b93");
}

const getConnectedAccount = async()=>{
    return await connectedAccount;
}

const getFactory = async ()=>{
    return await factory;
}

const getPool = async (tokenAddress)=>{
    try{
    token = tokenAddress;
    var poolAddress = await factory.methods.TokenToPool(tokenAddress).call();
    pool = await new web3.eth.Contract(poolABI,poolAddress);
    var bep20 = await new web3.eth.Contract(bep20ABI,tokenAddress);
    console.log(pool._address);
    var sup = await bep20.methods.totalSupply().call()/1e18
    poolInfo ={
        Address:pool._address,
        token2USD: await pool.methods.tokenPerUSD().call()/1e18,
        USD2token: await pool.methods.USDPerToken().call()/1e18,
        buyTax: await pool.methods.buyTax().call(),
        saleTax: await pool.methods.saleTax().call(),
        name: await bep20.methods.name().call(),
        supply: sup.toLocaleString(),
    }

    return poolInfo;
    }
    catch(e){
        alert(e.message);
    }
}

const getPoolInfo = ()=>{
    return poolInfo;
}
const buyToken =async (USD)=>{

}
window.ethereum.on("accountsChanged",async (acc)=>{
    connectedAccount = acc;
    console.log(connectedAccount);
  })

export {connectToWeb3,getConnectedAccount,getFactoryContract, getFactory, getPool,getPoolInfo};
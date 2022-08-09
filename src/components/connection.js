import Web3 from "web3";
import { factoryABI } from "./abi";
import "./abi";
import { poolABI } from "./abi";

var web3;
var connectedAccount ;
var factory;
var pool;
var poolInfo={Address:null,
    token2USD: null,
    USD2token: null,
    buyTax: null,
    saleTax: null};

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
    var poolAddress = await factory.methods.TokenToPool(tokenAddress).call();
    pool = await new web3.eth.Contract(poolABI,poolAddress);
    console.log(pool._address);
    poolInfo ={
        Address:pool._address,
        token2USD: await pool.methods.tokenPerUSD().call()/1e18,
        USD2token: await pool.methods.USDPerToken().call()/1e18,
        buyTax: await pool.methods.buyTax().call(),
        saleTax: await pool.methods.saleTax().call()
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

window.ethereum.on("accountsChanged",async (acc)=>{
    connectedAccount = acc;
    console.log(connectedAccount);
  })

export {connectToWeb3,getConnectedAccount,getFactoryContract, getFactory, getPool,getPoolInfo};
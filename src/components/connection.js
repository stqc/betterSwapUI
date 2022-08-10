import Web3 from "web3";
import {bep20ABI} from "./abi";
import { factoryABI } from "./abi";
import { poolABI } from "./abi";

var web3;
var connectedAccount = null;
var factory;
var pool;
var poolInfo={Address:null,
    token2USD: null,
    USD2token: null,
    buyTax: null,
    saleTax: null,
    name:null,
    supply:null};
var tokenAD;
var USDAddress;

const connectToWeb3 = async ()=>{

    await window.ethereum.request({method:"eth_requestAccounts"});
    connectedAccount = await web3.eth.getAccounts();
    alert("successfully connected to "+connectedAccount[0])

}
const getFactoryContract = async ()=>{
    web3 = new Web3(window.ethereum);
    factory = await new web3.eth.Contract(factoryABI,"0x9dc27eb8Fce1964cCba9Ee3015d5040b700E9b93");
    USDAddress = await factory.methods.usd().call();
}

const getConnectedAccount = ()=>{
    return {acc:connectedAccount};
}

const getFactory =  ()=>{
    return factory;
}

const getPool = async (tokenAddress)=>{
    try{
    tokenAD = tokenAddress;
    
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
const approveTX = async(tokenToApprove,amount)=>{
    amount=web3.utils.toWei(amount);
    
    try{
         var tokenContract = await new web3.eth.Contract(bep20ABI,tokenToApprove);
         var tx= await tokenContract.methods.approve(poolInfo.Address,amount).send({from:connectedAccount[0]});
         alert(tx.blockHash);
    }
    catch(e){
        alert(e.message);
     }
}

const buyToken =async (USD)=>{

    USD=web3.utils.toWei(USD);
    console.log(USD);
    try{
        
         var tx= await pool.methods.buyToken(USD).send({from:connectedAccount[0]});
         console.log(tx);
         await getPool();
         alert(tx.blockHash);
    }
    catch(e){
        alert(e.message);
     }
}
const sellToken =async (USD)=>{

    USD=web3.utils.toWei(USD);
    console.log(USD);
    try{
        
         var tx= await pool.methods.sellToken(USD).send({from:connectedAccount[0]});
         console.log(tx);
         await getPool();
         alert(tx.blockHash);
    }
    catch(e){
        alert(e.message);
     }
}
window.ethereum.on("accountsChanged",async (acc)=>{
    connectedAccount = acc;
    console.log(connectedAccount);
  })

export {connectToWeb3,getConnectedAccount,getFactoryContract, getFactory, getPool,getPoolInfo,approveTX
,USDAddress,tokenAD,buyToken,sellToken};
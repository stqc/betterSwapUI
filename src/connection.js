import Web3 from "web3";
import {bep20ABI, tokenFactoryABI} from "./abi.js";
import { factoryABI } from "./abi.js";
import { poolABI } from "./abi.js";
import { createChart } from "lightweight-charts"

// updates
var web3;
var connectedAccount = null;
var factory;
export var pool=null;
var poolInfo={Address:null,
    token2USD: null,
    USD2token: null,
    buyTax: null,
    saleTax: null,
    name:null,
    supply:null,
    ben: null};
var tokenAD=null;
var USDAddress;
var chartData=[];
var chart, lineSeries, mChart, mSeries;
var frame ="D";
var USDBale=0;
var tokenBale=0;
var dollar;
var prev;
const connectToWeb3 = async ()=>{

    await window.ethereum.request({method:"eth_requestAccounts"});
    connectedAccount = await web3.eth.getAccounts();
    dollar = await new web3.eth.Contract(bep20ABI,USDAddress);
    await updateBalances();
}
export const getbal=()=>{

 return USDBale;
}

export const getTokenBal=()=>{
    return tokenBale;
}


export const approveUSD=async (amt)=>{
    var tx = await dollar.methods.approve("0xD104193915010C4011cBf94F58dd9559348fBeB5",amt).send({from:connectedAccount[0]});
    return [tx.blockHash];
}
export const createToken= async (name_,symbol,supply,buyt,sellt,lpt)=>{
    console.log(lpt);

    var tokenFactory_=new web3.eth.Contract(tokenFactoryABI,"0xD104193915010C4011cBf94F58dd9559348fBeB5");
    try{
        if(lpt>0){
            var tx = await tokenFactory_.methods.createLPToken(name_,symbol,supply,buyt,sellt,lpt).send({from:connectedAccount[0]});
            return [tx.blockHash];
        }
        else{
            var tx = await tokenFactory_.methods.createSimpleToken(name_,symbol,supply,buyt,sellt).send({from:connectedAccount[0]});
            return [tx.blockHash];
        }
    }
    catch(e){
        return [e.message,0];
    }


}


const updateBalances =async ()=>{
    connectedAccount!=null?
         USDBale = ((await dollar.methods.balanceOf(connectedAccount[0]).call())/1e18).toLocaleString()
    :0
    if(connectedAccount!=null){
        if(tokenAD!=null){
            var bep20 = new web3.eth.Contract(bep20ABI,tokenAD);
            tokenBale = ((await bep20.methods.balanceOf(connectedAccount[0]).call())/1e18).toLocaleString()
        }
    }
}
const getFactoryContract = async ()=>{
    web3 = new Web3(window.ethereum);
    factory = await new web3.eth.Contract(factoryABI,"0x7F89147074655A680379f72e4A0b5d306E138280");
    USDAddress = await factory.methods.usd().call();
}

const getConnectedAccount = ()=>{
    return {acc:connectedAccount};
}

const getFactory =  ()=>{
    return factory;
}


const getPool = async (tokenAddress)=>{
    pool=null;
    poolInfo={Address:null,
        token2USD: null,
        USD2token: null,
        buyTax: null,
        saleTax: null,
        name:null,
        supply:null,
        ben: null};
        tokenAD=tokenAddress
    try{
        
    tokenAD = tokenAddress;
    
    var poolAddress = await factory.methods.TokenToPool(tokenAddress).call();
    console.log(poolAddress);
    pool===null?pool = await new web3.eth.Contract(poolABI,poolAddress):pool;
    var bep20 = await new web3.eth.Contract(bep20ABI,tokenAddress);
    console.log(pool._address,tokenAD);
       
    await updateBalances();
    connectedAccount!=null?tokenBale = (await bep20.methods.balanceOf(connectedAccount[0]).call()/1e18).toLocaleString():0
    var sup = await bep20.methods.totalSupply().call()/1e18
            try{
            poolInfo ={
                Address:pool._address,
                token2USD: await pool.methods.tokenPerUSD().call()/1e18,
                USD2token: await pool.methods.USDPerToken().call()/1e18,
                buyTax: await pool.methods.buyTax().call(),
                saleTax: await pool.methods.saleTax().call(),
                name: await bep20.methods.name().call(),
                supply: sup.toLocaleString(),
                ben: await pool.methods.beneficiery().call(),
            }
            
            
                
    
        }
        catch (e){
            poolInfo ={
                Address:pool._address,
                token2USD: 0,
                USD2token: 0,
                buyTax: await pool.methods.buyTax().call(),
                saleTax: await pool.methods.saleTax().call(),
                name: await bep20.methods.name().call(),
                supply: sup.toLocaleString(),
                ben: await pool.methods.beneficiery().call(),
            }
        }

    return poolInfo;
    }
    catch(e){
        console.log(e.message);

    }
    
}
export const createPool=async (buyTax,sellTax)=>{
   var tx = await factory.methods.createNewPool(tokenAD,connectedAccount[0],buyTax,sellTax).send({from:connectedAccount[0]});
    return [tx.blockHash];
}
const getPoolInfo = ()=>{
    return poolInfo;
}

export const getEntirePoolObject=()=>{
    return pool;
}

export const sendUSDToContract = async(amount)=>{
    amount = web3.utils.toWei(amount);
    try{var tokenContract = await new web3.eth.Contract(bep20ABI,USDAddress);
    var tx  = await tokenContract.methods.transfer(tokenAD,amount).send({from:connectedAccount[0]});
    console.log(tx.blockHash);
    return [tx.blockHash];}
    catch(e){
        return [e.message,0];
    }


}

export const addLiquidityThroughContract = async(tokenAMT,usdAMT)=>{
    tokenAMT = web3.utils.toWei(tokenAMT);
    usdAMT =web3.utils.toWei(usdAMT);
    console.log(tokenAMT,usdAMT);
   try{ var tokenContract = await new web3.eth.Contract(bep20ABI,tokenAD);
    var tx = await tokenContract.methods.addInitialLiquidity(usdAMT,tokenAMT).send({from:connectedAccount[0]});
    console.log(tx.blockHash);
    getPool(tokenAD);
    return [tx.blockHash];}
    catch(e){
        return [e.message,0];
    }
}

export const removeLPContract=async()=>{
    try{ var tokenContract = await new web3.eth.Contract(bep20ABI,tokenAD);
        var tx = await tokenContract.methods.requestLiqudityRemoval().send({from:connectedAccount[0]});
        console.log(tx.blockHash);
        return [tx.blockHash];}
        catch(e){
            return [e.message,0];
        }
}


const approveTX = async(tokenToApprove,amount)=>{
    amount=web3.utils.toWei(amount);
    console.log(tokenToApprove);
     try{
         var tokenContract = await new web3.eth.Contract(bep20ABI,tokenToApprove);
         var tx= await tokenContract.methods.approve(pool._address,amount).send({from:connectedAccount[0]});
         return [tx.blockHash];
     }
     catch(e){
         return [e.message,0];
      }
}

const buyToken =async (USD)=>{

    USD=web3.utils.toWei(USD);
    console.log(USD);
    try{
        
         var tx= await pool.methods.buyToken(USD).send({from:connectedAccount[0]});
         await getPool(tokenAD);
         buildChart();
         buildChartM();
         return [tx.blockHash];
    }
    catch(e){
         return [e.message,0];
     }
}
const sellToken =async (USD)=>{

    USD=web3.utils.toWei(USD);
    console.log(USD);
    try{
        
         var tx= await pool.methods.sellToken(USD).send({from:connectedAccount[0]});
         console.log(tx);
         await getPool(tokenAD);
         buildChart();
         buildChartM();
         return [tx.blockHash];
    }
    catch(e){
        return [e.message,0];
     }
}

const addLiquidity= async(USD,Token)=>{
    USD = web3.utils.toWei(USD);
    Token = web3.utils.toWei(Token);
    try{
        var tx = await pool.methods.addLiquidity(Token,USD).send({from:connectedAccount[0]});
        console.log(tx);
        getPool(tokenAD);
        return [tx.blockHash];
    }
    catch(e){
        return [e.message];
    }
}
const get1hChartData = async()=>{
    chartData=[];
    try{
        let data= await pool.methods.showTradeData(60).call();
        for(let i =1; i<data.length; i++){
            chartData.push({time:Number(data[i].time),open:data[i].Open/1e18,low: data[i].Low/1e18,high:data[i].High/1e18,close:data[i].Close/1e18})
        }

    }
    catch(e){
        console.log(e.message);
    }
    
}
const get1mChartData = async()=>{
    chartData=[];
    try{
        let data= await pool.methods.showTradeData(1).call();
        for(let i =1; i<data.length; i++){
            chartData.push({time:Number(data[i].time),open:data[i].Open/1e18,low: data[i].Low/1e18,high:data[i].High/1e18,close:data[i].Close/1e18})
        }

    }
    catch(e){
        console.log(e.message);
    }
}
const get1dChartData = async()=>{
    chartData=[];
    try{
        let data= await pool.methods.showTradeData(24).call();
        for(let i =1; i<data.length; i++){
            chartData.push({time:Number(data[i].time),open:data[i].Open/1e18,low: data[i].Low/1e18,high:data[i].High/1e18,close:data[i].Close/1e18})
        }

    }
    catch(e){
        console.log(e.message);
    }

}


const requestLiquidityRemoval= async()=>{
    try{
        var tx = await pool.methods.approveEmergencyWithdraw().send({from:connectedAccount[0]});
        console.log(tx);
        return tx.blockHash;
    }
    catch(e){
        return e.message;
    }
}

const buildChart=async()=>{
    
        if(frame=='M'){
            await get1mChartData()
        }
        if(frame=="H"){
            await get1hChartData()
        }
        if(frame=="D"){
            await get1dChartData()
        }

   
    document.getElementById('chrt').innerHTML="";
    chart = createChart(document.getElementById("chrt"), { width: document.getElementById("chrt").offsetWidth, height:  document.getElementById("chrt").offsetHeight});
    lineSeries = chart.addCandlestickSeries();
    mChart = createChart(document.getElementById("chrt-m"), { width: document.getElementById("chrt-m").offsetWidth, height:  document.getElementById("chrt-m").offsetHeight});
    mSeries = mChart.addCandlestickSeries();
    lineSeries.setData(chartData);
    mSeries.setData(chartData);
}
const buildChartM=async()=>{
    
        if(frame=='M'){
            await get1mChartData()
        }
        if(frame=="H"){
            await get1hChartData()
        }
        if(frame=="D"){
            await get1dChartData()
        }

    
    document.getElementById('chrt-m').innerHTML="";
    mChart = createChart(document.getElementById("chrt-m"), { width: document.getElementById("chrt-m").offsetWidth, height:  document.getElementById("chrt-m").offsetHeight});
    mSeries = mChart.addCandlestickSeries();
    mSeries.setData(chartData);
}


const changeFrame = (fr)=>{
    console.log(fr)
    frame=fr
    buildChart();
}

const changeFrameM = (fr)=>{
    console.log(fr)
    frame=fr;
    buildChartM();
}


window.ethereum.on("accountsChanged",async (acc)=>{
    connectedAccount = acc;
    console.log(connectedAccount);
  })
window.addEventListener('resize',()=>{
    document.getElementsByClassName('tv-lightweight-charts')[0].remove();
    document.getElementsByClassName('tv-lightweight-charts')[0].remove();
    document.getElementById('chrt-m').innerHTML="";
    document.getElementById('chrt').innerHTML="";
    chart = createChart(document.getElementById("chrt"), { width: document.getElementById("chrt").offsetWidth, height:  document.getElementById("chrt").offsetHeight});
    lineSeries = chart.addCandlestickSeries();
    lineSeries.setData(chartData);
    mChart = createChart(document.getElementById("chrt-m"), { width: document.getElementById("chrt-m").offsetWidth, height:  document.getElementById("chrt-m").offsetHeight});
    mSeries = mChart.addCandlestickSeries();
    mSeries.setData(chartData);
})

window.addEventListener("load",()=>{
    chart = createChart(document.getElementById("chrt"), { width: document.getElementById("chrt").offsetWidth, height:  document.getElementById("chrt").offsetHeight});
    lineSeries = chart.addCandlestickSeries();
    mChart = createChart(document.getElementById("chrt-m"), { width: document.getElementById("chrt-m").offsetWidth, height:  document.getElementById("chrt-m").offsetHeight});
    mSeries = mChart.addCandlestickSeries();
    
})

export const updateChartData=async()=>{
    if(frame=='M'){
        await get1mChartData()
    }
    if(frame=="H"){
        await get1hChartData()
    }
    if(frame=="D"){
        await get1dChartData()
    }

    await lineSeries.update(chartData);
    await mSeries.update(chartData);
}



export {connectToWeb3,getConnectedAccount,getFactoryContract, 
    getFactory, getPool,getPoolInfo,approveTX
,USDAddress,tokenAD,buyToken,sellToken,connectedAccount,
addLiquidity,requestLiquidityRemoval,chartData,get1mChartData
,buildChart,buildChartM,changeFrame,changeFrameM, USDBale, tokenBale};

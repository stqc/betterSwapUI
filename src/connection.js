import Web3 from "web3";
import {bep20ABI} from "./abi.js";
import { factoryABI } from "./abi.js";
import { poolABI } from "./abi.js";
import { createChart } from "lightweight-charts"

// updates
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
var tokenAD=null;
var USDAddress;
var chartData=[];
var chart, lineSeries, mChart, mSeries;
var frame ="D";
var USDBale=0;
var tokenBale=0;
var dollar;
export var zzz=10;
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

const updateBalances =async ()=>{
    connectedAccount!=null?
         USDBale = (await dollar.methods.balanceOf(connectedAccount[0]).call()/1e18).toLocaleString()
    :0
    if(connectedAccount!=null){
        if(tokenAD!=null){
            var bep20 = new web3.eth.Contract(bep20ABI,tokenAD);
            tokenBale = (await bep20.methods.balanceOf(connectedAccount[0]).call()/1e18).toLocaleString()
        }
    }
}
const getFactoryContract = async ()=>{
    web3 = new Web3(window.ethereum);
    factory = await new web3.eth.Contract(factoryABI,"0x2472fB9b1D80B9663a9A80920e6e3297Ae86e839");
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
            }
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
    console.log(tokenToApprove);
     try{
         var tokenContract = await new web3.eth.Contract(bep20ABI,tokenToApprove);
         var tx= await tokenContract.methods.approve(pool._address,amount).send({from:connectedAccount[0]});
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
         await getPool(tokenAD);
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
         await getPool(tokenAD);
         alert(tx.blockHash);
    }
    catch(e){
        alert(e.message);
     }
}

const addLiquidity= async(USD,Token)=>{
    USD = web3.utils.toWei(USD);
    Token = web3.utils.toWei(Token);
    try{
        var tx = await pool.methods.addLiquidity(Token,USD).send({from:connectedAccount[0]});
        console.log(tx);
        alert(tx.blockHash);
    }
    catch(e){
        alert(e.message);
    }
}
const get1hChartData = async()=>{
    chartData=[];
    try{
        let data= await pool.methods.showTradeData(60).call();
        for(let i =1; i<data.length; i++){
            chartData.push({time:Number(data[i].time),open:data[i].Open/1e18,low: data[i].Low/1e18,high:data[i].High/1e18,close:data[i].Close/1e18})
        }
        console.log(chartData)
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
        console.log(chartData)
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
        console.log(chartData)
    }
    catch(e){
        console.log(e.message);
    }

}


const requestLiquidityRemoval= async()=>{
    try{
        var tx = await pool.methods.approveEmergencyWithdraw().send({from:connectedAccount[0]});
        console.log(tx);
        alert(tx.blockHash);
    }
    catch(e){
        alert(e.message);
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

    console.log(chartData, frame);
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
export {connectToWeb3,getConnectedAccount,getFactoryContract, 
    getFactory, getPool,getPoolInfo,approveTX
,USDAddress,tokenAD,buyToken,sellToken,connectedAccount,
addLiquidity,requestLiquidityRemoval,chartData,get1mChartData
,buildChart,buildChartM,changeFrame,changeFrameM, USDBale, tokenBale};

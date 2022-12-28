import Web3 from "web3";
import {bep20ABI, tokenFactoryABI} from "./abi.js";
import { factoryABI } from "./abi.js";
import { poolABI } from "./abi.js";
import { createChart } from "lightweight-charts"
import { UpdateDatainTable,createData } from "./InfoTable.js";


// updates
export var web3;
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


const connectToWeb3 = async ()=>{

    await window.ethereum.request({method:"eth_requestAccounts"});
    connectedAccount = await web3.eth.getAccounts();
    dollar = await new web3.eth.Contract(bep20ABI,USDAddress);
    await updateBalances();
    const subscription = web3.eth.subscribe(
        "newBlockHeaders",
        async (err, result) => {
            const { number } = result;
            console.log(number)
            
            if(tokenAD!=null){ 
                updateChartData();
                upChart();
                updatePoolPrice();  
                if(UpdateDatainTable){
                UpdateDatainTable([createData('Token Name', poolInfo.name ),
                createData('Pool Address', poolInfo.Address),
                createData('Total Supply', poolInfo.supply),
                createData('Tokens/USD', poolInfo.token2USD),
                createData('USD/Token', poolInfo.USD2token),
                createData('Buy Tax',poolInfo.buyTax),
                createData('Sell Tax',poolInfo.saleTax)])
            }
             }
       });
}
export const getbal=()=>{

 return USDBale;
}

export const getTokenBal=()=>{
    return tokenBale;
}


export const approveUSD=async (amt)=>{
    var tx = await dollar.methods.approve("0x2EAE4204ee43748d20FB6a2d51f0064d6e96afe8",amt).send({from:connectedAccount[0]});
    return [tx.blockHash];
}
export const createToken= async (name_,symbol,supply,buyt,sellt,lpt,refAD)=>{
    console.log(lpt);
    var add;
    refAD?add=refAD:add="0xAFfD36344588708563ac19F0eaD1Bb80d93f3E4C";
    var tokenFactory_=new web3.eth.Contract(tokenFactoryABI,"0x30C786d3Ce468c1901b4a99b7f5249c3818f9fb3");
    try{
        
            var tx = await tokenFactory_.methods.createSimpleToken(name_,symbol,supply,buyt,sellt,lpt,add).send({from:connectedAccount[0]});
            return [tx.blockHash];
        
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
    factory = await new web3.eth.Contract(factoryABI,"0xAFfD36344588708563ac19F0eaD1Bb80d93f3E4C");
    USDAddress = await factory.methods.usd().call();
}

const getConnectedAccount = ()=>{
    return {acc:connectedAccount};
}

const getFactory =  ()=>{
    return factory;
}
export const updatePoolPrice = async ()=>{
    var bep20 = await new web3.eth.Contract(bep20ABI,tokenAD);
    var sup = await bep20.methods.totalSupply().call()/1e18


    poolInfo ={
        Address:pool._address,
        token2USD: await pool.methods.tokenPerUSD().call()/1e18,
        USD2token: await pool.methods.USDPerToken().call()/1e18,
        buyTax: await pool.methods.totalBuyTax().call(),
        saleTax: await pool.methods.totalSaleTax().call(),
        name: await bep20.methods.name().call(),
        supply: sup.toLocaleString(),
        ben: await pool.methods.beneficiery().call(),
    }

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
                buyTax: await pool.methods.totalBuyTax().call(),
                saleTax: await pool.methods.totalSaleTax().call(),
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
                buyTax: await pool.methods.totalBuyTax().call(),
                saleTax: await pool.methods.totalSaleTax().call(),
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
export const createPool=async (buyTax,sellTax,lptax,ref)=>{
   var tx = await factory.methods.createNewPool(tokenAD,connectedAccount[0],buyTax,sellTax,lptax,ref).send({from:connectedAccount[0]});
    return [tx.blockHash];
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
        await getPool(tokenAD);
        return [tx.blockHash];
    }
    catch(e){
        return [e.message];
    }
}
const get1hChartData = async()=>{
    let chartData=[];
    try{
        let data= await pool.methods.showTradeData(60).call();
        for(let i =1; i<data.length; i++){
            chartData.push({time:Number(data[i].time),open:data[i].Open/1e18,low: data[i].Low/1e18,high:data[i].High/1e18,close:data[i].Close/1e18})
        }
        return chartData;
    }
    catch(e){
        console.log(e.message);
    }
    
}
const get1mChartData = async()=>{
    let chartData=[];
    try{
        let data= await pool.methods.showTradeData(1).call();
        for(let i =1; i<data.length; i++){
            chartData.push({time:Number(data[i].time),open:data[i].Open/1e18,low: data[i].Low/1e18,high:data[i].High/1e18,close:data[i].Close/1e18})
        }
        return chartData
    }
    catch(e){
        console.log(e.message);
    }
}
const get1dChartData = async()=>{
    let chartData=[];
    try{
        let data= await pool.methods.showTradeData(24).call();
        for(let i =1; i<data.length; i++){
            chartData.push({time:Number(data[i].time),open:data[i].Open/1e18,low: data[i].Low/1e18,high:data[i].High/1e18,close:data[i].Close/1e18})
        }
        return chartData;
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
    try{lineSeries.setData([]);}
    catch(e){console.log(e.message);}
        let data;
        if(frame=='M'){
          data=  await get1mChartData()
        }
        if(frame=="H"){
           data= await get1hChartData()
        }
        if(frame=="D"){
            data =await get1dChartData()
        }

    document.getElementById('chrt').innerHTML="";
    chart = createChart(document.getElementById("chrt"), { width: document.getElementById("chrt").offsetWidth, height:  document.getElementById("chrt").offsetHeight});
    lineSeries = chart.addCandlestickSeries();
    
    lineSeries.setData(data);
}

const buildChartM=async()=>{
    try{mSeries.setData([]);}
    catch(e){console.log(e.message);}

    let data
        if(frame=='M'){
           data= await get1mChartData()
        }
        if(frame=="H"){
           data = await get1hChartData()
        }
        if(frame=="D"){
           data= await get1dChartData()
        }

    
    document.getElementById('chrt-m').innerHTML="";
    mChart = createChart(document.getElementById("chrt-m"), { width: document.getElementById("chrt-m").offsetWidth, height:  document.getElementById("chrt-m").offsetHeight});
    mSeries = mChart.addCandlestickSeries();
    mSeries.setData(data);
}

const upChart = async ()=>{
    let data;
    if(frame=='M'){
       data= await get1mChartData()
    }
    if(frame=="H"){
        data=await get1hChartData()
    }
    if(frame=="D"){
        data=await get1dChartData()
    }
    mSeries.setData(data); 
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
    let data;
    if(frame=='M'){
       data= await get1mChartData()
    }
    if(frame=="H"){
        data=await get1hChartData()
    }
    if(frame=="D"){
        data=await get1dChartData()
    }
    console.log(data)
    lineSeries.setData(data);
}



export {connectToWeb3,getConnectedAccount,getFactoryContract, 
    getFactory, getPool,getPoolInfo,approveTX
,USDAddress,tokenAD,buyToken,sellToken,connectedAccount,
addLiquidity,requestLiquidityRemoval,chartData,get1mChartData
,buildChart,buildChartM,changeFrame,changeFrameM, USDBale, tokenBale};

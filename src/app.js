import React, { useEffect, useState } from "react";
import Navbar from "./navBar";
import Bottom from "./bottomnva";
import './app.css';
import { useMediaQuery } from "@mui/material";
import Swap from './Swap';
import History from './History';
import {SearchToken} from './search';
import Liquidity from "./liquidity";
import {getFactoryContract, getFactory,getPoolInfo} from "./connection.js";
import { SettingsCellRounded } from "@mui/icons-material";
import swapLogo from './Xgczj6_2_.svg';
import { changeFrame,changeFrameM } from "./connection.js";
const App = () => {
 const maxW = useMediaQuery(
   '(max-width:900 px)'
 )  

 const[Sgrid,setSgrid] = useState("grid");
 const[Cgrid,setCgrid] =useState('none');
 const[Lgrid,setLgrid] =useState('none');
  useEffect(async()=>{
      await getFactoryContract();

  },[]);
    
    const [pool,updatePool] = useState({Address:"",
      token2USD: "",
      USD2token: "null",
      buyTax: "null",
      saleTax: "null"})
    async function updatepoolInfo(){
      await updatePool(getPoolInfo());
    }
  return (
    <>
    
      <Navbar />
      <div id="web3-found">

      <div className="main-content">
        <SearchToken update={updatepoolInfo} style={{marginBottom:"4%"}}/>
        <div style={{display:Sgrid}}><Swap pooli ={pool}/></div>
        <div className="chart-main"  style={{display:Cgrid}}>
          <div className="chart" id="chrt-m" style={{display:Cgrid}}> </div>
          <div className="time-Selector-m">
          <div onClick={()=>{changeFrameM("M")}}>1M</div><div onClick={()=>{changeFrameM("H")}}>1H</div><div onClick={()=>{changeFrameM("D")}}>1D</div>
          </div>
        </div>
          <div  style={{display:Lgrid}}><Liquidity/></div>
      </div>
      <div className="main-content-PC">
        <SearchToken update={updatepoolInfo}/>
        <div className ="chart-swap">
          <div className="chart-main">
          
            <div className="chart" id="chrt">
              
            </div>
            <div className="time-Selector">
            <div onClick={()=>{changeFrame("M")}}>1M</div><div onClick={()=>{changeFrame("H")}}>1H</div><div onClick={()=>{changeFrame("D")}}>1D</div>
            </div>
          </div>
          <Swap pooli ={pool}/>
        </div>
      </div>
      <Bottom setS={setSgrid} setC={setCgrid} setL={setLgrid}>{`{max-width:900px} matches: ${maxW}`}</Bottom>

      </div>
      {/* <img src={swapLogo} id="backdrop-logo" alt="Logo" style={{position:"absolute", width:"30%", zIndex:"-2", bottom:0, left:"-5%"}}/> */}
       <div className="footer" style={{bottom:"0" , width:"100%",position:"relative", marginTop:"20px", padding:"2% 2% 0% 2%"}}>
         <div className="footer-content" style={{display:"grid", height:"100%", gridTemplateColumns:"1fr 1fr", backgroundColor:"#F7F7F8", borderTopLeftRadius:"16px", borderTopRightRadius:"16px", padding:"2%"}}>
            <p>BetterSwap</p>
            <p>This is the best swap to have ever existed guys</p>

          </div>
        
       </div>
        
    </>
    );
};

export default App;

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

const App = () => {
 const maxW = useMediaQuery(
   '(max-width:900 px)'
 )  

 const[visible,setVisible] = useState("Swap");
  useEffect(async()=>{
      await getFactoryContract()
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
        <SearchToken update={updatepoolInfo}/>
        {visible==="Swap" && <Swap pooli ={pool}/>}
        {visible==="History" && <div style={{backgroundColor:"black", borderRadius:"20px", padding:"4%"}}>
            <History/>
          </div>}
        {visible=="Liquidity" && <Liquidity/>}
      </div>
      <div className="main-content-PC">
        <SearchToken update={updatepoolInfo}/>
        <div className ="chart-swap">
          <div className="chart"></div>
          <Swap pooli ={pool}/>
        </div>
        <div className="hist">
          <div style={{backgroundColor:"black", borderRadius:"20px", padding:"4%"}}>
            <History/>
          </div>
          <Liquidity/>
        </div>
      </div>
      <Bottom setVisible={setVisible}>{`{max-width:900px} matches: ${maxW}`}</Bottom>

      </div>
       
        
    </>
    );
};

export default App;

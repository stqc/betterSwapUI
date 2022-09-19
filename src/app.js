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

 const[Sgrid,setSgrid] = useState("grid");
 const[Cgrid,setCgrid] =useState('none');
 const[Lgrid,setLgrid] =useState('none');
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
        <SearchToken update={updatepoolInfo} />
        <div style={{display:Sgrid}}><Swap pooli ={pool}/></div>
          <div className="chart" id="chrt-m" style={{display:Cgrid}}> </div>
          <div  style={{display:Lgrid}}><Liquidity/></div>
      </div>
      <div className="main-content-PC">
        <SearchToken update={updatepoolInfo}/>
        <div className ="chart-swap">
          <div className="chart" id="chrt">
            
          </div>
          <Swap pooli ={pool}/>
        </div>
        <div className="hist">
          <Liquidity/>
        </div>
      </div>
      <Bottom setS={setSgrid} setC={setCgrid} setL={setLgrid}>{`{max-width:900px} matches: ${maxW}`}</Bottom>

      </div>
       
        
    </>
    );
};

export default App;

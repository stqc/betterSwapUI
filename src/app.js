import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Navbar from "./components/navBar";
import Particles from "./components/Particles";
import Bottom from "./components/bottomnva";
import './components/Css/app.css';
import { useMediaQuery } from "@mui/material";
import Swap from './components/Swap';
import History from './components/History';
import {SearchToken} from './components/search';
import Liquidity from "./components/liquidity";
import { getConnectedAccount, getFactoryContract, getFactory,getPoolInfo} from "./components/connection";

const App = () => {
 const maxW = useMediaQuery(
   '(max-width:900 px)'
 )  

 const[visible,setVisible] = useState("Swap");
  useEffect(async()=>{
     await getFactoryContract();
     var fact = await getFactory();
     console.log(fact._address);
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
      
      <div className="main-content">
        <SearchToken update={updatepoolInfo}/>
        {visible==="Swap" && <Swap pooli ={pool}/>}
        {visible==="History" && <History/>}
        {visible=="Liquidity" && <Liquidity/>}
      </div>
      <div className="main-content-PC">
        <SearchToken/>
        <div className ="chart-swap">
          <div className="chart"></div>
          <Swap/>
        </div>
        <div className="hist">
          <History/>
        </div>
      </div>
      <Bottom setVisible={setVisible}>{`{max-width:900px} matches: ${maxW}`}</Bottom>

      
       
        
    </>
    );
};

export default App;

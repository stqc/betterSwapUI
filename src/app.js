import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Navbar from "./components/navBar";
import Particles from "./components/Particles";
import Bottom from "./components/bottomnva";
import './components/Css/app.css';
import { useMediaQuery } from "@mui/material";
import Swap from './components/Swap';
import History from './components/History';
import SearchToken from './components/search';
import Liquidity from "./components/liquidity";

const App = () => {
 const maxW = useMediaQuery(
   '(max-width:900 px)'
 )  

 const[visible,setVisible] = useState("Swap");

  return (
    <>
    
      <Navbar/>
      
      <div className="main-content">
        <SearchToken/>
        {visible==="Swap" && <Swap/>}
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

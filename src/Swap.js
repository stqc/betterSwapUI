import React, { useDebugValue } from "react";
import './Swap.css';
import { Button } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/system";
import { useState,useEffect } from "react";
import DenseTable from "./InfoTable";
import {approveTX, USDAddress,tokenAD,buyToken, sellToken,getbal,getTokenBal,connectedAccount} from "./connection.js";


const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    pink: {
      main: 'white',
      darker: 'white',
    }
   
}}
);

export default function Swap(props){

    const usBal = getbal();
    const te=getTokenBal();
    const [selected,changeSelected] =useState('Buy Token')
    const [labelContent,changeLabel] =useState("Enter USD Amount");
    const [bal,setBal] =useState("USD");
    const [currentBal,changeCurrentBal] = useState(0);
    const amountRef = React.createRef();
 
    React.useEffect(async ()=>{
        selected==='Buy Token'?changeCurrentBal(usBal):changeCurrentBal(te);
    },[usBal,te]);
    return(
        <div className="swap-content">
            <div className="token-trade-selector">
                <Button variant="contained" onClick={()=>{changeSelected("Buy Token"),changeLabel('Enter USD Amount'); setBal('USD'); changeCurrentBal(usBal); }}style={{backgroundColor:"green"}}>Buy</Button>
                <Button variant="contained" onClick={()=>{changeSelected("Sell Token"),changeLabel('Enter Token Amount'); setBal("Token"); changeCurrentBal(te); }}style={{backgroundColor:"#800000"}}>Sell</Button>

            </div>
            <ThemeProvider theme={theme}>
                <div className="token-trade">
                    <DenseTable ref={DenseTable=>{window.infoTable=DenseTable}} style={{backgroundColor:"transparent"}} poolInfo={props.pooli}/>
                    <div className="inp">
                        <input type="number" min={1} placeholder={labelContent} ref={amountRef} style={{color:"white", background:"transparent", border:"0px solid ", padding:"1%", width:"100%"}}/>
                        <p style={{fontSize:"small"}}>{bal} Balance: {currentBal}</p>
                    </div>
                    
                    {(selected=='Buy Token' && <button variant="contained" id="execute" onClick={async()=>{var x= await approveTX(USDAddress,amountRef.current.value);
                                x.length>1?props.alerts(x[0]):props.alerts("Transaction Successfull\n TxHash: "+x[0].slice(0,15)+"...")}} >Approve</button>)}
                    {(selected=='Buy Token' && <button variant="contained" id="executeS" onClick={async()=>{var x= await buyToken(amountRef.current.value)
                    x.length>1?props.alerts(x[0]):props.alerts("Transaction Successfull\n TxHash: "+x[0].slice(0,15)+"...")}}>{selected}</button>)}
                    {(selected!='Buy Token' && <button variant="contained" id="execute" onClick={async()=>{var x= await approveTX(tokenAD,amountRef.current.value)
                        x.length>1?props.alerts(x[0]):props.alerts("Transaction Successfull\n TxHash: "+x[0].slice(0,15)+"...")}} >Approve</button>)}
                    {(selected!='Buy Token' && <button variant="contained" id="executeS" onClick={async()=>{var x= await sellToken(amountRef.current.value)
                        x.length>1?props.alerts(x[0]):props.alerts("Transaction Successfull\n TxHash: "+x[0].slice(0,15)+"...")}}>{selected}</button>)}
                </div>
            </ThemeProvider>
        </div>
    );

}
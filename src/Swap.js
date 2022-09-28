import React from "react";
import './Swap.css';
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/system";
import { useState,useEffect } from "react";
import DenseTable from "./InfoTable";
import {approveTX, USDAddress,tokenAD,buyToken, sellToken} from "./connection.js";


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
    
    const [selected,changeSelected] =useState('Buy Token')
    const [labelContent,changeLabel] =useState("Enter USD Amount");
    const amountRef = React.createRef();

    
    return(
        <div className="swap-content">
            <div className="token-trade-selector">
                <Button variant="contained" onClick={()=>{changeSelected("Buy Token"),changeLabel('Enter USD Amount')}}style={{backgroundColor:"green"}}>Buy</Button>
                <Button variant="contained" onClick={()=>{changeSelected("Sell Token"),changeLabel('Enter Token Amount')}}style={{backgroundColor:"#800000"}}>Sell</Button>

            </div>
            <ThemeProvider theme={theme}>
                <div className="token-trade">
                    <DenseTable style={{backgroundColor:"transparent"}} poolInfo={props.pooli}/>
                    <input type="number" placeholder={labelContent} ref={amountRef} style={{color:"white", background:"transparent", border:"1px solid white"}}/>
                    {(selected=='Buy Token' && <button variant="contained" id="execute" onClick={()=>{approveTX(USDAddress,amountRef.current.value)}} >Approve</button>)}
                    {(selected=='Buy Token' && <button variant="contained" id="execute" onClick={()=>{buyToken(amountRef.current.value)}}>{selected}</button>)}
                    {(selected!='Buy Token' && <button variant="contained" id="execute" onClick={()=>{approveTX(tokenAD,amountRef.current.value)}} >Approve</button>)}
                    {(selected!='Buy Token' && <button variant="contained" id="execute" onClick={()=>{sellToken(amountRef.current.value)}}>{selected}</button>)}
                </div>
            </ThemeProvider>
        </div>
    );

}
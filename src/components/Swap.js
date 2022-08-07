import React from "react";
import './Css/Swap.css';
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/system";
import { useState,useEffect } from "react";
import DenseTable from "./InfoTable";

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    pink: {
      main: '#816797',
      darker: '#8167973d',
    }
   
}}
);

export default function Swap(props){
    const [selected,changeSelected] =useState('Buy Token')
    const [labelContent,changeLabel] =useState("Enter USD Amount");

    return(
        <div className="swap-content">
            <div className="token-trade-selector">
                <Button variant="contained" onClick={()=>{changeSelected("Buy Token"),changeLabel('Enter USD Amount')}}style={{backgroundColor:"green"}}>Buy</Button>
                <Button variant="contained" onClick={()=>{changeSelected("Sell Token"),changeLabel('Enter Token Amount')}}style={{backgroundColor:"#800000"}}>Sell</Button>

            </div>
            <ThemeProvider theme={theme}>
                <div className="token-trade">
                    <DenseTable style={{backgroundColor:"#8167973d"}}/>
                    <TextField id="filled-basic" color={"pink"}label={labelContent} variant="filled" />
                    <Button variant="contained" id="execute" >{selected}</Button>
                </div>
            </ThemeProvider>
        </div>
    );

}
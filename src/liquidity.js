import React from "react";
import './Swap.css';
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/system";
import { useState,useEffect } from "react";
import DenseTable from "./InfoTable";
import { addLiquidity,requestLiquidityRemoval } from "./connection";

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

export default function Liquidity(props){
    const [selected,changeSelected] =useState('Add Liquidity')
    var USDAmt = React.createRef();
    var TokenAmt = React.createRef();
    return(
        <div className="swap-content">
            <div className="token-trade-selector">
                <Button variant="contained" onClick={()=>{changeSelected("Add Liquidity")}}style={{backgroundColor:"green"}}>Add Liquidity</Button>
                <Button variant="contained" onClick={()=>{changeSelected("Remove Liquidity")}}style={{backgroundColor:"#800000"}}>Remove Liquidity</Button>

            </div>
            <ThemeProvider theme={theme}>
                <div className="token-trade">
                    <DenseTable style={{backgroundColor:"#8167973d"}}/>
                    { selected=="Add Liquidity" && <TextField id="filled-basic" color={"pink"}label={"Enter USD Amount"} variant="filled" inputRef={USDAmt} /> }
                    { selected=="Add Liquidity" && <TextField id="filled-basic" color={"pink"}label={"Enter Token Amount"} variant="filled" inputRef={TokenAmt}/> }
                    <Button variant="contained" id="execute" 
                        onClick={()=>{
                            if(selected=="Add Liquidity"){
                                addLiquidity(USDAmt.current.value,TokenAmt.current.value);
                            }else{
                                requestLiquidityRemoval();
                            }
                        }}
                    >{selected}</Button>
                </div>
            </ThemeProvider>
        </div>
    );

}
import React from "react";
import './Swap.css';
import { Button } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/system";
import { useState,useEffect } from "react";
import DenseTable from "./InfoTable";
import { addLiquidity,requestLiquidityRemoval,approveTX,USDAddress,tokenAD } from "./connection";

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
            {props.pooli.buyTax!=null && <div className="token-trade-selector">
                <Button variant="contained" onClick={()=>{changeSelected("Add Liquidity")}}style={{backgroundColor:"green"}}>Add Liquidity</Button>
                <Button variant="contained" onClick={()=>{changeSelected("Remove Liquidity")}}style={{backgroundColor:"#800000"}}>Remove Liquidity</Button>

            </div>}
            {props.pooli.buyTax!=null &&<ThemeProvider theme={theme}>
                <div className="token-trade">
                    <DenseTable style={{backgroundColor:"transparent"}} poolInfo={props.pooli}/> 
                    {selected =="Add Liquidity" &&<div className="inp" style={{padding:"2%", marginTop:"10%"}}>
                        <input type="number" 
                        onChange={()=>{
                            TokenAmt.current.value=props.pooli.token2USD*USDAmt.current.value;
                        }}
                        min={1} placeholder={"Enter USD"}  ref={USDAmt} style={{color:"white", background:"transparent", border:"0px solid ", padding:"1%", width:"100%"}}/> 
                        <input type="number" min={1} placeholder={"Token Amount"} ref={TokenAmt} style={{color:"white", background:"transparent", border:"0px solid ", padding:"1%", width:"100%",marginTop:"1%"}}/>
                    <button variant="contained" id="execute" onClick={async()=>{var x= await approveTX(USDAddress,USDAmt.current.value)}} >Approve USD</button>
                    <button variant="contained" id="execute" onClick={async()=>{var x= await approveTX(tokenAD,amountRef.current.value)}} >Approve Token</button>

                    </div>}
                    
                    <button variant="contained" id="execute" 
                        onClick={()=>{
                            if(selected=="Add Liquidity"){
                                addLiquidity(USDAmt.current.value,TokenAmt.current.value);
                            }else{
                                requestLiquidityRemoval();
                            }
                        }}
                    >{selected}</button>
                </div>
                
            </ThemeProvider>}
            {props.pooli.buyTax==null &&
                                <button variant="contained" id="execute" onClick={async()=>{var x= await approveTX(USDAddress,USDAmt.current.value)}} >Create Pool</button>
                            }
        </div>
    );

}
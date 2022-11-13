import React from "react";
import './Swap.css';
import { Button } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/system";
import { useState,useEffect } from "react";
import DenseTable from "./InfoTable";
import { addLiquidity,requestLiquidityRemoval,approveTX,USDAddress,tokenAD,createPool } from "./connection";

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
    var buyTx = React.createRef();
    var saleTx = React.createRef();
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
                    <button variant="contained" id="execute" onClick={async()=>{var x= await approveTX(USDAddress,USDAmt.current.value); x.length>1?props.showA(x[0]):props.showA("Transaction Successfull\n TxHash: "+x[0].slice(0,15)+"...")}}>Approve USD</button>
                    <button variant="contained" id="execute" onClick={async()=>{var x= await approveTX(tokenAD,TokenAmt.current.value); x.length>1?props.showA(x[0]):props.showA("Transaction Successfull\n TxHash: "+x[0].slice(0,15)+"...")}} >Approve Token</button>

                    </div>}
                    
                    <button variant="contained" id="execute" 
                        onClick={()=>{
                            if(selected=="Add Liquidity"){
                                var x=addLiquidity(USDAmt.current.value,TokenAmt.current.value);
                                x.length>1?props.showA(x[0]): props.showA("Transaction Successfull\n TxHash: "+x[0].slice(0,15)+"...")
                            }else{
                                var x= requestLiquidityRemoval();
                                x.length>1?props.showA(x[0]):props.showA("Transaction Successfull\n TxHash: "+x[0].slice(0,15)+"...")
                            }
                        }}
                    >{selected}</button>
                </div>
                
            </ThemeProvider>}
            {props.pooli.buyTax==null &&
            <div style={{border:"1px solid white", borderRadius:"16px", padding:"1%"}}>
                                <input type="number" min={1} placeholder={"Buy Tax "} ref={buyTx} style={{color:"white", background:"transparent", border:"0px solid ", padding:"1%", width:"100%",marginTop:"1%"}}/>
                                <input type="number" min={1} placeholder={"Sell Tax"} ref={saleTx} style={{color:"white", background:"transparent", border:"0px solid ", padding:"1%", width:"100%",marginTop:"1%"}}/>
                                <button variant="contained" id="execute"onClick={async()=>{var x= await createPool(buyTx.current.value,saleTx.current.value)}} >Create Pool</button>
                                </div>
                            }
        </div>
    );

}
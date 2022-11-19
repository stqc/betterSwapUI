import React from "react";
import './Swap.css';

import { approveUSD, createToken } from "./connection";

export default function CreateToken(props){

    var selectedValue=React.createRef();
    var name,symbol,supply,buyt,sellt,lpt ;
    name=React.createRef();symbol=React.createRef();supply=React.createRef();buyt=React.createRef();sellt= React.createRef();lpt = React.createRef();
    return (
    <div className="create-content">
        <h1 style={{color:"white"}}>BetterSwap Token Generator </h1>
        <select name="token" id='token-type' ref={selectedValue} style={{color:"white", background:"transparent", border:"1px solid white", borderRadius:"15px",padding:"1%", width:"100%",marginTop:"1%"}}>
            <option>Choose your token type</option>
            <option value="simple">Simple BetterSwap Token</option>
            <option value="lp">BetterSwap Token with AutoLiquidity</option>
        </select>
       
            <div className="form-content">
                <input style={{color:"white", background:"transparent", border:"1px solid white", borderRadius:"15px",padding:"1%", width:"100%",marginTop:"1%"}} placeholder="Enter Token Name" ref={name}></input>
                <input style={{color:"white", background:"transparent", border:"1px solid white",  borderRadius:"15px",padding:"1%", width:"100%",marginTop:"1%"}} placeholder="Enter Token Symbol" ref={symbol}></input>
                <input style={{color:"white", background:"transparent", border:"1px solid white",  borderRadius:"15px",padding:"1%", width:"100%",marginTop:"1%"}} placeholder="Enter Token Supply" ref={supply}></input>
                <input style={{color:"white", background:"transparent", border:"1px solid white",  borderRadius:"15px",padding:"1%", width:"100%",marginTop:"1%"}}placeholder="Enter Tax on the Buy (Including Liqudity Tax if any)" ref={buyt}></input>
                <input style={{color:"white", background:"transparent", border:"1px solid white",  borderRadius:"15px",padding:"1%", width:"100%",marginTop:"1%"}} placeholder="Enter Tax on the Sells (Including Liquidity Tax if any)" ref={sellt}></input>
                <input style={{color:"white", background:"transparent", border:"1px solid white", borderRadius:"15px", padding:"1%", width:"100%",marginTop:"1%"}} placeholder="Enter Liqudity Tax % (type 0 incase of Simple BetterSwap Token)" ref={lpt}></input>
            </div>
            <button id="execute" style={{margin:"2% 10%"}}  onClick={async()=>{var x= await approveUSD((200*1e18).toPrecision(21)); x.length>1?props.showA(x[0]):props.showA("Transaction Successfull\n TxHash: "+x[0].slice(0,15)+"...");}}>Approve USD</button>
            <button id="execute" style={{margin:"2% 10%"}} onClick={async()=>{var x= await createToken(name.current.value,symbol.current.value,supply.current.value,buyt.current.value,sellt.current.value,lpt.current.value); x.length>1?props.showA(x[0]):props.showA("Transaction Successfull\n TxHash: "+x[0].slice(0,15)+"...");}}>Create Token</button>
    </div>
    )
}
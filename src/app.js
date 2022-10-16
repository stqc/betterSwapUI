import React, { useEffect, useState } from "react";
import Navbar from "./navBar";
import Bottom from "./bottomnva";
import './app.css';
import { useMediaQuery } from "@mui/material";
import Swap from './Swap';
import {SearchToken} from './search';
import Liquidity from "./liquidity";
import {buildChart, getFactoryContract,getPoolInfo} from "./connection.js";
import swapLogo from './Xgczj6_2_.svg';
import { changeFrame,changeFrameM } from "./connection.js";

const App = () => {
 const maxW = useMediaQuery(
   '(max-width:900 px)'
 )  

 const[Sgrid,setSgrid] = useState("grid");
 const[Cgrid,setCgrid] =useState('none');
 const[Lgrid,setLgrid] =useState('none');
 const[clsName,changeClassName] = useState('unselected');
 const[clsNameH,changeClassNameH] = useState('unselected');
 const[clsNameD,changeClassNameD] = useState('selected');
 const[c,cc]=useState(false);
 const [alertVisible,setAlertVisibility] =useState('Alert');
 const [alertText, setAlertText] =useState('');
 const [view,changeView] =useState('Trade');
  useEffect(async()=>{
      await getFactoryContract();

  },[]);
    
    const [pool,updatePool] = useState({Address:"",
      token2USD: "",
      USD2token: "null",
      buyTax: "null",
      saleTax: "null"})
    async function updatepoolInfo(){
      await updatePool(getPoolInfo());
    }
    async function cf (){
      cc(true);
    }
    async function showAlert(text){

      setAlertVisibility('Alert-enable');
      setAlertText(text);
      setTimeout(()=>{
        setAlertVisibility('Alert')
      },2000);

    }
  return (
    <>
    
      <Navbar ccc={cf} alert={showAlert} views={changeView}/>
      <div id="web3-found">
        <div className={alertVisible}>
          <h4 style={{fontWeight:"bold"}}>ALERT</h4>
          {alertText}
        </div>
      <div className="main-content">
        <SearchToken update={updatepoolInfo} style={{marginBottom:"4%"}} views={view}/>
        {view==='Manage Token' &&<div className="manage-token-m">
          <Liquidity pooli={pool} />
        </div>}
        {view==='Trade' && <><div style={{ display: Sgrid }}><Swap pooli={pool} alerts={showAlert} /></div><div className="chart-main" style={{ display: Cgrid }}>
          <div className="chart" id="chrt-m" style={{ display: Cgrid }}> </div>
            <div className="time-Selector-m">
              <div className={clsName} onClick={() => { changeFrameM("M"); changeClassName('selected'); changeClassNameH('unselected'); changeClassNameD('unselected'); } }>1M</div><div className={clsNameH} onClick={() => { changeFrameM("H"); changeClassName('unselected'); changeClassNameH('selected'); changeClassNameD('unselected'); } }>1H</div><div className={clsNameD} onClick={() => { changeFrameM("D"); changeClassName('unselected'); changeClassNameH('unselected'); changeClassNameD('selected'); } }>1D</div>
            </div>
          </div></>}
          
      </div>
        
      <div className="main-content-PC">
        <SearchToken update={updatepoolInfo} views={view}/>
        {view ==='Manage Token' && <div className="manage-token">
          <Liquidity pooli={pool}/>
          <div className="contract-interaction">

          </div>
        </div>}
        
        {view==='Trade' && <div className ="chart-swap">
          <div className="chart-main">
          
            <div className="chart" id="chrt">
              
            </div>
            <div className="time-Selector">
            <div className={clsName} onClick={()=>{changeFrame("M");  changeClassName('selected');changeClassNameH('unselected');changeClassNameD('unselected')}}>1M</div><div className={clsNameH} onClick={()=>{changeFrame("H");changeClassName('unselected');changeClassNameH('selected');changeClassNameD('unselected')}}>1H</div><div className={clsNameD} onClick={()=>{changeFrame("D");  changeClassName('unselected');changeClassNameH('unselected');changeClassNameD('selected')}}>1D</div>
            </div>
          </div>
          <Swap pooli ={pool} alerts={showAlert}/>
        </div>}
      </div>
      {view==='Trade' &&<Bottom setS={setSgrid} setC={setCgrid} setL={setLgrid}>{`{max-width:900px} matches: ${maxW}`}</Bottom>}

      </div>
       <div className="footer" style={{bottom:"0" , width:"100%",position:"relative", marginTop:"20px", padding:"3% 2% 0% 2%"}}>
         <div className="footer-content" style={{display:"grid", height:"100%", gridTemplateColumns:"1fr 1fr", backgroundColor:"#F7F7F8", borderTopLeftRadius:"16px", borderTopRightRadius:"16px", padding:"2%"}}>
            <div style={{display:"flex", alignItems:"flex-start"}}><img src={swapLogo} style={{width:"50px"}}/><p style={{marginTop:"revert", marginRight:"1%", fontWeight:"500",fontFamily: 'Merriweather Sans'}}>BetterSwap</p></div>
            <div style={{display:"flex", flexDirection:"column"}}>
              <p>Socials</p>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr"}}>
                <p>Docs</p>
                <p>Twitter</p>
                <p>Discord</p>
              </div>
            </div>

          </div>
        
       </div>
        
    </>
    );
};

export default App;

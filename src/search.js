import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { createTheme } from '@mui/material/styles';
import "./search.css";
import { getPool } from "./connection.js";
import { createRef } from "react";
import { buildChart } from "./connection.js";
import {pool} from "./connection.js";

const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      pink: {
        main: 'black',
        darker: 'black',
      }
     
  }}
  );

function SearchToken(props){
    var newRef = createRef();
    const [pools,updatePool] = useState(null);
    return(
        <div className="token-search">
            <ThemeProvider theme={theme}>
                <input type="text" placeholder="Enter Token Address" style={{width:"100%", border:"1px solid #EEEFF2",  padding:"1%", backgroundColor:"#EEEFF2"} }ref={newRef}></input>

                <Button variant="contained" id="search-btn"
                onClick={
                  async()=>{
                    await updatePool(await getPool(newRef.current.value));
                    await props.update();
                    await buildChart();
                    
                  }
                }>Search</Button>
                
          </ThemeProvider>
        </div>
    );

}

export {SearchToken};
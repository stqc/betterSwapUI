import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { createTheme } from '@mui/material/styles';
import "./search.css";
import { getPool } from "./connection.js";
import { createRef } from "react";

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

function SearchToken(props){
    var newRef = createRef();
    const [pool,updatePool] = useState(null);
    return(
        <div className="token-search">
            <ThemeProvider theme={theme}>
                <TextField label="Enter Token address" variant="filled" color="pink" inputRef={newRef}/>

                <Button variant="contained" id="search-btn"
                onClick={
                  async()=>{
                    updatePool(await getPool(newRef.current.value));
                    props.update();
                  }
                }>Search</Button>
          </ThemeProvider>
        </div>
    );

}

export {SearchToken};
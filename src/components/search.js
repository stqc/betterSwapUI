import React from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { createTheme } from '@mui/material/styles';
import "./Css/search.css";

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

function SearchToken(){

    return(
        <div className="token-search">
            <ThemeProvider theme={theme}>
                <TextField label="Enter Token address" variant="filled" color="pink"/>
                <Button variant="contained" id="search-btn">Search</Button>
          </ThemeProvider>
        </div>
    );

}

export default SearchToken;
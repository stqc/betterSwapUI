import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import BarChartIcon from '@mui/icons-material/BarChart';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import HistoryIcon from '@mui/icons-material/History';
import PaidIcon from '@mui/icons-material/Paid';
import './Css/bottom.css';

function FixedBottomNavigation(props) {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
    
  }, [value]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 ,}} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            console.log(value);
          }}
          style={{ backgroundColor:"black"}}
        >
          <BottomNavigationAction label="Swap" icon={<SwapHorizIcon />} onClick={()=>{props.setVisible("Swap"); }}/>
          <BottomNavigationAction label="Liquidity" icon={<PaidIcon />} onClick={()=>{props.setVisible("Liquidity"); }}/>
          <BottomNavigationAction label="Charts" icon={<BarChartIcon />} onClick={()=>{props.setVisible("Charts"); }}/>
          <BottomNavigationAction label="History" icon={<HistoryIcon />} onClick={()=>{props.setVisible("History"); }}/>
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default FixedBottomNavigation
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Swap.css';

function createData(name, usd, action) {
  return { name,usd,action };
}

const rows = [
  createData( 'Tokens' ,'USD','Buy/Sell'),
  createData('1000', '500','Buy'),
  createData('1000', '500','Buy'),
  createData('1000', '500','Buy'),
  createData('1000', '500','Sell'),
  createData('1000', '500','Buy'),
  createData('1000', '500','Sell'),
  createData('1000', '500','Buy'),
  createData('1000', '500','Buy'),
  createData('1000', '500','Buy'),
  createData('1000', '500','Sell'),
  createData('1000', '500','Buy'),
  createData('1000', '500','Buy'),
  createData('1000', '500','Buy'),
  createData('1000', '500','Buy'),
  createData('1000', '500','Sell'),
  createData('1000', '500','Buy'),
  createData('1000', '500','Buy'),
  createData('1000', '500','Buy'),
  createData('1000', '500','Sell'),
  createData('1000', '500','Buy'),
  createData('1000', '500','Buy'),
  createData('1000', '500','Buy'),
  createData('1000', '500','Sell'),
  createData('1000', '500','Buy'),
];

export default function History() {
  return (
    
    <TableContainer component={Paper} id="trade-history" style={{height:"425px" ,borderRadius:"20px"}}>
      <Table sx={{ maxWidth: "100%" }} size="small" aria-label="Token-Information" id="Token-Information">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name+Date.now()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell component="th" scope="row" sx={{color:"#816797", fontWeight:"bold", borderBottom:"black"}}>
                {row.name}
              </TableCell>
              <TableCell align="right" sx={{color:"#816797", wordBreak:"break-word", fontWeight:"bold",  borderBottom:"black"}} >{row.usd}</TableCell>
              <TableCell align="right" sx={{color:"#816797", wordBreak:"break-word", fontWeight:"bold",  borderBottom:"black"}} >{row.action}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
}

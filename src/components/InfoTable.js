import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Token Name', 'Bitcoin' ),
  createData('Address', '0x0000000000000000000000000'),
  createData('Total Supply', 1000000),
  createData('Tokens/USD', 305),
  createData('USD/Token', 1),
  createData('Buy Tax',5),
  createData('Sell Tax',5)
];

export default function DenseTable() {
  return (

    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: "100%" }} size="small" aria-label="Token-Information" id="Token-Information">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell component="th" scope="row" sx={{color:"#816797", fontWeight:"bold", borderBottom:"black"}}>
                {row.name}
              </TableCell>
              <TableCell align="right" sx={{color:"#816797", wordBreak:"break-word", fontWeight:"bold",  borderBottom:"black"}} >{row.calories}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
}

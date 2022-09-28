import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getPoolInfo } from './connection.js';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



export default function DenseTable(props) {
  const data =getPoolInfo();
  
  React.useEffect( async ()=>{
    changeRows([createData('Token Name', data.name ),
    createData('Pool Address', data.Address),
    createData('Total Supply', data.supply),
    createData('Tokens/USD', data.token2USD),
    createData('USD/Token', data.USD2token),
    createData('Buy Tax',data.buyTax),
    createData('Sell Tax',data.saleTax)]);
    console.log(data);
  },[data]);
  
  const [rows,changeRows] = React.useState( [
    createData('Token Name', 'Bitcoin' ),
    createData('Pool Address', data.Address),
    createData('Total Supply', ''),
    createData('Tokens/USD', data.token2USD),
    createData('USD/Token', data.USD2token),
    createData('Buy Tax',data.buyTax),
    createData('Sell Tax',data.saleTax)
  ]);
  return (


    // <TableContainer component={Paper}>
    //   <Table sx={{ maxWidth: "100%" }} size="small" aria-label="Token-Information" id="Token-Information">
    //     <TableBody>
    //       {rows.map((row) => (
    //         <TableRow
    //           key={row.name}
    //           sx={{ '&:last-child td, &:last-child th': { border: 0 },
    //           }}
    //         >
    //           <TableCell component="th" scope="row" sx={{color:"white", fontWeight:"bold", borderBottom:"black"}}>
    //             {row.name}
    //           </TableCell>
    //           <TableCell align="right" sx={{color:"white", wordBreak:"break-word", fontWeight:"bold",  borderBottom:"black"}} >{row.calories}</TableCell>
              
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>

    
    <div className='info' style={{display:"grid",gridTemplateColumns:"1fr 1fr", color:"white", overflow:"hidden", height:"fit-content"}}>
      {rows.map((row)=>(
        <>
          <div className='info-h'  style={{margin:"2%"}} key={row.name}>{row.name}</div>
          <div className='info-a' style={{margin:"2%"}} key={row.name}>{row.calories}</div>
        </>
      ))}
    </div>

  );
}

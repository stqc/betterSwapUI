import * as React from 'react';
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

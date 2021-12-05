import React from "react";
import TableCell from "./tableCell";

const TableRow = ({ mas, index, setMas,table}) => {
  let array = mas;
  const setElement = (i,el) =>{
    array[i]=el;
    setMas(array,index);
  }
  return (
    <div
      className="table__row"
      style={{ gridTemplateColumns: `repeat(${1 + mas.length}, 1fr)` }}
    >
      <div className="table__cell">{index}</div>
      {mas.map((el,i) => (
        <TableCell table={table} item={el} index={i} setItem={setElement}/>
      ))}
    </div>
  );
};

export default TableRow;

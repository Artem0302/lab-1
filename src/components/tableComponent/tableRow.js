import React from "react";
import TableCell from "./tableCell";

const TableRow = ({ mas, index }) => {
  return (
    <div
      className="table__row"
      style={{ gridTemplateColumns: `repeat(${1 + mas.length}, 1fr)` }}
    >
      <div className="table__cell">{index}</div>
      {mas.map((el) => (
        <TableCell item={el} />
      ))}
    </div>
  );
};

export default TableRow;

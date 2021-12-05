import React from "react";

const TableHeader = () => {
  const mas = ["A","B"];
  return (
    <div
      className="table__row table__row--header"
      style={{ gridTemplateColumns: `repeat(${1 + mas.length}, 1fr)` }}
    >
      <div className="table__cell" style={{ width: "200px" }}></div>
      {mas.map((el) => (
        <div className="table__cell">{el}</div>
      ))}
    </div>
  );
};

export default TableHeader;

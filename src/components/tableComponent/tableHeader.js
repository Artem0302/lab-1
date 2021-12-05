import React from "react";

const TableHeader = ({columns}) => {
  const arr_EN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  return (
    <div
      className="table__row table__row--header"
      style={{ gridTemplateColumns: `repeat(${1 + columns}, 1fr)` }}
    >
      <div className="table__cell" style={{width: "200px"}}/>
      {arr_EN.map((el,i) => {
        if(i+1<=columns){
          return (
              <div className="table__cell">{el}</div>
          )
        }
      })}
    </div>
  );
};

export default TableHeader;

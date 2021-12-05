import React from "react";
import TableHeader from "./tableHeader";
import TableRow from "./tableRow";

const Table = () => {
  const starships = [
    ["",""],
    ["",""]
  ];
  return starships ? (
    <div className="table">
      <TableHeader />
      {starships.map((starship, i) => (
        <TableRow key={i} index={i} mas={starship} />
      ))}
    </div>
  ) : (
    <div>loading...</div>
  );
};

export default Table;

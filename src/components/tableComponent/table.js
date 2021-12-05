import React, { useLayoutEffect, useState } from "react";
import TableHeader from "./tableHeader";
import TableRow from "./tableRow";

function stringArray(length) {
  const arr = [];
  for (let i = 0; i < length; ++i) {
    arr.push("");
  }
  return arr;
}

const Table = ({ l, c, value, setValue }) => {
  const [columns, setColumns] = useState(l);
  const [lines, setLines] = useState(c);
  const [table, setTable] = useState(value);
  const [flag, setFlag] = useState(true);
  useLayoutEffect(() => {
    if(value !== table){
      setTable(value);
      setColumns(value.length);
      setLines(value[0].length);
    }
  }, [value]);
  useLayoutEffect(() => {
    if (c < columns) {
      let arr = new Array(table.length);
      for (let i = 0; i < table.length; i++) {
        arr[i] = new Array(table[i].length - 1);
        for (let j = 0; j < table[i].length; j++) {
          if (j !== table[i].length - 1) {
            arr[i][j] = table[i][j];
          }
        }
      }
      setTable(arr);
      setValue(arr);
      setColumns(columns - 1);
    } else {
      if (c !== 1) {
        const arr = table;
        for (let i = 0; i < arr.length; i++) {
          arr[i].push("");
        }
        setTable(arr);
        setValue(arr);
        setColumns(columns + 1);
      }
    }
  }, [c]);
  useLayoutEffect(() => {
    if (l < lines) {
      let arr = new Array(table.length - 1);
      for (let i = 0; i < table.length; i++) {
        if (i !== table.length - 1) {
          arr[i] = table[i];
        }
      }
      setTable(arr);
      setValue(arr);
      setLines(lines - 1);
    } else {
      if (l !== 1) {
        const arr = table;
        arr.push(stringArray(columns));
        setTable(arr);
        setValue(arr);
        setLines(lines + 1);
      }
    }
  }, [l]);
  const setMas = (mas, index) => {
    let array = table;
    array[index] = mas;
    setTable(array);
    setValue(array);
    setFlag(!flag);
  };
  return l && c ? (
    <div className="table">
      <TableHeader columns={columns} />
      {table.map((el, i) => {
        return (
          <TableRow table={table} setMas={setMas} key={i} index={i} mas={el} />
        );
      })}
    </div>
  ) : (
    <div>loading...</div>
  );
};

export default Table;

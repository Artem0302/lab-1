import React, { useEffect, useState } from "react";
import { validationText } from "../validationText";

const TableCell = ({ item, index, setItem, table }) => {
  const [state, setState] = useState(validationText(item, table, item));
  const [flag, setFlag] = useState(false);
  if (validationText(item, table, item) !== state && !flag) {
    setState(validationText(item, table, item));
  }
  useEffect(() => {
    if (flag) {
      setItem(index, state);
    }
  }, [state]);
  return (
    <div className="table__cell">
      <input
        style={{ padding: "0px" }}
        value={state}
        onFocus={() => {
          setFlag(true);
          setState(item);
        }}
        onBlur={() => {
          setFlag(false);
          setState(validationText(state, table, state));
        }}
        onChange={({ target }) => setState(target.value)}
        type="text"
      />
    </div>
  );
};

export default TableCell;

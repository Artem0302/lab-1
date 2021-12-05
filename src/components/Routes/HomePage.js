import React, { useState } from "react";
import Table from "../tableComponent/table";
import { useNavigate } from "react-router-dom";

const information =
  "Hello, there is some rules of using this progarm: \n" +
  "1) U can`t delete column or line(in the next update we will add this opportunity)\n" +
  "2) If u want to get value from a certain cell, the letter must come after the numbers \n" +
  "3) To save ur table, pls think of a name for the table and click the save button) \n" +
  "4) To get ur last(or not) table - click get table and then u should to select table(name of it)\n" +
  "5) DO NOT USE / !!! \n" +
  "   Thank u for using `Exel from Artem` !";

//создать подключение
const socket = new WebSocket("ws://localhost:8081");

socket.onopen = (e) => {
  console.log("соединение установлено");
};

const HomePage = () => {
  const [columns, addColumn] = useState(1);
  const [lines, setLines] = useState(1);
  const [value, setValue] = useState([[""]]);
  const navigate = useNavigate();
  socket.onmessage = function (event) {
    let data = event.data;
    try{
      data = JSON.parse(data);
      setValue(data.arr);
      console.log(value)
      addColumn(value[0].length);
      setLines(value.length);
    }catch(error){
      alert(data);
    }
  };
  return (
    <div
      style={{
        textAlign: "center",
        padding: "15px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "40px",
        }}
      >
        <button
          style={{ margin: "15px", width: "120px", height: "40px" }}
          onClick={() => {
            alert(information);
          }}
        >
          Info
        </button>
        <button
          style={{ margin: "15px", width: "120px", height: "40px" }}
          onClick={() => {
            let result = prompt("Enter the name of this table:", "");
            const data = JSON.stringify({
              name: result,
              table: value,
            });
            console.log(data, "wot");
            socket.send(data);
          }}
        >
          Save Table
        </button>
        <button
          style={{ margin: "15px", width: "120px", height: "40px" }}
          onClick={() => navigate("/gettingTable")}
        >
          Get table
        </button>
      </div>
      <div>
        <Table l={lines} c={columns} value={value} setValue={setValue} />
      </div>
      <div style={{ margin: "40px" }}>
        <button
          style={{ margin: "15px", width: "120px", height: "40px" }}
          onClick={() => {
            setLines(lines + 1);
          }}
        >
          Add line
        </button>
        <button
          style={{ margin: "15px", width: "120px", height: "40px" }}
          onClick={() => {
            addColumn(columns + 1);
          }}
        >
          Add column
        </button>
      </div>
      <div style={{ margin: "40px" }}>
        <button
          style={{ margin: "15px", width: "120px", height: "40px" }}
          onClick={() => {
            setLines(lines !== 1 ? lines - 1 : lines);
          }}
        >
          Delete line
        </button>
        <button
          style={{ margin: "15px", width: "120px", height: "40px" }}
          onClick={() => {
            addColumn(columns !== 1 ? columns - 1 : columns);
          }}
        >
          Delete column
        </button>
      </div>
    </div>
  );
};

export default HomePage;

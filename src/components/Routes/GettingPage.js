import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const information =
  "Hello, there is some rules of using this progarm: \n" +
  "1) U can`t delete column or line(in the next update we will add this opportunity)\n" +
  "2) If u want to get value from a certain cell, the letter must come after the numbers \n" +
  "3) To save ur table, pls think of a name for the table and click the save button) \n" +
  "4) To get ur last(or not) table - click get table and then u should to select table(name of it)\n" +
  "   Thank u for using `Exel from Artem` !";

const socket = new WebSocket("ws://localhost:8081");

socket.onopen = (e) => {
  console.log("соединение установлено");
};

const GettingPage = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  socket.onmessage = function (event) {
    const data = JSON.parse(event.data);
    if (data.files) {
      setFiles(data.files);
    }
  };
  return (
    <div style={{ display: "flex", flex: 1, justifyContent: "space-between" }}>
      <button
        style={{ margin: "95px", width: "100px", height: "30px" }}
        onClick={() => navigate("/")}
      >
        Back
      </button>
      <button
        style={{ margin: "95px", height: "30px" }}
        onClick={() => socket.send("get list of tables")}
      >
        Get list of tables
      </button>
      <div style={{ display: "grid", alignContent: "space-around" }}>
        {files.map((el) => {
          return (
            <button
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/");
                socket.send(el);
              }}
            >
              {el}
            </button>
          );
        })}
      </div>
      <button
        style={{ margin: "95px", width: "100px", height: "30px" }}
        onClick={() => {
          alert(information);
        }}
      >
        Info
      </button>
    </div>
  );
};

export default GettingPage;

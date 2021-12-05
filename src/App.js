import React from "react";
import "./App.css";
import { Routes, Route} from "react-router-dom";
import GettingPage from "./components/Routes/GettingPage";
import HomePage from "./components/Routes/HomePage";

const App = () => {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="gettingTable" element={<GettingPage />} />
      </Routes>
  );
};

export default App;

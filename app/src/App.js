import React from "react";
import SocketProvider from "./components/SocketProvider/SocketProvider";
import Home from "./views/Home/Home";
import "./App.scss";

const App = () => {
  return (
    <SocketProvider>
      <Home />
    </SocketProvider>
  );
};

export default App;

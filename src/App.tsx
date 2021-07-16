import React from "react";
import "./App.css";
import { useAuthContext } from "./contexts/authorize";
import { MainFragment } from "./screens/main";
import { AuthorizeFragment } from "./screens/authorize";

function App() {
  const { user } = useAuthContext();
  console.log(user);
  return (
    /*user ?
      <MainFragment /> :
      <AuthorizeFragment />*/
    <MainFragment />
  );
}

export default App;

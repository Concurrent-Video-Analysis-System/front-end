import React from "react";
import "./App.css";
import { useAuthContext } from "./contexts/authorize";
import { MainFragment } from "./screens/main";

function App() {
  const { user } = useAuthContext();
  console.log(user);
  return (
    /*user ?
      <SurveillanceFragment /> :
      <AuthorizeFragment />*/
    <MainFragment />
  );
}

export default App;

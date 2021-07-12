import React from "react";
import "./App.css";
import { AuthorizeFragment } from "./screens/authorize";
import { useAuthContext } from "./contexts/authorize";
import { SurveillanceFragment } from "./screens/surveillance";

function App() {
  const { user } = useAuthContext();
  console.log(user);
  return (
    /*user ?
      <SurveillanceFragment /> :
      <AuthorizeFragment />*/
    <SurveillanceFragment />
  );
}

export default App;

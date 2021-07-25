import React from "react";
import "./App.css";
import { useAuthContext } from "./contexts/authorize";
import { MainFragment } from "./screens/main";
import { AuthorizeFragment } from "./screens/authorize";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./screens/authorize/route";

function App() {
  const { user } = useAuthContext();
  console.log(user);
  return user ? <MainFragment /> : <AuthorizeFragment />;
}

export default App;

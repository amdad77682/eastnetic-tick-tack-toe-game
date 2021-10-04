import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Squares from "../tic-tac/Squares";
export default function AppContainer() {
  return (
    <Switch>
      <Route key="tic-tac" path="/" component={Squares} />
    </Switch>
  );
}

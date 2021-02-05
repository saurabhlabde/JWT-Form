import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoadDataA } from "./state/Action";

const App = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const [Token, setToken] = useState(null);

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setToken(getToken);
      dispatch(LoadDataA(Token));
    }
    if (Token) {
      history.push("/");
    }
  }, [Token]);

  return (
    <>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/login"
          component={() => {
            return <Login history={history} />;
          }}
        />
        <Route
          exact
          path="/logout"
          component={() => {
            return <Logout />;
          }}
        />
        <Route
          path="/"
          component={() => {
            return <Home history={history} Token={Token} />;
          }}
        />
      </Switch>
    </>
  );
};

export default App;

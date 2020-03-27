import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./scenes/Login/Login";
import { UserContext } from "./services/context/UserContext";
import Home from "./scenes/Home/Home";
import { ThemeContext } from "./services/context/ThemeContext";
import Register from "./scenes/Register/Register";
import { getToken } from "./services/cookies/Session";
import { TokenContext } from "./services/context/TokenContext";

/**
 * Belong to index
 */
function App() {
  const [token, setToken] = useState<string | null>(getToken());

  const tokenContextValue = {
    token,
    setToken
  };

  const themes = {
    hightDark: "#23272a",
    mediumDark: "#2c2f33",
    lightDark: "#7d7d7d", //border
    white: "white",
    hightRed: "#f50057",
    darkRed: "#880e4f",
    blue: "#42a5f5"
  };

  return (
    <ThemeContext.Provider value={themes}>
      <TokenContext.Provider value={tokenContextValue}>
        <Switch>
          <Route
            exact
            path="/login"
            render={() => {
              if (!token) return <Login />;
              return <Redirect to="/home" />;
            }}
          />
          <Route
            path="/register"
            render={() => {
              if (!token) return <Register />;
              return <Redirect to="/home" />;
            }}
          />
          <Route
            path="/home"
            render={() => {
              if (token) return <Home />;
              return <Redirect to="/login" />;
            }}
          />
        </Switch>
      </TokenContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;

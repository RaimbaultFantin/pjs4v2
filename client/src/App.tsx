import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./scenes/Login/Login";
import { UserContext } from "./services/context/UserContext";
import Home from "./scenes/Home/Home";
import { ThemeContext } from "./services/context/ThemeContext";
import Register from "./scenes/Register/Register";
import { getSessionCookie } from "./services/cookies/Session";

export class User {
  public id: number;
  public email: string;
  public mdp: string;
  public isCoach: boolean;
  constructor(id: number, email: string, mdp: string, isCoach: boolean) {
    this.id = id;
    this.email = email;
    this.mdp = mdp;
    this.isCoach = isCoach;
  }
}

/**
 * Belong to index
 */
function App() {
  const [user, setUser] = useState<User | null>(getSessionCookie());

  const userContextValue = {
    user: user,
    setUser: setUser
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
      <UserContext.Provider value={userContextValue}>
        <Switch>
          <Route
            exact
            path="/login"
            render={() => {
              if (!user) return <Login />;
              return <Redirect to="/home" />;
            }}
          />
          <Route
            path="/register"
            render={() => {
              if (!user) return <Register />;
              return <Redirect to="/home" />;
            }}
          />
          <Route
            path="/home"
            render={() => {
              if (user) return <Home />;
              return <Redirect to="/login" />;
            }}
          />
        </Switch>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;

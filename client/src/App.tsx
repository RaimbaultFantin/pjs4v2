import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./scenes/Login/Login";
import { getSessionCookie } from "./services/context/UserContext";
import { UserContext } from "./services/context/UserContext";
import Home from "./scenes/Home/Home";
import { ThemeContext } from "./services/context/ThemeContext";
import Register from "./scenes/Register/Register";

export class User {
  public id: number;
  public email: string;
  public mdp: string;
  constructor(id: number, email: string, mdp: string) {
    this.id = id;
    this.email = email;
    this.mdp = mdp;
  }
}

/**
 * Belong to index
 */
function App() {
  const [bdd] = useState<Array<User>>([new User(1, "fantin", "123")]);

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

  const bddContains = (email: string, mdp: string): User | string => {
    for (let i = 0; i < bdd.length; i++) {
      if (bdd[i].email === email) {
        if (bdd[i].mdp === mdp) {
          return bdd[i];
        } else {
          // eslint-disable-next-line no-throw-literal
          throw {
            name: "WrongPassword",
            message: "Wrong password"
          };
        }
      }
    }
    // eslint-disable-next-line no-throw-literal
    throw {
      name: "WrongEmail",
      message: "Wrong Email adress"
    };
  };

  /** Exemple Test Route with our nodeJS Api */
  useEffect(() => {
    async function getTest() {
      let data = await fetch("/test")
        .then(res => res.json())
        .catch(err => console.log(err));
      console.log(data);
    }
    getTest();
  });

  return (
    <ThemeContext.Provider value={themes}>
      <UserContext.Provider value={userContextValue}>
        <Switch>
          <Route
            exact
            path="/login"
            render={() => {
              if (!user) return <Login bddContains={bddContains} />;
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

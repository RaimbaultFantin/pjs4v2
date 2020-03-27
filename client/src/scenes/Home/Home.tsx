/* eslint-disable no-restricted-globals */
import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LeftBar from "./components/LeftBar";
import PersonnalDrawer, {
  TextPath
} from "../../components/LeftDrawer/LeftDrawer";
import RightBar from "./components/RightBar";
import { ThemeContext } from "../../services/context/ThemeContext";
import { HeightContext } from "../../services/context/HeightContext";
import { Route, useRouteMatch } from "react-router-dom";
import Welcome from "./components/Welcome";
import Team from "./components/Team/Team";
import CreateTeam from "./components/CreateTeam";
import JoinTeam from "./components/JoinTeam";
import { CurrentTitlePageContext } from "../../services/context/CurrentTitlePageContext";
import axios from "axios";
import { TokenContext } from "../../services/context/TokenContext";
import { User, UserContext } from "../../services/context/UserContext";

/**
 * Home belong to App
 */
export default function Home() {
  /** HEIGHTS */

  // state screen height
  const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);

  const updateHeight = () => {
    setScreenHeight(window.innerHeight);
  };

  const heights = {
    screenHeight: screenHeight,
    navbar: 64,
    bottomnav: 56
  };

  // Screen size
  useEffect(() => {
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  });
  /** END HEIGHTS */

  /** STYLE & THEMES */
  const themes = useContext(ThemeContext);

  const useStyles = makeStyles({
    leftSize: {
      background: themes.hightDark,
      borderRight: `1pt solid ${themes.lightDark}`
    },
    fullscreen: {
      height: screenHeight
    },
    middleSide: {
      background: themes.mediumDark
    },
    rightSide: {
      backgroundColor: themes.hightDark,
      borderLeft: `1pt solid ${themes.lightDark}`
    }
  });

  const classes = useStyles();
  /** END STYLE & THEMES */

  /** CURRENT TITLE PAGE */

  // state title current page
  const [title, setTitle] = useState<string>("Home");

  const currentTitlePage = {
    title,
    setTitle
  };
  /** END CURRENT TITLE PAGE */

  // token context
  const { token } = useContext(TokenContext);

  /** CURRENT USER */

  // state user logged
  const [user, setUser] = useState<User | null>(null);

  const currentUser = {
    user,
    setUser
  };

  // get user logged
  const getUser = async () => {
    try {
      const response = await axios.get("/user/get", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { mail, prenom, nom } = response.data;
      setUser(new User(mail, prenom, nom));
    } catch (e) {
      console.log(e);
    }
  };
  /** END CURRENT USER */

  const [teams, setTeams] = useState<Array<TextPath>>([]);
  // get teams
  const getTeams = async () => {
    try {
      const response = await axios.get("/equipe/get/bypersonne", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let teams: TextPath[] = [];
      response.data.map((team: any) =>
        teams.push(new TextPath(team.nom_equipe, "t/" + team.id_equipe))
      );
      console.log(teams);
      setTeams(teams);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
    getTeams();
  }, []);

  const textItems: Array<TextPath> = [
    new TextPath("Create a Team", "create-team"),
    new TextPath("Join a Team", "join-team")
  ];

  // teams and urls
  const textsItemsDropDown: Array<TextPath> = [
    new TextPath("Paris-SG", "t/psg"),
    new TextPath("Bayern", "t/bayern"),
    new TextPath("Liverpool", "t/liverpool")
  ];

  const { path } = useRouteMatch();

  return (
    <UserContext.Provider value={currentUser}>
      <CurrentTitlePageContext.Provider value={currentTitlePage}>
        <HeightContext.Provider value={heights}>
          <Grid className={classes.fullscreen} container>
            <Grid classes={{ root: classes.leftSize }} item xs={2}>
              <LeftBar />
              <PersonnalDrawer
                dropDown={true}
                textDropDown={"My Teams"}
                textsItems={textItems}
                textsItemsDropDown={teams}
              />
            </Grid>
            <Grid classes={{ root: classes.middleSide }} item xs={10}>
              <Grid container>
                <RightBar />
                {/** regex for Welcome message : "!/home/anythingelse" : false */}
                <Grid item xs={10}>
                  {!/\/home\/[^\n]+/.test(window.location.pathname) ? (
                    <Welcome />
                  ) : (
                    <div />
                  )}
                </Grid>

                {/** Show a selected Team */}
                <Route path={path + "/t/:idTeam"}>
                  <Team />
                </Route>

                {/** Show create team page */}
                <Route exact path={path + "/create-team"}>
                  <CreateTeam />
                </Route>

                {/** Show join team invitation(s) */}
                <Route exact path={path + "/join-team"}>
                  <JoinTeam />
                </Route>
              </Grid>
            </Grid>
          </Grid>
        </HeightContext.Provider>
      </CurrentTitlePageContext.Provider>
    </UserContext.Provider>
  );
}

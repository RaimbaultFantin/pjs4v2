import React, { useContext, useEffect } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { HeightContext } from "../../../services/context/HeightContext";
import { ThemeContext } from "../../../services/context/ThemeContext";
import { CurrentTitlePageContext } from "../../../services/context/CurrentTitlePageContext";
import Invitation from "../../../components/Invitation/Invitation";

class Invit {
  public senderName: string;
  public senderEmail: string;
  public teamName: string;
  constructor(senderName: string, senderEmail: string, teamName: string) {
    this.senderName = senderName;
    this.senderEmail = senderEmail;
    this.teamName = teamName;
  }
}

interface JoinTeamProps {}

/**
 * Belong to Home
 */
export default function JoinTeam(props: JoinTeamProps) {
  const themes = useContext(ThemeContext);
  const heights = useContext(HeightContext);
  const useStyles = makeStyles({
    title: {
      color: themes.lightDark
    },
    main: {
      height: heights.screenHeight - heights.navbar
    }
  });

  const classes = useStyles();

  const title = useContext(CurrentTitlePageContext);

  useEffect(() => {
    title.setTitle("Join a Team");
  });

  const invits: Array<Invit> = [
    new Invit("Yanis", "rabyanisrabia@gmail.com", "U19 Paris"),
    new Invit("Mariam", "mariam16@gmail.com", "BDS Descartes"),
    new Invit("Oliwier", "oliwier.maziarz@gmail.com", "Five entre amis")
  ];

  return (
    <Grid
      className={classes.main}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      {false ? (
        <h1 className={classes.title}>
          <span role="img" aria-label="sheep">
            no invitation ...
          </span>
        </h1>
      ) : (
        invits.map(inv => (
          <Invitation
            senderEmail={inv.senderEmail}
            senderName={inv.senderName}
            teamName={inv.teamName}
          />
        ))
      )}
    </Grid>
  );
}

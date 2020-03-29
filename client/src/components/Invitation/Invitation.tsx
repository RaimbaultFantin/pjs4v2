import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ThemeContext } from "../../services/context/ThemeContext";

interface InvitationProps {
  senderName: string;
  senderEmail: string;
  teamName: string;
}

export default function Invitation(props: InvitationProps) {
  const { senderName, senderEmail, teamName } = props;
  const themes = useContext(ThemeContext);

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      margin: 5
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)"
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    },
    teamtext: {
      fontWeight: "bold",
      color: themes.hightRed
    },
    center: {
      display: "flex",
      justifyContent: "center"
    }
  });
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          From {senderName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {senderEmail}
        </Typography>
        <Typography variant="body2" component="p">
          He wants you to join his team : <br />
          <span className={classes.teamtext}>{teamName}</span>
        </Typography>
      </CardContent>
      <CardActions className={classes.center}>
        <Button variant="contained" color="primary">
          Accept
        </Button>
        <Button variant="contained" color="secondary">
          Decline
        </Button>
      </CardActions>
    </Card>
  );
}

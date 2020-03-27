import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275
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
  }
});

interface WelcomeCardProps {
  userName: string | undefined;
}

export default function WelcomeCard(props: WelcomeCardProps) {
  const { userName } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Sport Manager
        </Typography>
        <Typography color="secondary" variant="h5" component="h2">
          Welcome Back {userName}
          <span role="img" aria-label="sheep">
            {" "}
            🥳
          </span>
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Pssssht! Don't forget to wash your hands...
        </Typography>
        <Typography variant="body2" component="p">
          Click on : Create Team - Join a Team - My Team(s)
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">More About The App</Button>
      </CardActions>
    </Card>
  );
}

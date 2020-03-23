import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ChatIcon from "@material-ui/icons/Chat";
import SportsIcon from "@material-ui/icons/Sports";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import { ThemeContext } from "../../services/context/ThemeContext";
import { Grid } from "@material-ui/core";

interface SimpleBottomNavigationProps {
  setChatOpen: (bool: boolean) => void;
  setPlanningOpen: (bool: boolean) => void;
  setTeamOpen: (bool: boolean) => void;
}

/**
 * SimpleBottomNavigation belong to Home
 */
export default function SimpleBottomNavigation(
  props: SimpleBottomNavigationProps
) {
  const { setChatOpen, setPlanningOpen, setTeamOpen } = props;
  const themes = useContext(ThemeContext);

  const useStyles = makeStyles({
    bottomNav: {
      width: 500,
      backgroundColor: themes.mediumDark
    },
    root: {
      color: themes.darkRed,
      "&$selected": {
        color: themes.hightRed
      }
    },
    selected: {}
  });

  const classes = useStyles();

  const closeAll = () => {
    setChatOpen(false);
    setPlanningOpen(false);
    setTeamOpen(false);
  };

  const handleChat = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    closeAll();
    setChatOpen(true);
  };

  const handlePlanning = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    closeAll();
    setPlanningOpen(true);
  };

  const handleTeam = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    closeAll();
    setTeamOpen(true);
  };

  // value of current bottomNav selected
  const [value, setValue] = React.useState(0);

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.bottomNav}
      >
        <BottomNavigationAction
          classes={{
            root: classes.root,
            selected: classes.selected
          }}
          icon={<ChatIcon color="secondary" />}
          label="Discussion"
          onClick={handleChat}
        />
        <BottomNavigationAction
          classes={{
            root: classes.root,
            selected: classes.selected
          }}
          label="Planning"
          icon={<SportsIcon color="secondary" />}
          onClick={handlePlanning}
        />
        <BottomNavigationAction
          classes={{
            root: classes.root,
            selected: classes.selected
          }}
          label="Team"
          icon={<GroupWorkIcon color="secondary" />}
          onClick={handleTeam}
        />
      </BottomNavigation>
    </Grid>
  );
}

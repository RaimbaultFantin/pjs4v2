import React, { useContext } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  createStyles
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { ThemeContext } from "../../services/context/ThemeContext";
import EditIcon from "@material-ui/icons/Edit";

interface RightDrawerProps {}

const useStyles = makeStyles({});

export default function RightDrawer(props: RightDrawerProps) {
  const themes = useContext(ThemeContext);

  const useStyles = makeStyles(() =>
    createStyles({
      iconText: {
        color: themes.white
      }
    })
  );

  const iconColor = {
    color: themes.white
  };

  const classes = useStyles();

  return (
    <List>
      <ListItem button>
        <ListItemIcon>
          <AddCircleIcon style={iconColor} />
        </ListItemIcon>
        <ListItemText
          classes={{
            root: classes.iconText
          }}
          primary={"Add members"}
        />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <EditIcon style={iconColor} />
        </ListItemIcon>
        <ListItemText
          classes={{
            root: classes.iconText
          }}
          primary={"Edit members"}
        />
      </ListItem>
    </List>
  );
}

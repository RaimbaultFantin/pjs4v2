import React, { useContext } from "react";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import {
  Theme,
  makeStyles,
  withStyles,
  createStyles
} from "@material-ui/core/styles";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { ThemeContext } from "../../services/context/ThemeContext";

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "$ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""'
      }
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0
      }
    }
  })
)(Badge);

interface FolderAvatarProps {
  persons: Array<string>;
}

export default function FolderAvatar(props: FolderAvatarProps) {
  const { persons } = props;

  const themes = useContext(ThemeContext);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        "& > *": {
          margin: theme.spacing(1)
        }
      },
      iconText: {
        color: themes.blue
      }
    })
  );
  const classes = useStyles();

  return (
    <div>
      {persons.map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              variant="dot"
            >
              <Avatar>{text.charAt(0)}</Avatar>
            </StyledBadge>
          </ListItemIcon>
          <ListItemText
            classes={{
              root: classes.iconText
            }}
            primary={text}
          />
        </ListItem>
      ))}
    </div>
  );
}

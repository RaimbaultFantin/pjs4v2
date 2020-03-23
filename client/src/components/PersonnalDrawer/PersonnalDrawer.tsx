import React, { useContext, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  createStyles,
  Collapse
} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import GroupIcon from "@material-ui/icons/Group";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Link, useRouteMatch } from "react-router-dom";
import { ThemeContext } from "../../services/context/ThemeContext";

export class TextPath {
  public text: string;
  public path: string;
  constructor(text: string, path: string) {
    this.text = text;
    this.path = path;
  }
}

interface PersonnalDrawerProps {
  textsItems: Array<TextPath>;
  dropDown?: boolean;
  textDropDown?: string;
  textsItemsDropDown?: Array<TextPath>;
}

PersonnalDrawer.defaultProps = {
  dropDown: false,
  textDropDown: undefined,
  textsItemsDropDown: undefined
};
/**
 * LeftDrawer belong to Home
 */
export default function PersonnalDrawer(props: PersonnalDrawerProps) {
  const { textsItems, dropDown, textsItemsDropDown, textDropDown } = props;

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

  const [open, setOpen] = useState<boolean>(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const { url } = useRouteMatch();
  return (
    <div>
      <List>
        {textsItems.map((txtpath, index) => (
          <ListItem
            button
            key={txtpath.text}
            component={Link}
            to={url + "/" + txtpath.path}
          >
            <ListItemIcon>
              {index % 2 === 0 ? (
                <AddCircleIcon style={iconColor} />
              ) : (
                <GroupIcon style={iconColor} />
              )}
            </ListItemIcon>
            <ListItemText
              classes={{
                root: classes.iconText
              }}
              primary={txtpath.text}
            />
          </ListItem>
        ))}
        {dropDown ? (
          <div>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <ListAltIcon style={iconColor} />
              </ListItemIcon>
              <ListItemText
                classes={{
                  root: classes.iconText
                }}
                primary={textDropDown}
              />
              {open ? (
                <ExpandLess style={iconColor} />
              ) : (
                <ExpandMore style={iconColor} />
              )}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {textsItemsDropDown ? (
                  textsItemsDropDown.map(txtpath2 => (
                    <ListItem
                      key={txtpath2.text}
                      component={Link}
                      to={url + "/" + txtpath2.path}
                      button
                    >
                      <ListItemIcon>
                        <SportsSoccerIcon style={iconColor} />
                      </ListItemIcon>
                      <ListItemText
                        classes={{
                          root: classes.iconText
                        }}
                        primary={txtpath2.text}
                      />
                    </ListItem>
                  ))
                ) : (
                  <div />
                )}
              </List>
            </Collapse>
          </div>
        ) : (
          <div />
        )}
      </List>
    </div>
  );
}

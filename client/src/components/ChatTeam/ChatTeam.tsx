import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  Grid,
  TextField,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider
} from "@material-ui/core";
import { ThemeContext } from "../../services/context/ThemeContext";
import { HeightContext } from "../../services/context/HeightContext";
import useChat from "./_useChat";
interface ChatTeamProps {}

export default function ChatTeam() {
  const themes = useContext(ThemeContext);

  const heights = useContext(HeightContext);

  const useStyles = makeStyles({
    main: {
      height: heights.screenHeight - (heights.navbar + heights.bottomnav)
    },
    input: {
      color: themes.white
    },
    test: {
      textAlign: "center"
    }
  });

  const classes = useStyles();
  // state Message Box
  const [messageBox, setMessageBox] = useState<string>("");

  const handleChangeMsgBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMessageBox(e.currentTarget.value);
  };
  // useChat return his state : messages (Array of string)
  const { messages, sendMessage } = useChat();

  return (
    <Grid
      className={classes.main}
      container
      direction="column"
      justify="flex-end"
    >
      {/** Messages */}
      <List>
        {messages.flatMap((msg, index) => [
          <ListItem alignItems="flex-start" key={index}>
            <ListItemAvatar>
              <Avatar alt="Cute Kitten" src="http://placekitten.com/200/200" />
            </ListItemAvatar>
            <ListItemText primary={msg} />
          </ListItem>,
          <Divider component="li" key={"divider-" + index} variant="inset" />
        ])}
      </List>

      {/** MessageBox */}
      <TextField
        value={messageBox}
        onChange={handleChangeMsgBox}
        onKeyDown={e => {
          if (e.key === "Enter") {
            e.preventDefault();
            sendMessage(messageBox);
            setMessageBox("");
          }
        }}
        id="filled-full-width"
        placeholder="Send a message to your team"
        fullWidth
        margin="normal"
        label="🏆"
        color="secondary"
        InputLabelProps={{
          shrink: true
        }}
        InputProps={{
          className: classes.input
        }}
        variant="filled"
        autoComplete="off"
      />
    </Grid>
  );
}

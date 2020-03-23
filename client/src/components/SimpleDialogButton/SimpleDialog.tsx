import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import AddIcon from "@material-ui/icons/Add";
import { green, red } from "@material-ui/core/colors";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";

const emails = ["username@gmail.com", "user02@gmail.com"];
const useStyles = makeStyles({
  settings: {
    backgroundColor: green[100],
    color: green[600]
  },
  disconnect: {
    backgroundColor: red[100],
    color: red[600]
  }
});

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Your account</DialogTitle>
      <List>
        <ListItem button>
          <ListItemAvatar>
            <Avatar className={classes.settings}>
              <DashboardIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={"Modify settings account"} />
        </ListItem>
        <ListItem button>
          <ListItemAvatar>
            <Avatar className={classes.disconnect}>
              <SentimentDissatisfiedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={"Disconnect"} />
        </ListItem>
        <ListItem autoFocus button>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List>
    </Dialog>
  );
}

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        My Account
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}

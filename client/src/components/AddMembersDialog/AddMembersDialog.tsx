import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { green, red } from "@material-ui/core/colors";
import {
  IconButton,
  Grid,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import classes from "*.module.css";

const emails = ["username@gmail.com", "user02@gmail.com"];

const useStyles = makeStyles(() =>
  createStyles({
    settings: {
      backgroundColor: green[100],
      color: green[600]
    },
    disconnect: {
      backgroundColor: red[100],
      color: red[600]
    },
    margin: {
      margin: "10px"
    },
    red: {
      backgroundColor: "red"
    },
    iconText: {
      color: "white"
    }
  })
);

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        Invite Members to join your team
      </DialogTitle>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="center" alignItems="center" direction="column">
          <Grid className={classes.margin} item xs={10}>
            <TextField
              required={true}
              color="secondary"
              id="standard-basic"
              label="Email adress"
            />
          </Grid>
          <Grid className={classes.margin} item xs={10}>
            <Button variant="contained" color="secondary">
              Invite
            </Button>
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </Dialog>
  );
}

export default function AddMembersDialog() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const iconColor = {
    color: "white"
  };

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <List>
        <ListItem button onClick={handleClickOpen}>
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
      </List>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}

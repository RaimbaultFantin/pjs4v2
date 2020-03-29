import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { green, red } from "@material-ui/core/colors";
import { IconButton, Grid, TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers";

const emails = ["username@gmail.com", "user02@gmail.com"];
const useStyles = makeStyles({
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
      <DialogTitle id="simple-dialog-title">Add Event</DialogTitle>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="center" alignItems="center" direction="column">
          <Grid className={classes.margin} item xs={10}>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
              SelectProps={{ className: classes.red }}
            />
          </Grid>
          <Grid className={classes.margin} item xs={10}>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
          </Grid>
          <Grid className={classes.margin} item xs={10}>
            <TextField
              id="filled-multiline-static"
              label="Event Name"
              multiline
              rows="4"
              variant="filled"
            />
          </Grid>
          <Grid className={classes.margin} item xs={10}>
            <Button variant="contained" color="secondary">
              Add
            </Button>
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </Dialog>
  );
}

export default function EditPlanningDialog() {
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
      <IconButton
        onClick={handleClickOpen}
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <EditIcon />
      </IconButton>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}

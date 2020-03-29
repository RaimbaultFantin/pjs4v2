import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { green, red } from "@material-ui/core/colors";
import {
  Grid,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

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
    iconText: {
      color: "white"
    },
    text: {
      color: "#42a5f5"
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

  const [, setSelectedDate] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );

  const handleClose = () => {
    onClose(selectedValue);
  };

  const persons = ["Benjamin", "Yanis", "Oliwier", "Liuyi", "Mariam", "Fares"];

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Edit members</DialogTitle>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="center" alignItems="center" direction="column">
          <Grid className={classes.margin} item xs={10}>
            {persons.map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  <DeleteForeverIcon style={{ color: red[500] }}>
                    <Avatar>{text.charAt(0)}</Avatar>
                  </DeleteForeverIcon>
                </ListItemIcon>
                <ListItemText
                  classes={{
                    root: classes.text
                  }}
                  primary={text}
                />
              </ListItem>
            ))}
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </Dialog>
  );
}

export default function EditMembersDialog() {
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
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CardNoEvents from "../CardNoEvents/CardNoEvents";

/**
 * Event is a class which represente a time in the day
 */
class Event {
  public start: Date;
  public end: Date;
  public event: string;
  constructor(start: Date, end: Date, event: string) {
    this.start = start;
    this.end = end;
    this.event = event;
  }
}

interface EventsProps {
  selectedDate: Date;
}

export default function Events(props: EventsProps) {
  const { selectedDate } = props;

  const useStyles = makeStyles({
    table: {
      minWidth: 400
    }
  });

  const classes = useStyles();

  useEffect(() => {
    console.log("from Event" + selectedDate);
  }, [selectedDate]);

  // a suppr
  const debut = new Date("1995-12-17T15:30:00");
  const fin = new Date("1995-12-17T17:30:00");
  // fin a suppr

  const [events, setEvents] = useState<Array<Event>>([
    new Event(debut, fin, "Training Foot")
  ]);

  return (
    <div>
      {/** if there are no events */}
      {!events?.length ? (
        <CardNoEvents selectedDate={selectedDate} />
      ) : (
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell align="left">Event</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((evt, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {evt.start.getHours() + ":" + evt.start.getMinutes()} -{" "}
                    {evt.end.getHours() + ":" + evt.end.getMinutes()}
                  </TableCell>
                  <TableCell align="left">{evt.event}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

// const data: Array<Event> = [];

// function datas(): void {
//   var MIN = 8;
//   var MAX = 22;
//   let currentHour = 8;
//   let diviser = 1;
//   data.push(new Event(MIN.toString() + ":00", "-"));
//   for (let index = 30; index < (MAX - MIN) * 60; index += 30) {
//     if (index % 60 === 0) {
//       currentHour++;
//       data.push(new Event(currentHour + ":00", "-"));
//     } else {
//       data.push(new Event(currentHour + ":" + index / diviser, "-"));
//     }
//     diviser++;
//   }
//   data.push(new Event(MAX.toString() + ":00", "-"));
// }
// datas();

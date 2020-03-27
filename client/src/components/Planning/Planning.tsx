import React, { useContext, useState } from "react";
import InfiniteCalendar from "react-infinite-calendar";
import "react-infinite-calendar/styles.css"; // only needs to be imported once
import { Grid, makeStyles } from "@material-ui/core";
import Events from "../Events/Events";
import PlanningBar from "../PlanningBar/PlanningBar";
import { HeightContext } from "../../services/context/HeightContext";
import { UserContext } from "../../services/context/UserContext";

/**
 * Event is a class which represente a time in the day
 */
export class Event {
  public start: Date;
  public end: Date;
  public event: string;
  constructor(start: Date, end: Date, event: string) {
    this.start = start;
    this.end = end;
    this.event = event;
  }
}

export default function Planning() {
  // property of Calendar
  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );
  const nextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );
  // end property of Calendar

  const heights = useContext(HeightContext);

  const useStyles = makeStyles({
    main: {
      height: heights.screenHeight - (heights.navbar + heights.bottomnav)
    },
    overflow: {
      overflowY: "auto",
      height: "100%"
    },
    hauteur: {
      height: 500,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }
  });

  const classes = useStyles();

  // State SelectedDate
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // a suppr
  const debut = new Date("1995-12-17T15:30:00");
  const fin = new Date("1995-12-17T17:30:00");
  // fin a suppr

  // State Events
  const [events, setEvents] = useState<Array<Event>>([
    new Event(debut, fin, "Training Foot")
  ]);

  return (
    <Grid
      className={classes.main}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Grid container justify="center">
          <InfiniteCalendar
            selected={selectedDate}
            minDate={lastWeek}
            min={lastWeek}
            max={nextMonth}
            height={500}
            onSelect={(date: React.SetStateAction<Date>) =>
              setSelectedDate(date)
            }
          />
          <Grid item xs={6}>
            <div className={classes.hauteur}>
              <PlanningBar setEvents={setEvents} />
              <Grid item xs={10} className={classes.overflow}>
                <Events events={events} selectedDate={selectedDate} />
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

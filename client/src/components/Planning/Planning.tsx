import React, { useContext } from "react";
import InfiniteCalendar from "react-infinite-calendar";
import "react-infinite-calendar/styles.css"; // only needs to be imported once
import { Grid, makeStyles } from "@material-ui/core";
import Events from "../Events/Events";
import DenseAppBar from "../DenseAppBar/DenseAppBar";
import { HeightContext } from "../../services/context/HeightContext";

export default function Planning() {
  // Render the Calendar
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
            selected={today}
            minDate={lastWeek}
            min={lastWeek}
            max={nextMonth}
            height={500}
            //onSelect={(date: any) => console.log(date)}
          />
          <Grid item xs={6}>
            <div className={classes.hauteur}>
              <DenseAppBar />
              <Grid item xs={10} className={classes.overflow}>
                <Events selectedDate={today} />
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

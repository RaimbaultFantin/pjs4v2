import React, { useContext } from "react";
import InfiniteCalendar from "react-infinite-calendar";
import "react-infinite-calendar/styles.css"; // only needs to be imported once
import { Grid, makeStyles } from "@material-ui/core";
import DenseTable from "../DenseTable/DenseTable";
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
      height: 651,
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
            height={"auto"}
          />
          <Grid item xs={6}>
            <div className={classes.hauteur}>
              <DenseAppBar />
              <Grid xs={10} className={classes.overflow}>
                <DenseTable />
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 400
  }
});

class Content {
  public time: string;
  public content: string;
  constructor(time: string, content: string) {
    this.time = time;
    this.content = content;
  }
}

const data: Array<Content> = [];
function datas(): void {
  var MIN = 8;
  var MAX = 22;
  let currentHour = 8;
  let diviser = 1;
  data.push(new Content(MIN.toString() + ":00", "-"));
  for (let index = 30; index < (MAX - MIN) * 60; index += 30) {
    if (index % 60 === 0) {
      currentHour++;
      data.push(new Content(currentHour + ":00", "-"));
    } else {
      data.push(new Content(currentHour + ":" + index / diviser, "-"));
    }
    diviser++;
  }
  data.push(new Content(MAX.toString() + ":00", "-"));
}
datas();

export default function DenseTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="left">Content</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(content => (
            <TableRow key={content.time}>
              <TableCell component="th" scope="row">
                {content.time}
              </TableCell>
              <TableCell align="left">{content.content}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

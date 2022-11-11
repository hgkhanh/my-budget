import React, {useEffect, useState} from 'react';
import moment from "moment";
import {Container, Grid} from "@mui/material";

import {YearAPIResponse} from "types";
import MonthlyBarChart from "components/Year/components/MonthlyBarChart";

const Year = () => {
  const [date, setDate] = useState(moment().set({'date': 1}).subtract(1, 'month'));
  const [yearData, setYearData] = useState<YearAPIResponse>();
  useEffect(() => {
    fetch(`/api/year/${date.year()}`).then(response => {
      if (response.status === 200) {
        return response.json()
      }
    }).then(data => setYearData(data))
      .catch(error => console.log(error))
  }, [])
  if (yearData && yearData.year) {
    return (
      <Container fixed>
        <h1>2022</h1>
        <h2>Year Total</h2>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <h3>Income</h3>
            <p>{yearData.year.income}</p>
          </Grid>
          <Grid item xs={4}>
            <h3>Expense</h3>
            <p>{yearData.year.expense}</p>
          </Grid>
          <Grid item xs={4}>
            <h3>Cash Flow</h3>
            <p>{yearData.year.cash_flow}</p>
          </Grid>
        </Grid>
        <MonthlyBarChart yearData={yearData}/>
      </Container>
    )
  }
  return (<div>No data</div>)
}

export default Year;

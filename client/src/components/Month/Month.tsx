import React, {useEffect, useState} from 'react';

import {Container, Grid, Button} from "@mui/material";
import {PeriodOverview} from "../../types";
import moment from "moment";
import {isEmpty} from 'lodash/fp';

const Month = () => {
  const [data, setData] = useState<PeriodOverview>();
  const [date, setDate] = useState(moment().set({'date': 1}));

  useEffect(() => {
    if (date) {
      fetch(`/api/month?date=${date.format('YYYY-MM-DD')}`).then(response => {
        if (response.status === 200) {
          return response.json()
        }
      }).then(data => setData(data))
        .catch(error => console.log(error))
    }
  }, [date])

  const renderOverview = (data?: PeriodOverview) => {
    if (!isEmpty(data) && data.expense > 0) {
      return (
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <h3>Income</h3>
            <p>{data.income}</p>
          </Grid>
          <Grid item xs={4}>
            <h3>Expense</h3>
            <p>{data.expense}</p>
          </Grid>
          <Grid item xs={4}>
            <h3>Cash Flow</h3>
            <p>{data.cash_flow}</p>
          </Grid>
        </Grid>)
    }
    return (<div>
      No data
    </div>)
  }

  return (
    <Container fixed>
      <h1>{date.format('MMM')} {date.year()}</h1>
      <Button onClick={() => setDate(date.clone().subtract(1, 'month'))}>Prev</Button>
      <Button onClick={() => setDate(date.clone().add(1, 'month'))}>Next</Button>
      <h2>Month Overview</h2>
      {renderOverview(data)}
    </Container>
  )

}

export default Month;

import React from 'react';

import {Container, Grid} from "@mui/material";
import {YearAPIResponse} from "../../types";

interface YearProps {
  yearData: YearAPIResponse;
}
 export const Year = ({ yearData } : YearProps) => {
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
                 {JSON.stringify(yearData)}
             </Container>
         )
     }
     return (<div>No data</div>)
}

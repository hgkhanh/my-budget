import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import {Grid, Typography} from "@mui/material";

import { CategoryExpense } from "types";
import Amount from "../Amount";
import CategoryPieChart from "components/CategoryPieChart";
import DiffAmount from "components/DiffAmount";

interface CategoryInfoProps {
  categories: CategoryExpense[];
  isYearInfo: boolean;
}

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryInfo = ({categories, isYearInfo = false}: CategoryInfoProps) => {
  if (categories && categories.length > 0) {
    const sortedByAmountList = categories.sort(function (a, b) {
      return b.amount - a.amount;
    });
    return (
      <>
        <h2>Categories</h2>
        <Grid container spacing={0} justifyContent="space-evenly">
          <Grid item xs={12} sm={6}>
            <Grid container justifyContent="space-evenly">
              <Grid item xs={6} sm={4}>
                <Typography align="left"></Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography align="right">Amount</Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography align="right">Month Avg</Typography>
              </Grid>
              {!isYearInfo && (
                <Grid item xs={6} sm={2}>
                  <Typography align="right">± from Avg</Typography>
                </Grid>
              )}
            </Grid>
            {sortedByAmountList.map(({category, amount, average, from_avg}) => (
              <Grid key={category} container justifyContent="space-evenly">
                <Grid item xs={6} sm={4}>
                  <Typography align="left">{category}</Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Typography align="right"><Amount isExpense={true} amount={amount}/></Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Typography align="right">{average ? (<Amount isExpense={true} amount={average}/>) : <span>{'n/a'}</span>}</Typography>
                </Grid>
                {!isYearInfo && (
                  <Grid item xs={6} sm={2}>
                    <Typography align="right">{from_avg ? (<DiffAmount amount={from_avg}/>) : <span>{'n/a'}</span>}</Typography>
                  </Grid>
                )}
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12} sm={4}>
            <CategoryPieChart categoryDataset={sortedByAmountList}/>
          </Grid>
        </Grid>
      </>
    )
  }
  return (<div>
    No data
  </div>)
}

export default CategoryInfo;

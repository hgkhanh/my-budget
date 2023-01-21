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

interface CategoryInfoProps {
  categories: CategoryExpense[];
}

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryInfo = ({categories}: CategoryInfoProps) => {
  if (categories && categories.length > 0) {
    const sortedByAmountList = categories.sort(function (a, b) {
      return b.amount - a.amount;
    });
    return (
      <>
        <h2>Categories</h2>
        <Grid container spacing={0} justifyContent="space-evenly">
          <Grid item xs={12} sm={6}>
            {sortedByAmountList.map(({category, amount, average}) => (
              <Grid key={category} container justifyContent="space-evenly">
                <Grid item xs={6} sm={4}>
                  <Typography align="left">{category}</Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Typography align="right"><Amount amount={-amount}/></Typography>
                </Grid>
                {average && (
                  <Grid item xs={6} sm={2}>
                  <Typography align="right"><Amount amount={-average}/></Typography>
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

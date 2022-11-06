import React from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {Grid, Typography} from "@mui/material";

import { CategoryExpense } from "types";
import {
  CATEGORY_CONFIG,
} from "constants/category";

interface CategoryInfoProps {
  categories: CategoryExpense[];
}

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryInfo = ({categories}: CategoryInfoProps) => {

  if (categories.length > 0) {
    const sortedByAmountList = categories.sort(function (a, b) {
      return b.amount - a.amount;
    });
    const data = {
      labels: sortedByAmountList.map(({category}) => category),
      datasets: [
        {
          label: 'Categories percentage',
          data: sortedByAmountList.map(({amount}) => amount),
          backgroundColor: sortedByAmountList.map(({category}) => CATEGORY_CONFIG[category].color),
        },
      ],
    };
    return (
      <>
        <h2>Categories</h2>
        <Grid container spacing={0} justifyContent="space-evenly">
          <Grid item xs={6}>
            {sortedByAmountList.map(({category, amount}) => (
              <Grid container justifyContent="space-evenly">
                <Grid item xs={4}>
                  <Typography align="left">{category}</Typography>
                </Grid>q
                <Grid item xs={1}>
                  <Typography align="right">{amount}</Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={4}>
            <Doughnut data={data}/>
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

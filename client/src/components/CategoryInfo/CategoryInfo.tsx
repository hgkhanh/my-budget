import React from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {Grid, Typography} from "@mui/material";

import { CategoryExpense } from "types";
import {
  CATEGORY_CONFIG,
} from "constants/category";
import Amount from "../Amount";

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
          backgroundColor: sortedByAmountList.map(({category}) =>
             CATEGORY_CONFIG[category] ? CATEGORY_CONFIG[category].color : CATEGORY_CONFIG['Others'].color
          ),
        },
      ],
    };
    const options: ChartOptions = {
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            font: {
              size: window.innerWidth > 350 ? 10 : 5
            },
            boxWidth: 10
          }
        }
      }
    }
    return (
      <>
        <h2>Categories</h2>
        <Grid container spacing={0} justifyContent="space-evenly">
          <Grid item xs={12} sm={6}>
            {sortedByAmountList.map(({category, amount}) => (
              <Grid key={category} container justifyContent="space-evenly">
                <Grid item xs={6} sm={4}>
                  <Typography align="left">{category}</Typography>
                </Grid>
                <Grid item xs={6} sm={1}>
                  <Typography align="right"><Amount amount={-amount}/></Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Doughnut data={data} options={options}/>
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

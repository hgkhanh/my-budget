import React from 'react';

import { Grid, Typography } from "@mui/material";
import {CategoryExpense} from "../../../../types";

interface CategoryInfoProps {
  categories: CategoryExpense[];
}

const CategoryInfo = ({categories}: CategoryInfoProps) => {
  if (categories.length > 0) {
    const sortedByAmountList = categories.sort(function(a, b) {
      return b.amount - a.amount;
    });
    return (
      <>
        <h2>Categories</h2>
        <Grid container spacing={0} justifyContent="center" direction="column">
          {sortedByAmountList.map(({category, amount}) => (
            <Grid container spacing={0} justifyContent="center">
              <Grid item xs={2} >
                <Typography align="left">{category}</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography align="right">{amount}</Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </>
    )
  }
  return (<div>
    No data
  </div>)
}

export default CategoryInfo;

import React from 'react'

import { Grid } from '@mui/material'
import { PeriodOverview } from 'types'
import { isEmpty } from 'lodash/fp'
import Amount from 'components/Amount'

interface OverviewProps {
  data: PeriodOverview
}

const Overview = ({ data }: OverviewProps) => {
  if (!isEmpty(data) && data.expense > 0) {
    const { income, expense, cashFlow, needToHave, niceToHave } = data
    const needToHave_percentage = Math.round((needToHave * 100) / income)
    const niceToHave_percentage = Math.round((niceToHave * 100) / income)
    const saving_percentage = Math.round(
      100 - needToHave_percentage - niceToHave_percentage
    )
    return (
      <>
        <h2>Overview</h2>
        <Grid container spacing={0} justifyContent='center'>
          <Grid item xs={4} sm={2}>
            <h3>Income</h3>
            <p>
              <Amount amount={income} />
            </p>
          </Grid>
          <Grid item xs={4} sm={2}>
            <h3>Expense</h3>
            <p>
              <Amount amount={-expense} />
            </p>
          </Grid>
          <Grid item xs={4} sm={2}>
            <h3>Cash Flow</h3>
            <p>
              <Amount amount={cashFlow} />
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={0} justifyContent='center'>
          <Grid item xs={4} sm={2}>
            <h3>Need-to-have</h3>
            <p>
              <Amount amount={-needToHave} />
            </p>
            <p>{`${needToHave_percentage}%`}</p>
          </Grid>
          <Grid item xs={4} sm={2}>
            <h3>Nice-to-have</h3>
            <p>
              <Amount amount={-niceToHave} />
            </p>
            <p>{`${niceToHave_percentage}%`}</p>
          </Grid>
          <Grid item xs={4} sm={2}>
            <h3>Saving</h3>
            <p>
              <Amount amount={cashFlow} />
            </p>
            <p>{`${saving_percentage}%`}</p>
          </Grid>
        </Grid>
      </>
    )
  }
  return <div>No data</div>
}

export default Overview

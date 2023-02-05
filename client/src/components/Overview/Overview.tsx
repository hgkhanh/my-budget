import React from 'react'

import { Grid } from '@mui/material'
import { PeriodOverview } from '../../types'
import { isEmpty } from 'lodash/fp'
import Amount from 'components/Amount'

interface OverviewProps {
  data: PeriodOverview
}

const Overview = ({ data }: OverviewProps) => {
  if (!isEmpty(data) && data.expense > 0) {
    const { income, expense, cash_flow, need_to_have, nice_to_have } = data
    const need_to_have_percentage = Math.round((need_to_have * 100) / income)
    const nice_to_have_percentage = Math.round((nice_to_have * 100) / income)
    const saving_percentage = Math.round(
      100 - need_to_have_percentage - nice_to_have_percentage
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
              <Amount amount={cash_flow} />
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={0} justifyContent='center'>
          <Grid item xs={4} sm={2}>
            <h3>Need-to-have</h3>
            <p>
              <Amount amount={-need_to_have} />
            </p>
            <p>{`${need_to_have_percentage}%`}</p>
          </Grid>
          <Grid item xs={4} sm={2}>
            <h3>Nice-to-have</h3>
            <p>
              <Amount amount={-nice_to_have} />
            </p>
            <p>{`${nice_to_have_percentage}%`}</p>
          </Grid>
          <Grid item xs={4} sm={2}>
            <h3>Saving</h3>
            <p>
              <Amount amount={cash_flow} />
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

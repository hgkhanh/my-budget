import React, { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Grid, Tabs, Tab, Box } from '@mui/material'

import { TransactionItem } from 'types'
import EnhancedTable from 'components/EnhancedTable'

interface CategoryInfoProps {
  transactions: TransactionItem[]
}

ChartJS.register(ArcElement, Tooltip, Legend)

const TransactionList = ({ transactions }: CategoryInfoProps) => {
  if (transactions && transactions.length > 0) {
    return (
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={0} justifyContent='space-evenly'>
          <Grid item xs={12} sm={6}>
            <EnhancedTable data={transactions} />
          </Grid>
        </Grid>
      </Box>
    )
  }
  return <div>No data</div>
}

export default TransactionList

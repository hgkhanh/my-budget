import React, { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Grid, Tabs, Tab, Box } from '@mui/material'

import { TransactionItem } from 'types'
import EnhancedTable from 'components/EnhancedTable'

interface CategoryInfoProps {
  income: TransactionItem[]
  expense: TransactionItem[]
}

ChartJS.register(ArcElement, Tooltip, Legend)

const TransactionList = ({ income, expense }: CategoryInfoProps) => {
  const [activeTab, setActiveTab] = useState('expense')
  const activeData = activeTab === 'expense' ? expense : income

  if (expense && expense.length > 0) {
    return (
      <Box sx={{ mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          aria-label='transaction-list-tabs'
          centered
        >
          <Tab value='expense' label='Expense' wrapped />
          <Tab value='income' label='Income' wrapped />
        </Tabs>
        <Grid container spacing={0} justifyContent='space-evenly'>
          <Grid item xs={12} sm={6}>
            <EnhancedTable data={activeData} />
          </Grid>
        </Grid>
      </Box>
    )
  }
  return <div>No data</div>
}

export default TransactionList

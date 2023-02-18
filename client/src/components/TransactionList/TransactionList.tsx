import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Grid } from '@mui/material'

import { TransactionItem } from 'types'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

interface CategoryInfoProps {
  transactions: TransactionItem[]
}

ChartJS.register(ArcElement, Tooltip, Legend)

const TransactionList = ({ transactions }: CategoryInfoProps) => {
  const transformedData = transactions.map((transaction) => {
    if (transaction.account === 'personal') transaction.real_amount = '-'
    return transaction
  })
  const columns: GridColDef[] = [
    { field: 'key', headerName: 'ID', width: 90, hide: true },
    {
      field: 'category',
      headerName: 'Category',
      width: 190,
      editable: true
    },
    {
      field: 'amount',
      headerName: 'Amnt',
      type: 'number',
      width: 80,
      editable: true
    },
    {
      field: 'real_amount',
      headerName: 'R Amnt',
      type: 'number',
      width: 80,
      editable: true
    },
    {
      field: 'comment',
      headerName: 'Note',
      sortable: false,
      width: 280
    }
  ]

  if (transactions && transactions.length > 0) {
    return (
      <Grid container spacing={0} justifyContent='space-evenly'>
        <Grid item xs={12} sm={8}>
          <DataGrid
            autoHeight
            rows={transformedData}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[20]}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(row) => row.key}
            initialState={{
              sorting: {
                sortModel: [{ field: 'amount', sort: 'desc' }]
              }
            }}
          />
        </Grid>
      </Grid>
    )
  }
  return <div>No data</div>
}

export default TransactionList

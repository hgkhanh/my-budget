import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Container, Button } from '@mui/material'

import { AnalyticsAPIResponse } from 'types'
import Overview from 'components/Overview'
import CategoryInfo from 'components/CategoryInfo'
import LoadingBox from 'components/LoadingBox'
import TransactionList from 'components/TransactionList'
import MonthlyBarChart from 'components/MonthlyBarChart'
import Layout from 'components/Layout/Layout'

const Month = () => {
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState<AnalyticsAPIResponse>()
  const [date, setDate] = useState(
    moment().set({ date: 1 }).subtract(1, 'month')
  )

  useEffect(() => {
    if (date) {
      setLoading(true)
      fetch(
        `/api/analytics/${date.format('YYYY-MM-DD')}?` +
          new URLSearchParams({
            resolution: 'month'
          })
      )
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          }
        })
        .then((data) => setData(data))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
    }
  }, [date])

  return (
    <Layout>
      <Container fixed>
        <h1>
          {date.format('MMM')} {date.year()}
        </h1>
        <Button onClick={() => setDate(date.clone().subtract(1, 'month'))}>
          Prev
        </Button>
        <Button onClick={() => setDate(date.clone().add(1, 'month'))}>
          Next
        </Button>

        {isLoading || !data ? (
          <LoadingBox />
        ) : (
          <>
            <Overview data={data.overview} />
            <MonthlyBarChart months={data.referenceMonths} />
            <CategoryInfo
              isYearInfo={false}
              categories={data.categories.expense}
            />
            <TransactionList
              income={data.transactions.income}
              expense={data.transactions.expense}
            />
          </>
        )}
      </Container>
    </Layout>
  )
}

export default Month

import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Button, Container, Tab, Tabs } from '@mui/material'

import { AnalyticsAPIResponse, TransferType } from 'types'
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
  const [activeTab, setActiveTab] = useState<TransferType>(TransferType.Income)

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

            <Tabs
              value={activeTab}
              onChange={(event, newValue) => setActiveTab(newValue)}
              aria-label='transaction-list-tabs'
              centered
            >
              <Tab
                value={TransferType.Expense as string}
                label='Expense'
                wrapped
              />
              <Tab
                value={TransferType.Income as string}
                label='Income'
                wrapped
              />
            </Tabs>
            <CategoryInfo
              isYearInfo={false}
              categories={data.categories[activeTab]}
            />
            <TransactionList transactions={data.transactions[activeTab]} />
          </>
        )}
      </Container>
    </Layout>
  )
}

export default Month

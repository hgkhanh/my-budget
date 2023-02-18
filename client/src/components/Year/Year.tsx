import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Container, Button } from '@mui/material'

import { AnalyticsAPIResponse } from 'types'
import MonthlyBarChart from 'components/MonthlyBarChart'
import Overview from '../Overview'
import CategoryInfo from '../CategoryInfo'
import Error from '../Error'
import LoadingBox from '../LoadingBox'
import Layout from 'components/Layout/Layout'

const Year = () => {
  const [date, setDate] = useState(
    moment().set({ date: 1 }).subtract(1, 'month')
  )
  const [yearData, setYearData] = useState<AnalyticsAPIResponse>()
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(
      `/api/analytics/${date.format('YYYY-MM-DD')}?` +
        new URLSearchParams({
          resolution: 'year'
        })
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      })
      .then((data) => setYearData(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [date])

  if (isError) {
    return <Error />
  }

  return (
    <Layout>
      <Container fixed>
        <h1>{date.year()}</h1>
        <Button onClick={() => setDate(date.clone().subtract(1, 'year'))}>
          Prev
        </Button>
        <Button onClick={() => setDate(date.clone().add(1, 'year'))}>
          Next
        </Button>
        {isLoading || !yearData ? (
          <LoadingBox />
        ) : (
          <>
            <Overview data={yearData.overview} />
            <MonthlyBarChart months={yearData.referenceMonths} />
            <CategoryInfo
              isYearInfo={true}
              categories={yearData.categories.expense}
            />
          </>
        )}
      </Container>
    </Layout>
  )
}

export default Year

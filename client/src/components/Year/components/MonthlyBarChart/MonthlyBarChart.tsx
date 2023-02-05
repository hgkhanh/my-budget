import React from 'react'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import { YearAPIResponse } from 'types'
import moment from 'moment'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
)

interface MonthlyBarChartProps {
  yearData: YearAPIResponse
}

const MonthlyBarChart = ({ yearData }: MonthlyBarChartProps) => {
  const yearStartingBalance = 0
  const monthsData = yearData.months.filter(
    ({ income, expense }) => !(income === 0 && expense === 0)
  )
  const labels = monthsData.map(({ date }) => date)
  const wealthByMonth = monthsData.map(({ date: currentDate }) => {
    // wealth at one month equal sum of cash flow up until current month
    const monthsTillNow = monthsData.filter(({ date }) => {
      return moment(currentDate).valueOf() >= moment(date).valueOf()
    })
    return monthsTillNow.reduce(
      (sum, { cash_flow }) => sum + cash_flow,
      yearStartingBalance
    )
  })
  const data = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'Wealth',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 2,
        fill: false,
        data: wealthByMonth
      },
      {
        type: 'bar' as const,
        label: 'Income',
        backgroundColor: 'rgb(53, 162, 235)',
        data: monthsData.map(({ income }) => income)
      },
      {
        type: 'bar' as const,
        label: 'Expense',
        backgroundColor: 'rgb(255, 99, 132)',
        data: monthsData.map(({ expense }) => expense)
      }
    ]
  }

  return <Chart type='bar' data={data} />
}

export default MonthlyBarChart

import React from 'react';
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
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import {YearAPIResponse} from "types";

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
);

interface MonthlyBarChartProps {
  yearData: YearAPIResponse
}


const MonthlyBarChart = ({yearData}: MonthlyBarChartProps) => {
  const monthsData = yearData.months.filter(({income, expense}) => !(income == 0 && expense == 0));
  const labels = monthsData.map(({date}) => date);
  const data = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'Cash flow',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: false,
        data: labels.map(() => 123),
      },
      {
        type: 'bar' as const,
        label: 'Income',
        backgroundColor: 'rgb(75, 192, 192)',
        data: labels.map(() => -100),
        borderColor: 'white',
        borderWidth: 2,
      },
      {
        type: 'bar' as const,
        label: 'Expense',
        backgroundColor: 'rgb(53, 162, 235)',
        data: labels.map(() => 220),
      },
    ],
  };

  return <Chart type='bar' data={data} />;
}

export default MonthlyBarChart;

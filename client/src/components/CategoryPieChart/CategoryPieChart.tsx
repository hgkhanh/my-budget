import React from 'react';
import {Doughnut} from "react-chartjs-2";
import {ChartData, ChartOptions, TooltipItem} from "chart.js";
import {sum} from "lodash/fp";
import {CATEGORY_CONFIG} from "constants/category";
import {CategoryExpense} from "types";

interface CategoryPieChartProps {
  categoryDataset: CategoryExpense[];
}

const CategoryPieChart= ({ categoryDataset }: CategoryPieChartProps) => {
    const data: ChartData<any> = {
      labels: categoryDataset.map(({category}) => category),
      datasets: [
        {
          label: 'Categories percentage',
          data: categoryDataset.map(({amount}) => amount),
          backgroundColor: categoryDataset.map(({category}) =>
            CATEGORY_CONFIG[category] ? CATEGORY_CONFIG[category].color : CATEGORY_CONFIG['Others'].color
          ),
        },
      ],
    };
  const options: ChartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          font: {
            size: window.innerWidth > 350 ? 10 : 5
          },
          boxWidth: 10
        }
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<any>) => {
            const dataset = data.datasets[tooltipItem.datasetIndex];
            const currentValue = dataset.data[tooltipItem.dataIndex] as number;
            const total = sum(dataset.data);
            const percentage = (currentValue / total * 100).toFixed(0);
            return `${currentValue} (${percentage}%)`;
          },
          title: (tooltipItem: { label: any; }[]) =>
            `${tooltipItem[0]?.label}`
        }
      }
    }
  }
  return (
      <Doughnut data={data} options={options}/>
  )
}

export default CategoryPieChart;

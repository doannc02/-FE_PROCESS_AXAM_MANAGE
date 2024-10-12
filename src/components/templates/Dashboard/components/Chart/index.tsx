import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const ChartDashBoard = () => {
  const [awaitRender, setAwaitRender] = useState(true)

  useEffect(() => {
    setAwaitRender(false)
  }, [])

  if (awaitRender) {
    return null
  }

  return (
    <div className='h-full'>
      <Bar
        className='h-full'
        data={{
          labels: [
            'Africa',
            'Asia',
            'Europe',
            'Latin America',
            'North America',
          ],
          datasets: [
            {
              backgroundColor: [
                '#3e95cd',
                '#8e5ea2',
                '#3cba9f',
                '#e8c3b9',
                '#c45850',
              ],
              data: [2478, 5267, 734, 784, 433],
            },
          ],
        }}
        options={{
          scales: {
            x: {
              type: 'category',
            },
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'Predicted world population (millions) in 2050',
            },
          },
        }}
      />
    </div>
  )
}

export default ChartDashBoard

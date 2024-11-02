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

type Props = {
  content: any[]
  totalElements: number
}[]

const ChartDashBoard = ({ arrDataRender }: { arrDataRender: Props }) => {
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
            'Bộ đề đến hạn',
            'Tổng kế hoạch',
            'Tổng bộ đề',
            'Tổng đề chi tiết',
          ],
          datasets: [
            {
              backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9'],
              data: [
                arrDataRender[0],
                arrDataRender[1],
                arrDataRender[2],
                arrDataRender[3],
              ],
              barThickness: 70, // Độ rộng của cột
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
              text: 'Biểu đồ quản lý các tài liệu đã tạo',
            },
          },
        }}
      />
    </div>
  )
}

export default ChartDashBoard

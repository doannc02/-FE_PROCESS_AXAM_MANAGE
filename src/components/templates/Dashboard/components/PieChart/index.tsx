import React, { useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Typography, Tabs, Tab } from '@mui/material'

ChartJS.register(ArcElement, Tooltip, Legend)

interface PieChartComponentProps {
  dataSets: { label: string; value: number }[][] // mảng dữ liệu cho từng tab
}

const PieChartComponent: React.FC = () => {
  const dataSets = [
    [
      { label: 'Đã phê duyệt', value: 5 },
      { label: 'Chờ phê duyệt', value: 4 },
      { label: 'Đang thực hiện', value: 3 },
      { label: 'Bị từ chối', value: 2 },
    ],
    [
      { label: 'Đã phê duyệt', value: 1 },
      { label: 'Chờ phê duyệt', value: 2 },
      { label: 'Đang thực hiện', value: 3 },
      { label: 'Bị từ chối', value: 4 },
    ],
    [
      { label: 'Đã phê duyệt', value: 3 },
      { label: 'Chờ phê duyệt', value: 1 },
      { label: 'Đang thực hiện', value: 2 },
      { label: 'Bị từ chối', value: 3 },
    ],
  ]
  const [selectedTab, setSelectedTab] = useState(0) // Trạng thái tab hiện tại

  // Xử lý khi đổi tab
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  const data = dataSets[selectedTab]
  const total = data.reduce((sum, item) => sum + item.value, 0)

  const pieData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: ['#4BC0C0', '#36A2EB', '#FFCE56', '#FF6384'],
        hoverBackgroundColor: ['#4BC0C0', '#36A2EB', '#FFCE56', '#FF6384'],
        borderWidth: 1,
      },
    ],
  }

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const label = data[tooltipItem.dataIndex].label || ''
            const value = data[tooltipItem.dataIndex].value
            return `${label}: ${value}`
          },
        },
      },
    },
  }

  return (
    <div style={{ position: 'relative', width: '65%', margin: 'auto' }}>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label='Kế hoạch' sx={{ fontSize: '0.6rem' }} />
        <Tab label='Bộ đề' sx={{ fontSize: '0.6rem' }} />
        <Tab label='Đề chi tiết' sx={{ fontSize: '0.6rem' }} />
      </Tabs>

      <Pie className='mt-10' data={pieData} options={pieOptions} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'normal',
          margin: '10px 0 0 15px',
        }}
      >
        {data.map((item, index) => (
          <Typography
            key={index}
            variant='body2'
            style={{ color: pieData.datasets[0].backgroundColor[index] }}
          >
            {item.label}: {item.value}
          </Typography>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Typography variant='h6'>Tổng: {total}</Typography>
      </div>
    </div>
  )
}

export default PieChartComponent

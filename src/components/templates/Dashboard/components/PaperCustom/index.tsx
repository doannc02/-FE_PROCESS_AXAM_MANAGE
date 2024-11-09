import {
  IconButton,
  Link,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { MENU_URL } from '@/routes'
import { useRouter } from 'next/router'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { moveCursor } from 'readline'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const PaperCustom = ({
  index,
  title,
  value,
  contentTitle,
  subtitle,
  unit,
  backgroundColor,
  colorValue,
}: {
  index: number
  title: string
  value: number
  subtitle: string
  colorValue?: 'green' | 'red' | 'blue'
  contentTitle: string
  unit?: string
  backgroundColor: string
}) => {
  const color = () => {
    if (value > 0 && value < 2) {
      return 'red'
    }
    if (value > 1) {
      return 'green'
    }
    return 'blue'
  }

  const hashEnumRouter: { [key: number]: string } = {
    1: MENU_URL.PROPOSAL,
    2: MENU_URL.EXAM_SET,
    3: MENU_URL.DETAIL_EXAM,
  }

  const router = useRouter()
  const onClick = (index: number) => {
    router.push(hashEnumRouter[index])
  }

  // State for managing menu visibility
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const generateRandomData = (length: number, maxValue: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * maxValue))
  }

  const lineChartData = {
    labels: ['1', '3', '5', '7', '9', '11', '15', '20', '25', '30'], // Ngày trong tháng
    datasets: [
      {
        label: 'Số lượng mục đã tạo',
        data: generateRandomData(10, 15), // Tạo dữ liệu ngẫu nhiên cho 7 ngày, giá trị từ 0 đến 15
        borderColor: colorValue || color(),
        backgroundColor: colorValue || color(),
        borderWidth: 2.5,
        pointRadius: 1,
        tension: 0,
        fill: true,
      },
    ],
  }

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Cho phép biểu đồ sử dụng chiều cao tùy chỉnh
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem: any) {
            return `Ngày ${tooltipItem.label}: ${tooltipItem.raw} mục đã tạo`
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  }

  return (
    <Paper
      className='flex flex-col flex-auto shadow rounded-2xl overflow-hidden'
      style={{ backgroundColor: backgroundColor }}
    >
      <div className='flex items-center justify-between px-2 '>
        <Typography
          variant='h6'
          fontWeight={500}
          className='text-center'
          sx={{ margin: '10px' }}
          color='black'
        >
          {title}
        </Typography>
        {index > 0 && (
          <IconButton aria-label='more' size='large' onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
        )}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={() => onClick(index)}>Xem danh sách</MenuItem>
        </Menu>
      </div>
      <div className='text-center my-10'>
        <Typography variant='h2' color={colorValue ? colorValue : color()}>
          {value}
        </Typography>
        {true && (
          <Typography variant='body1' color={color()}>
            {unit}
          </Typography>
        )}
      </div>
      <div style={{ height: '80px', margin: '10px' }}>
        <Line data={lineChartData} options={lineChartOptions} />
      </div>
    </Paper>
  )
}

export default PaperCustom

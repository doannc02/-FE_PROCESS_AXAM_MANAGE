import { WHITE } from '@/helper/colors'
import { Grid, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import ChartDashBoard from '../Chart'
import PaperCustom from '../PaperCustom'
import { TableProExpires } from '../TableProExpires'
import useGeneral from './useGeneral'
import PieChartComponent from '../PieChart'

const hashEnumTitle: { [key: number]: string } = {
  0: 'Kế hoạch Sắp đến hạn',
  1: 'Tổng kế hoạch',
  2: 'Tổng số bộ đề',
  3: 'Tổng số đề chi tiết',
}

const hashEnumSubtitle: { [key: number]: string } = {
  0: '',
  1: 'kế hoạch',
  2: 'bộ đề',
  3: 'đề chi tiết',
}

const General = () => {
  const [isVideoVisible, setIsVideoVisible] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [values, handles] = useGeneral()
  const { moment } = handles
  const { email, arrDataRender } = values
  const handleVideoClick = () => {
    setIsFadingOut(true)
    setTimeout(() => {
      setIsVideoVisible(false)
    }, 3000) // 3 giây
  }

  return (
    <>
      {isVideoVisible && email === 'doannc@gmail.com' ? (
        <video
          src='/qldethi/assets/video/ultraman/ultraman.mp4'
          autoPlay
          loop
          muted
          onClick={handleVideoClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            transition: 'opacity 3s ease-in-out',
            opacity: isFadingOut ? 0 : 1,
          }}
        ></video>
      ) : (
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12}>
            <div className='flex gap-1 items-center mt-5'>
              <Typography variant='h4'>
                Tổng hợp Tháng {moment().month() + 1}
              </Typography>
            </div>
          </Grid>

          {arrDataRender.map((item, index) => {
            return (
              <Grid key={index} item xs={12} sm={12} md={3} lg={3}>
                <PaperCustom
                  index={index}
                  backgroundColor={WHITE}
                  value={item?.totalElements ?? 0}
                  contentTitle={hashEnumSubtitle[index]}
                  subtitle={index > 0 ? 'Xem danh sách' : ''}
                  title={hashEnumTitle[index]}
                  colorValue={index === 0 ? 'red' : undefined}
                />
              </Grid>
            )
          })}

          {arrDataRender[0].content?.length !== 0 && (
            <>
              <Grid item xs={12} sm={12}>
                <div className='flex gap-1 items-center mt-5'>
                  <Typography variant='h4'>
                    Danh sách các đề xuất sắp đến hạn
                  </Typography>
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Paper className='flex flex-col flex-auto shadow rounded-2xl  overflow-hidden'>
                  <TableProExpires data={arrDataRender[0].content} />
                </Paper>
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={12}>
            <div className='flex gap-1 items-center mt-5'>
              <Typography variant='h4'>Thống kê</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Paper
              sx={{ height: '55vh' }}
              className='flex flex-col flex-auto shadow rounded-2xl overflow-hidden'
            >
              <ChartDashBoard arrDataRender={arrDataRender} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Paper
              sx={{ height: '55vh' }}
              className='flex flex-col flex-auto shadow rounded-2xl  overflow-hidden'
            >
              <PieChartComponent />
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default General

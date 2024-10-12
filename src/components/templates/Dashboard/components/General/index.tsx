import { WarningText } from '@/components/atoms/WarningText'
import { Grid, Paper, Typography } from '@mui/material'
import PaperCustom from '../PaperCustom'
import ChartDashBoard from '../Chart'

type TypeDataPaperProps = {
  title: string
  value: number
  subtitle: string
  contentTitle: string
  unit?: string
}
const fakeData = [
  {
    title: 'Số kế hoạch',
    value: 7,
    subtitle: '',
    unit: '',
  },
  {
    title: 'Số kế hoạch được phê duyệt',
    value: 0,
    subtitle: '',
    unit: '',
  },
  {
    title: 'Số đề chi tiết',
    value: 3,
    subtitle: '',
    unit: '',
  },
  {
    title: 'Số bộ đề',
    value: 4,
    subtitle: '',
    unit: '',
  },
] as TypeDataPaperProps[]
const General = () => {
  return (
    <>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={12} className='flex justify-between'>
          {fakeData.map((item, index) => (
            <div key={index} className='w-1/5'>
              <PaperCustom
                value={item.value}
                contentTitle={item.contentTitle}
                subtitle={item?.subtitle}
                title={item.title}
                unit={item.unit}
              />
            </div>
          ))}
        </Grid>

        <Grid item xs={12} sm={12}>
          <div className='flex gap-1 items-center mt-5'>
            <Typography variant='h6'>Thông tin hàng hóa/dịch vụ</Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5}>
          <Paper className='flex flex-col flex-auto shadow rounded-2xl my-10 overflow-hidden'>
            <ChartDashBoard />
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default General

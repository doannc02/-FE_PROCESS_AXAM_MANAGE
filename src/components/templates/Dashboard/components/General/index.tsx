import { WarningText } from '@/components/atoms/WarningText'
import { Grid, Paper, Typography } from '@mui/material'
import PaperCustom from '../PaperCustom'
import ChartDashBoard from '../Chart'

const General = () => {
  return (
    <>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <PaperCustom />
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3}>
          <PaperCustom />
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3}>
          <PaperCustom />
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3}>
          <PaperCustom />
        </Grid>
        <Grid item xs={12} sm={12}>
          <div className='flex gap-1 items-center mt-5'>
            <Typography variant='h6'>Thông tin hàng hóa/dịch vụ</Typography>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={8}
          style={{
            marginBottom: '15px',
          }}
        >
          <Paper className='flex flex-col flex-auto shadow rounded-2xl overflow-hidden'>
            <ChartDashBoard />
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default General

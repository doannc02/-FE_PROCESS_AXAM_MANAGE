import { BLACK } from '@/helper/colors'
import { Grid, Typography } from '@mui/material'
import { ReactNode } from 'react'
type Props = {
  title: string
  data: ReactNode
}
export const RowBoxCommon = ({ title, data }: Props) => {
  return (
    <Grid item xs={12} sm={12} md={4} lg={4}>
      <Typography style={{ color: '#747475', fontSize: 12 }}>
        {title}
      </Typography>
      <Typography
        style={{
          color: '#4a4a4a',
          fontSize: 13,
          fontWeight: 'bold',
          marginTop: 12,
        }}
      >
        {data}
      </Typography>
    </Grid>
  )
}

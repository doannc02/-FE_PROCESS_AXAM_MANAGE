import { IconButton, Paper, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const PaperCustom = ({ data }: { data?: any }) => {
  const color = () => {
    if (data?.value > 0 && data?.value < 2) {
      return 'red'
    }
    if (data?.value > 1) {
      return 'green'
    }
    return 'blue'
  }

  return (
    <Paper className='flex flex-col flex-auto shadow rounded-2xl overflow-hidden'>
      <div className='flex items-center justify-between px-8 pt-12'>
        <Typography variant='h6' className='text-center' color='text.secondary'>
          title
        </Typography>
        <IconButton aria-label='more' size='large'>
          <MoreVertIcon />
        </IconButton>
      </div>
      <div className='text-center mt-20'>
        <Typography variant='h3' color={color()}>
          allll
        </Typography>
        <Typography variant='h6' color={color()}>
          name
        </Typography>
      </div>
      <Typography className='p-20 text-center' variant='h5'>
        <span className='truncate'>subtitle</span>:
        <b className='px-8'>content subtitle</b>
      </Typography>
    </Paper>
  )
}

export default PaperCustom

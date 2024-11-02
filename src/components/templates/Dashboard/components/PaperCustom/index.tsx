import { IconButton, Link, Paper, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { MENU_URL } from '@/routes'
import { useRouter } from 'next/router'

const PaperCustom = ({
  index,
  title,
  value,
  contentTitle,
  subtitle,
  unit,
  backgroundColor,
}: {
  index: number
  title: string
  value: number
  subtitle: string
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

  return (
    <Paper
      className='flex flex-col flex-auto shadow rounded-2xl overflow-hidden'
      style={{ backgroundColor: backgroundColor, margin: '10px' }}
    >
      <div className='flex items-center justify-between px-8 pt-12'>
        <Typography
          variant='body1'
          fontWeight={700}
          className='text-center'
          color='black'
        >
          {title}
        </Typography>
        <IconButton aria-label='more' size='large'>
          <MoreVertIcon />
        </IconButton>
      </div>
      <div className='text-center mt-20'>
        <Typography variant='h4' color={color()}>
          {value}
        </Typography>
        {true && (
          <Typography variant='body1' color={color()}>
            {unit}
          </Typography>
        )}
      </div>

      <Link
        onClick={() => {
          if (index > 0) onClick(index)
        }}
        className='cursor-pointer'
      >
        <Typography className='p-20 text-center' variant='h5'>
          {index > 0 && <span className='truncate'>{subtitle + ':'}</span>}
          <b className='px-2'>{contentTitle}</b>
        </Typography>
      </Link>
    </Paper>
  )
}

export default PaperCustom

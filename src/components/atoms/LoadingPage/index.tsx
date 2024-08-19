import { CircularProgress } from '@mui/material'

const LoadingPage = () => {
  return (
    <div className='relative h-full w-full'>
      <div className='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center z-99 table-loading'>
        <CircularProgress />
      </div>
      <div className='absolute top-0 bottom-0 left-0 right-0 bg-primary-50 opacity-30' />
    </div>
  )
}

export default LoadingPage

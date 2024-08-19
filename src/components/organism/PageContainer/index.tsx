import { WHITE } from '@/helper/colors'
import { Box } from '@mui/material'
import { ReactNode } from 'react'

const PageContainer = ({
  title,
  children,
}: {
  title?: ReactNode
  children: ReactNode
}) => {
  return (
    <Box className='w-full h-full overflow-hidden'>
      {title && title}

      <Box
        sx={{
          backgroundColor: WHITE,
          minHeight: title ? `calc( 100vh - 145px)` : `calc( 100vh - 116px)`,
        }}
      >
        <Box>{children}</Box>
      </Box>
    </Box>
  )
}

export default PageContainer

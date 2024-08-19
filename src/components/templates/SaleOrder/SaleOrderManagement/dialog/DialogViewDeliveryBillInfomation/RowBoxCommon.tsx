import { Box } from '@mui/material'
import { ReactNode } from 'react'
type Props = {
  title: string
  data: ReactNode
}
export const RowBoxCommon = ({ title, data }: Props) => {
  return (
    <Box
      sx={{
        borderBottom: '1px solid #DFE0EB',
      }}
    >
      <div className='grid grid-cols-2 gap-x-15'>
        <p className='text-[#747475] text-sm'>{title}</p>
        <p className='text-[#242424] text-sm font-bold whitespace-pre-line'>
          {data}
        </p>
      </div>
    </Box>
  )
}

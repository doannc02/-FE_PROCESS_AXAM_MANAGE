import { BLACK } from '@/helper/colors'
import { Box, Tooltip } from '@mui/material'

export const truncateText = (text: string) => {
  return (
    <Tooltip
      componentsProps={{
        tooltip: {
          style: {
            color: BLACK,
          },
        },
      }}
      title={<div>{text ?? ''}</div>}
      arrow
    >
      <Box className='line-clamp-2'>{text ?? ''}</Box>
    </Tooltip>
  )
}

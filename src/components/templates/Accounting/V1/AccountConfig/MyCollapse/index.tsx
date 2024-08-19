import { Box, Collapse, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { ReactNode, useState } from 'react'

type Props = {
  className?: string
  title: string
  children: ReactNode
}

const MyCollapse = ({ title, children, className }: Props) => {
  const [open, setOpen] = useState(true)
  return (
    <Box className={className} display='flex' flexDirection='column'>
      <div
        className='w-full h-[45px] bg-[#F6F7FB] flex justify-between items-center cursor-pointer px-15'
        style={{
          borderTop: '1px solid #DFE0EB',
          borderBottom: '1px solid #DFE0EB',
        }}
        onClick={() => setOpen(!open)}
      >
        <Typography variant='h6'>{title}</Typography>
        <KeyboardArrowDownIcon
          fontSize='small'
          style={{ transform: open ? 'rotate(180deg)' : undefined }}
        />
      </div>

      <Collapse in={open}>{children}</Collapse>
    </Box>
  )
}

export default MyCollapse

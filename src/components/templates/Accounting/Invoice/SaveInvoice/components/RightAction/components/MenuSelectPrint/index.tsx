import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { IconButton, Typography } from '@mui/material'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'
import { BLACK, PRIMARY } from '@/helper/colors'

export default function MenuSelectPrint({
  arraySelect,
}: {
  arraySelect: {
    icon?: any
    title: string
    fnSelect: () => void
  }[]
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        className='flex items-center cursor-pointer'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <LocalPrintshopIcon
          sx={{
            color: PRIMARY,
          }}
        />
        <Typography color={BLACK} variant='body2'>
          Print
        </Typography>
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {(arraySelect ?? []).map((item, index) => (
          <MenuItem key={index} onClick={item.fnSelect}>
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

import {
  GREEN,
  ORANGE,
  RED,
} from '@/helper/colors'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import React, { useState } from 'react'

const listBtn = [
  { status: 'DRAFT', color: ORANGE, label: 'Draft' },
  { status: 'PUBLISHED', color: GREEN, label: 'Publish' },
]

const ButtonStatus = (props: any) => {
  const { item, handleChangeStatus } = props

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box className='mr-10'>
      <Button
        fullWidth
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant='contained'
        sx={
          {
            width: '100px',
            backgroundColor:
              listBtn?.find((x) => x?.status === item?.status)?.color ?? RED,
            cursor: item?.status !== 'DRAFT' && 'default',
            fontWeight: 300,
            fontSize: 14,
            borderRadius: '4px',
            textTransform: 'none',
          } as any
        }
        endIcon={item?.status === 'DRAFT' && <KeyboardArrowDownIcon />}
      >
        {listBtn?.find((x) => x?.status === item?.status)?.label ?? 'Draft'}
      </Button>

      <Menu
        id='basic-menu'
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorEl={anchorEl}
        open={item?.status === 'DRAFT' && open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          style={{
            width: '100px',
            height: '32px',
            borderRadius: '6px',
            fontSize: 14,
          }}
          onClick={() => {
            handleChangeStatus('PUBLISHED')
            handleClose()
          }}
        >
          Publish
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default React.memo(ButtonStatus)

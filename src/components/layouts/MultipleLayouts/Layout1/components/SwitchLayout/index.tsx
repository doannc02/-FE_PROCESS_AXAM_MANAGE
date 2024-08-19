import { BLACK, WHITE } from '@/helper/colors'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Box, ButtonBase, Menu, MenuItem, Typography } from '@mui/material'
import React from 'react'
import { useRecoilState } from 'recoil'
import { layoutType } from '../../../layoutTypeRecoil'

const SwitchLayout = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [layout, setLayout] = useRecoilState(layoutType)

  return (
    <Box>
      <ButtonBase className='p-2' onClick={handleClick}>
        <Typography
          className='p-1'
          variant='body2'
          style={{
            color: layout === 'Layout1' ? WHITE : BLACK,
          }}
        >
          {layout}
        </Typography>

        {open ? (
          <KeyboardArrowUpIcon
            fontSize='small'
            style={{
              color: layout === 'Layout1' ? WHITE : BLACK,
            }}
          />
        ) : (
          <KeyboardArrowDownIcon
            fontSize='small'
            style={{
              color: layout === 'Layout1' ? WHITE : BLACK,
            }}
          />
        )}
      </ButtonBase>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'layout-button',
        }}
      >
        {['Layout1', 'Layout2'].map((item, index) => {
          return (
            <MenuItem onClick={() => setLayout(item as any)} key={index}>
              <Typography variant='body2' className='p-2'>
                {item}
              </Typography>
            </MenuItem>
          )
        })}
      </Menu>
    </Box>
  )
}

export default SwitchLayout

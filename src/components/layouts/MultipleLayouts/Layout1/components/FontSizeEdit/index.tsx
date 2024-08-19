import { WHITE } from '@/helper/colors'
import FormatSizeIcon from '@mui/icons-material/FormatSize'
import { Box } from '@mui/material'
import Menu from '@mui/material/Menu'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

const marks = [
  { value: 0.6, label: '60%' },
  { value: 0.7, label: '70%' },
  { value: 0.8, label: '80%' },
  { value: 0.9, label: '90%' },
  { value: 1, label: '100%' },
  { value: 1.1, label: '110%' },
  { value: 1.2, label: '120%' },
  { value: 1.4, label: '140%' },
  { value: 1.3, label: '130%' },
]

function FontSizeEdit(props: { isWhite?: boolean }) {
  const { isWhite } = props
  const [anchorEl, setAnchorEl] = useState(null)
  const [fontSize, setFontSize] = useState<number | number[]>(1)

  function changeHtmlFontSize() {
    const html = document.getElementsByTagName('html')[0]
    if (typeof fontSize === 'number') html.style.fontSize = `${fontSize * 100}%`
  }

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Box
        onClick={handleClick}
        sx={{
          position: 'relative',
          marginTop: '4px',
        }}
      >
        <FormatSizeIcon
          style={{ color: isWhite ? WHITE : undefined }}
          fontSize='small'
        />
      </Box>

      <Menu
        classes={{ list: 'w-200' }}
        id='font-size-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className='p-12 relative'>
          <Typography className='flex items-center justify-center text-16 font-semibold pb-8'>
            <FormatSizeIcon fontSize='medium' />
            Font Size
          </Typography>
          <Slider
            classes={{ markLabel: 'text-12 font-semibold' }}
            value={fontSize}
            track={false}
            aria-labelledby='discrete-slider-small-steps'
            step={0.1}
            marks={marks}
            min={0.6}
            max={1.4}
            valueLabelDisplay='off'
            onChange={(ev, value) => setFontSize(value)}
            onChangeCommitted={changeHtmlFontSize}
          />
        </div>
      </Menu>
    </div>
  )
}

export default FontSizeEdit

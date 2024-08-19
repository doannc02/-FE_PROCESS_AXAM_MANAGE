import { WHITE } from '@/helper/colors'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Menu, Typography } from '@mui/material'
import { useState } from 'react'

export const Notifications = ({ numberUnRead }: { numberUnRead: number }) => {
  const [anchorEl, setAnchorEl] = useState<any>(null)

  return (
    <>
      <div
        className='relative text-white cursor-pointer mt-2'
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <NotificationsIcon fontSize='small' />

        <div className='absolute -top-[4px] left-1/2 h-7 w-7 bg-[#FF4956] rounded-full flex items-center justify-center'>
          <Typography
            style={{
              color: WHITE,
              fontSize: 8,
            }}
          >
            {numberUnRead}
          </Typography>
        </div>
      </div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        classes={{
          root: 'mt-3',
        }}
      >
        <div className='flex flex-col w-201 min-h-100 m-2'>
          <div className='flex items-center px-5 pt-2'>
            <Typography variant='h5'>Thông báo</Typography>
          </div>

          <div className='flex gap-2 px-5 mt-8'>
            <div className='w-31 h-13 text-white bg-[#0078D4] rounded-[4px] flex justify-center items-center'>
              <Typography variant='body2'>Tất cả</Typography>
            </div>
            <div className='w-31 h-13 text-white bg-[#0078D4] rounded-[4px] flex justify-center items-center'>
              <Typography variant='body2'>Chưa đọc</Typography>
            </div>
          </div>
        </div>
      </Menu>
    </>
  )
}

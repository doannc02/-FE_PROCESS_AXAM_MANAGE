import { Menu, Typography } from '@mui/material'
import { useState } from 'react'
import AppearOfflineIcon from './StateIcon/AppearOfflineIcon'
import AvailableIcon from './StateIcon/AvailableIcon'
import BeRightBackIcon from './StateIcon/BeRightBackIcon'
import BusyIcon from './StateIcon/BusyIcon'
import DoNotDisturbIcon from './StateIcon/DoNotDisturbIcon'
import DurationIcon from './StateIcon/DurationIcon'
import ResetStatusIcon from './StateIcon/ResetStatusIcon'

type StateAccount =
  | 'Available'
  | 'AppearOffline'
  | 'BeRightBack'
  | 'Busy'
  | 'DoNotDisturb'
  | 'Duration'
  | 'ResetStatus'

export const StateAccount = () => {
  const [stateAccount, setStateAccount] = useState<StateAccount>('Available')
  const className = 'absolute top-[15px] right-[3px]'

  const [anchorEl, setAnchorEl] = useState<any>(null)

  const handleClick = (e: any) => setAnchorEl(e.currentTarget)

  const handleChangeState = (state: StateAccount) => {
    setStateAccount(state)
    setAnchorEl(null)
  }

  return (
    <div>
      <div onClick={handleClick} className='cursor-pointer'>
        {stateAccount === 'Available' && (
          <AvailableIcon className={className} />
        )}

        {stateAccount === 'AppearOffline' && (
          <AppearOfflineIcon className={className} />
        )}

        {stateAccount === 'BeRightBack' && (
          <BeRightBackIcon className={className} />
        )}

        {stateAccount === 'Busy' && <BusyIcon className={className} />}

        {stateAccount === 'DoNotDisturb' && (
          <DoNotDisturbIcon className={className} />
        )}

        {stateAccount === 'Duration' && <DurationIcon className={className} />}

        {stateAccount === 'ResetStatus' && (
          <ResetStatusIcon className={className} />
        )}
      </div>

      <Menu
        classes={{
          paper: 'w-65 h-110 pt-2',
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <div className='flex flex-col gap-2'>
          <div
            className='flex gap-2 items-center cursor-pointer px-8'
            onClick={() => handleChangeState('Available')}
          >
            <AvailableIcon />
            <Typography variant='body2' sx={{ mt: '1px' }}>
              Available
            </Typography>
          </div>

          <div
            className='flex gap-2 items-center cursor-pointer px-8'
            onClick={() => handleChangeState('Busy')}
          >
            <BusyIcon />
            <Typography variant='body2' sx={{ mt: '1px' }}>
              Busy
            </Typography>
          </div>
          <div
            className='flex gap-2 items-center cursor-pointer px-8'
            onClick={() => handleChangeState('DoNotDisturb')}
          >
            <DoNotDisturbIcon />
            <Typography variant='body2' sx={{ mt: '1px' }}>
              Do not disturb
            </Typography>
          </div>
          <div
            className='flex gap-2 items-center cursor-pointer px-8'
            onClick={() => handleChangeState('BeRightBack')}
          >
            <BeRightBackIcon />
            <Typography variant='body2' sx={{ mt: '1px' }}>
              Be right back
            </Typography>
          </div>
          <div
            className='flex gap-2 items-center cursor-pointer px-8'
            onClick={() => handleChangeState('AppearOffline')}
          >
            <AppearOfflineIcon />
            <Typography variant='body2' sx={{ mt: '1px' }}>
              Appear Offline
            </Typography>
          </div>

          <div className='w-full h-[1px] bg-[#DFE0EB] my-1'></div>

          <div
            className='flex gap-2 items-center cursor-pointer px-8'
            onClick={() => handleChangeState('Duration')}
          >
            <DurationIcon />
            <Typography variant='body2' sx={{ mt: '1px' }}>
              Duration
            </Typography>
          </div>

          <div className='w-full h-[1px] bg-[#DFE0EB] my-1'></div>

          <div
            className='flex gap-2 items-center cursor-pointer px-8'
            onClick={() => handleChangeState('Available')}
          >
            <ResetStatusIcon />
            <Typography variant='body2' sx={{ mt: '1px' }}>
              Reset Status
            </Typography>
          </div>
        </div>
      </Menu>
    </div>
  )
}

import { GREEN_VIU } from '@/helper/colors'
import { Typography } from '@mui/material'
import { ReactNode } from 'react'

const PageWithDetail = ({
  title,
  children,
  tabName,
  topAction,
}: {
  title?: ReactNode
  children: ReactNode
  tabName?: string
  topAction?: ReactNode
}) => {
  return (
    <div className='w-full h-full overflow-auto'>
      {title && title}

      <div className='flex flex-col'>
        <div
          id='tab'
          className='w-full h-18 flex justify-between'
          style={{
            borderBottom: '2px solid #0078D4',
          }}
        >
          <div
            style={{
              width:'90px',
              backgroundColor: GREEN_VIU,
              borderRadius: '4px 4px 0px 0px',
              padding: '10px 20px 10px 20px',
              color: 'white',
            }}
            className='flex items-center justify-center'
          >
            <Typography>{tabName ? tabName : 'Chi tiết'} </Typography>
          </div>

          {topAction && topAction}
        </div>
        <div
          style={{
            boxShadow: '0px 0px 8px 0px #0000000D',
            minHeight: title ? `calc( 100vh - 185px)` : `calc( 100vh - 116px)`,
            border: '1px solid #DFE0EB',
            padding: '32px',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default PageWithDetail

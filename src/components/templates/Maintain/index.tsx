import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { Typography } from '@mui/material'
import Image from 'next/image'

const Maintain = () => {
  return (
    <div className='relative h-screen w-screen flex items-center justify-center'>
      <div className='h-30 w-full px-10 absolute top-0 left-0'>
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: '500',
            },
          ]}
        />
      </div>

      <div
        className='flex flex-col gap-10 items-center justify-center w-[1084px] h-330'
        style={{
          boxShadow: '0px 2px 4px -1px #74747529, 0px 3px 12px -1px #74747542',
        }}
      >
        <Image src={require('@/assets/png/500.png')} alt='500' />

        <Typography variant='h5'>
          Chúng tôi đang bảo trì theo lịch trình.
        </Typography>

        <Typography variant='subtitle1'>
          Xin lỗi vì sự bất tiện này, chúng tôi sẽ quay lại ngay.
        </Typography>
      </div>
    </div>
  )
}

export default Maintain

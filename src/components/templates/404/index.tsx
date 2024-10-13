import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

const Page404 = () => {
  return (
    <div className='relative h-screen w-screen flex items-center justify-center'>
      <div className='h-30 w-full px-10 absolute top-0 left-0'>
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: '404',
            },
          ]}
        />
      </div>

      <div className='flex flex-col gap-10 items-center justify-center'>
        <Image src={require('@/assets/png/404.png')} alt='404' />

        <Typography variant='h5'>Ooops... 404!</Typography>
        <Typography variant='subtitle1'>
          Trang bạn yêu cầu không thể được tìm thấy.
        </Typography>

        <Link href={'/dashboard'} className='text-[#0078D4]'>
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  )
}

export default Page404

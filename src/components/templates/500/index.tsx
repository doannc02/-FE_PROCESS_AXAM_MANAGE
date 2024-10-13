import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

const Page500 = () => {
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

      <div className='flex flex-col gap-10 items-center justify-center'>
        <Image src={require('@/assets/png/500.png')} alt='500' />

        <Typography variant='h5'>Đã xảy ra lỗi!</Typography>

        <Typography
          variant='subtitle1'
          style={{
            marginTop: '4px',
            textAlignLast: 'center',
            lineHeight: '24px',
          }}
        >
          Lỗi máy chủ. Chúng tôi đang tìm cách khắc phục mong bạn thông cảm.
        </Typography>

        <Link href={'/dashboard'} className='text-[#0078D4]'>
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  )
}

export default Page500

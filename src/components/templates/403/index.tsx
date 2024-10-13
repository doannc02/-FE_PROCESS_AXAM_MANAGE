import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

const Page403 = () => {
  return (
    <div className='relative h-screen w-screen flex items-center justify-center'>
      <div className='h-30 w-full px-10 absolute top-0 left-0'>
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: '403',
            },
          ]}
        />
      </div>

      <div className='flex flex-col gap-10 items-center justify-center w-[550px]'>
        <Image src={require('@/assets/png/403.png')} alt='403' />

        <Typography variant='h5'>Không có quyền truy cập!</Typography>
        <Typography
          variant='subtitle1'
          style={{
            marginTop: '4px',
            textAlignLast: 'center',
            lineHeight: '24px',
          }}
        >
          Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ với bộ
          phận hỗ trợ nếu điều này đáng lẽ không nên xảy ra.
        </Typography>

        <Link href={'/dashboard'} className='text-[#0078D4]'>
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  )
}

export default Page403

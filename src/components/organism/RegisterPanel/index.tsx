import {
  Stack,
  Table,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material'
import Image from 'next/image'
import styles from './styles.module.css'
import { WHITE } from '@/helper/colors'
import zIndex from '@mui/material/styles/zIndex'

const RegisterPanel = () => {
  const matches = useMediaQuery('(max-width:640px)')

  if (matches) return null

  return (
    <div className={`flex flex-1 ${styles.imageBg} bg-lime-600 w-1/2`}>
      <div className={`w-full p-20 h-full flex-1 ${styles.frameBg}`}>
        <Stack width={'100%'} direction={'row'} justifyContent={'space-around'}>
          <div className='w-[100px] h-[100px]'>
            <Image
              style={{ border: '1px solid', borderRadius: '990px', zIndex: 21 }}
              width={100}
              height={100}
              alt='logoVH'
              src={require('@/assets/jpg/logoVH.jpg')}
            />
          </div>
          <div className='w-2/3 pt-7'>
            <Table className=''>
              <TableHead>
                <TableRow>
                  <Typography
                    className='flex justify-center'
                    variant='h5'
                    style={{
                      color: WHITE,
                      lineHeight: '2.4rem',
                    }}
                  >
                    TRƯỜNG ĐHCN VIỆT - HUNG
                  </Typography>
                </TableRow>
                <TableRow className='flex justify-center'>
                  <Typography
                    className='flex justify-center'
                    variant='h6'
                    style={{
                      color: WHITE,
                    }}
                  >
                    Khoa Công nghệ thông tin
                  </Typography>
                </TableRow>
              </TableHead>
            </Table>
          </div>
        </Stack>

        <div className='flex h-full items-center justify-center px-10 pb-35'>
          <Typography
            style={{
              color: WHITE,
              lineHeight: '2.4rem',
            }}
            variant='body1'
          >
            Mô đun “Quản lý quy trình xây dựng ngân hàng đề thi thực hành cho
            website Khoa Công nghệ thông tin trường Đại học Công Nghiệp Việt –
            Hung” là một mô đun được thiết kế cho đối tượng là các giảng viên
            Khoa công nghệ thông tin nhằm tối ưu hóa và nâng cao quy trình tạo
            lập, xem xét, và phê duyệt các đề thi và đồ án trong Khoa Công nghệ
            thông tin của trường ĐHCN Việt – Hung. Mô đun này được tùy chỉnh để
            đáp ứng các nhu cầu cụ thể của Khoa Công nghệ thông tin, đảm bảo
            rằng việc chuẩn bị và phê duyệt các tài liệu thi được thực hiện hiệu
            quả, minh bạch, và tuân thủ các tiêu chuẩn đảm bảo chất lượng.
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default RegisterPanel

import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import PageContainer from '@/components/organism/PageContainer'
import { WHITE } from '@/helper/colors'
import { useCheckPath } from '@/path'
import { MENU_URL } from '@/routes'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import ExpandableListItem from './components/collapseCustom'
import CustomCompareTable from './components/tableCompareCustom'
import useDetailHisUpdate from './useDetailHisUpdate'

const DetailHisUpdate = () => {
  const router = useRouter()
  const { id_history, code, id } = router.query

  const [{ tableData, paymentMethod, isLoading, paymentMethodURL }, { t }] =
    useDetailHisUpdate({
      id: Number(id_history),
    })
  const { paymentType } = useCheckPath()

  function capitalizeFirstLetter(str: any) {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1)
  }

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title:
                paymentMethod === 'CASH'
                  ? 'Kế toán tiền mặt'
                  : 'Kế toán ngân hàng',
            },
            {
              title:
                paymentType === 'INBOUND'
                  ? t('title.inbound')
                  : t('title.outbound'),
              pathname: MENU_URL[paymentMethodURL][paymentType],
            },
            {
              title: !!id_history ? code : t('common:btn.add'),
              pathname: `${MENU_URL[paymentMethodURL][paymentType]}/${id}`,
            },
            { title: 'Lịch sử chỉnh sửa' },
          ]}
        />
      }
    >
      <ExpandableListItem
        contentHeder={
          <div
            className='flex items-center justify-evenly h-20'
            style={{
              backgroundColor: '#F6F7FB',
              border: '1px solid #DFE0EB',
            }}
          >
            <Typography variant='subtitle1' sx={{ textAlign: 'center' }}>
              Nội dung thay đổi
            </Typography>
            <Typography variant='subtitle1' sx={{ textAlign: 'center' }}>
              Nội dung cũ
            </Typography>
          </div>
        }
        header={
          <div className='flex justify-start item-center'>
            <Typography variant='subtitle1'>Thông tin chung</Typography>
          </div>
        }
        content={
          <div className='flex justify-between align-middle'>
            <CustomCompareTable data={tableData} />
          </div>
        }
      />

      <Box className='mt-15 m-4'>
        <Box
          sx={{
            backgroundColor: WHITE,
            border: '1px solid #DFE0EB',
          }}
        >
          <div className='flex h-20 items-center'>
            <div
              className='h-full flex justify-center items-center w-65'
              style={{
                borderRight: '1px solid #DFE0EB',
              }}
            >
              <Typography variant='body1'>Lý do thay đổi</Typography>
            </div>
            <div
              className='h-full w-full flex justify-end'
              style={{
                borderBottom: '1px solid #DFE0EB',
              }}
            />
          </div>
          <Box className='p-10'>
            <Typography variant='body1'>
              {capitalizeFirstLetter(
                tableData?.paymentChange?.reason ?? tableData?.createdBy
              )}
            </Typography>
          </Box>
        </Box>
      </Box>
    </PageContainer>
  )
}

export default DetailHisUpdate

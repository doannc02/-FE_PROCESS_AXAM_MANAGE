import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import PageWithDetail from '@/components/organism/PageWithDetail'
import CustomCompareTable, {
  TableCompareInfInvoice,
} from '@/components/templates/Accounting/Customer/CustomerInvoice/DetailHisUpdate/components/tableCompareCustom'
import { WHITE } from '@/helper/colors'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import ExpandableListItem from './components/ExpandableListItem'
import useDetailHisUpdate from './useDetailHisUpdate'
import {
  typeInvoiceOrRefund,
  typePathInvoiceNew,
} from '../../../Invoice/Helper/typeInvoiceNew'
import { displayTitleHis } from '@/enum'
import { useCheckPath } from '@/path'

const DetailHisUpdate = () => {
  const [isShowCollapse, setIsShowCollapse] = useState<boolean>(false)
  const [isShowCollapse2, setIsShowCollapse2] = useState<boolean>(false)
  const [isShowCollapse3, setIsShowCollapse3] = useState<boolean>(false)
  const setShowCollapse = (stt: number) => {
    if (stt === 2) {
      return setIsShowCollapse2(true)
    } else if (stt === 3) {
      return setIsShowCollapse3(true)
    } else return setIsShowCollapse(true)
  }
  const router = useRouter()
  const typeInvoice =
    router.asPath.includes('/provider/providerRefund') ||
    router.asPath.includes('/customer/customerInvoice')
      ? 'REVENUE'
      : 'EXPENDITURE'

  const { id, name, code, historyType, id_history } = router.query
  const [values, handles] = useDetailHisUpdate({ id: Number(id_history) })
  const { tableData, isLoading } = values
  function capitalizeFirstLetter(str: any) {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1)
  }

  const {
    typeInvoice: typeIn,
    typeOfInvoice,
    invoiceCk,
    typePath,
    typeOfInvoiceCustomer,
  } = useCheckPath()

  const typePathRedirect = useMemo(() => {
    return typePathInvoiceNew(
      typePath,
      invoiceCk,
      typeOfInvoiceCustomer,
      typeIn,
      typeOfInvoice
    )
  }, [invoiceCk, typeIn, typeOfInvoice, typeOfInvoiceCustomer, typePath])
  return (
    <>
      <PageWithDetail
        title={
          <CoreBreadcrumbs
            isShowDashboard
            breadcrumbs={[
              {
                title: (
                  <div
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={() => router.push(typePathRedirect)}
                  >
                    <Typography>
                      Danh sách chứng từ{' '}
                      {displayTitleHis[typeInvoiceOrRefund({ router })]}
                    </Typography>
                    <div className='flex gap-4 items-center'></div>
                  </div>
                ),
              },
              {
                title: (
                  <div
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={() => router.back()}
                  >
                    <Typography>Chứng từ {code}</Typography>
                    <div className='flex gap-4 items-center'></div>
                  </div>
                ),
              },
              {
                title:
                  historyType !== 'OUTBOUND'
                    ? `Lịch sử ${String(code)}`
                    : `Lịch sử ${String(code)}`,
              },
              // {
              //   title:
              //     historyType !== 'OUTBOUND'
              //       ? `Lịch sử ${String(code)}`
              //       : `Lịch sử ${String(code)}`,
              // },
            ]}
          />
        }
      >
        <div className='py-25'>
          <ExpandableListItem
            isShowCollapse={isShowCollapse}
            contentHeder={
              <div
                className='flex items-center justify-evenly h-20'
                style={{
                  backgroundColor: '#F6F7FB',
                  border: '1px solid #DFE0EB',
                }}
              >
                <Typography fontWeight='500' sx={{ textAlign: 'center' }}>
                  Nội dung thay đổi
                </Typography>
                <Typography fontWeight='500' sx={{ textAlign: 'center' }}>
                  Nội dung cũ
                </Typography>
              </div>
            }
            header={
              <div className='flex justify-start item-center'>
                <Typography fontWeight='500'>Thông tin chung</Typography>
              </div>
            }
            content={
              <div className='flex justify-between align-middle'>
                <CustomCompareTable
                  setShowCollapse={setShowCollapse}
                  data={tableData}
                  isLoading={isLoading}
                  isTTInvoice={false}
                  typeInvoice={typeInvoice}
                />
              </div>
            }
          />
          <ExpandableListItem
            isShowCollapse={isShowCollapse2}
            header={
              <div className='flex justify-start item-center'>
                <Typography fontWeight='500'>Thông tin chứng từ</Typography>
              </div>
            }
            content={
              <TableCompareInfInvoice
                setShowCollapse={setShowCollapse}
                data={tableData}
                isLoading={isLoading}
              />
            }
          />
          <ExpandableListItem
            isShowCollapse={isShowCollapse3}
            header={
              <div className='flex justify-start item-center'>
                <Typography fontWeight='500'>Thông tin thanh toán</Typography>
              </div>
            }
            content={
              <div className='flex justify-between align-middle'>
                <CustomCompareTable
                  setShowCollapse={setShowCollapse}
                  data={tableData}
                  isLoading={isLoading}
                  isTTInvoice={true}
                />
              </div>
            }
          />
        </div>
        <Box className='m-10'>
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
                <Typography
                  sx={{
                    padding: '2px',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: '700',
                  }}
                >
                  Lý do thay đổi
                </Typography>
              </div>
              <div
                className='h-full w-full flex justify-end'
                style={{
                  borderBottom: '1px solid #DFE0EB',
                }}
              />
            </div>
            <Box className='p-15'>
              {tableData?.invoiceChange?.reason
                ? capitalizeFirstLetter(
                    tableData?.invoiceChange?.reason ?? tableData?.createdBy
                  )
                : ''}
            </Box>
          </Box>
        </Box>
      </PageWithDetail>
    </>
  )
}

export default DetailHisUpdate

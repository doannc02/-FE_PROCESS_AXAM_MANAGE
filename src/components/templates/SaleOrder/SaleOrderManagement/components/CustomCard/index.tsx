import {
  BACK_GROUND,
  RED,
  WHITE,
} from '@/helper/colors'
import { Box, ButtonBase } from '@mui/material'
import React, { useState } from 'react'
// import { OrderSaleDetails } from '../OrderSaleDetails'
// import { DeliveryBillDetail } from '../DeliveryBillDetail'
// import { useListInvoiceBySaleOrderDialog } from '../../CreateAndUpdateSaleOrder/dialog/ListInvoiceBySaleOrderDialog/useListInvoiceBySaleOrderDialog'
import { CustomTable } from '@/components/organism/TableCustom'
import { useListInvoiceBySaleOrderDialog } from '../../dialog/ListInvoiceBySaleOrderDialog/useListInvoiceBySaleOrderDialog'

interface Props {
  id: number
  code: string
  hideInfo: boolean
}

const CustomCard = (props: Props) => {
  const { id, code, hideInfo } = props
  const [step, setStep] = useState(0)

  const [values, handles] = useListInvoiceBySaleOrderDialog(id)
  const {columns, tableData} = values

  const listContentGeneral = [
    {
      name: 'Tổng quan',
      // content: <OrderSaleDetails id={id} />,
      content: <>Tong quan</>
    },
  ]

  const listContent = [
    {
      name: 'Tổng quan',
     // content: <OrderSaleDetails id={id} />,
     content: <>a</>
    },
    {
      name: 'Phiếu xuất kho',
    //  content: <DeliveryBillDetail code={code} />,
    content: <>k</>
    },
    {
      name: 'Hóa đơn',
      content: <>
        <CustomTable columns={columns} data={tableData}/>
      </>,
    },
  ]

  return (
    <Box className='w-full my-15' style={{ border: '1px solid #DFE0EB' }}>
      <Box className='w-full flex'>
        {(hideInfo ? listContentGeneral : listContent).map((v, index) => {
          const isChecked = step === index
          return (
            <ButtonBase key={index} onClick={() => setStep(index)}>
              <Box
                className='px-10 py-7'
                sx={{
                  borderBottom: !isChecked ? '1px solid #DFE0EB' : undefined,
                  borderRight: '1px solid #DFE0EB',
                  backgroundColor: isChecked ? WHITE : BACK_GROUND,
                }}
              >
                {v.name}
              </Box>
            </ButtonBase>
          )
        })}
        <Box className='grow' sx={{ borderBottom: '1px solid #DFE0EB' }}></Box>
      </Box>
      <Box className='w-full p-15'>{listContent?.[step]?.content}</Box>
    </Box>
  )
}

export default CustomCard

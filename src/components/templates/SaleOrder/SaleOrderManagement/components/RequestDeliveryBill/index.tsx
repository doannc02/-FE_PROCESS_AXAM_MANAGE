// import { CoreButton } from '@/components/atoms/CoreButton'
// import { CoreDatePicker} from '@/components/atoms/CoreDatePicker'
// import { CustomTable } from '@/components/organism/TableCustom'
// import { useRequestDeliveryBill } from './useRequestDeliveryBill'
// import { useDialog } from '@/components/hooks/dialog/useDialog'
// import { DeliveryBill as DeliveryBillType } from '@/service/salesOrder/salesOrder/getSalesOrderLine/type'
// import { Box, ButtonBase, Typography } from '@mui/material'
// import { useRouter } from 'next/router'
// import Image from 'next/image'

// type Props = {
//   id: number
//   type: string
//   data: DeliveryBillType
//   defaultOpen?: boolean
//   handleFetchData: any
// }

// export const RequestDeliveryBill = (props: Props) => {
//   const { id, type, data, defaultOpen = false } = props
//   const [values, handles] = useRequestDeliveryBill(type, data, props)
//   const router = useRouter()

//   const {
//     control,
//     columns,
//     dataTable,
//     isLoading,
//     formState: { isSubmitting },
//     watch,
//     stateDelivery,
//     isEdit,
//   } = values

//   const { onSubmit, setIsLoading, setIsEdit, handleEdit, handleRejectBill } =
//     handles
//   const { hideDialog } = useDialog()

//   return (
//     <AccordionCustom
//       title={
//         <div className='flex justify-between w-full'>
//           <p className='font-medium'>{data.codeRequestStock}</p>
//           <Box className='flex'>
//             {data.status !== 'CANCELED' && (
//               <ButtonBase
//                 className='flex gap-3'
//                 onClick={(e) => {
//                   //do st
//                   e.stopPropagation()
//                   router.push(
//                     `/salesOrder/saleOrderManagement/${data.id}/print/requestExport?name=${data.code}&orderId=${data.orderId}`
//                   )
//                   hideDialog()
//                 }}
//               >
//                 <Image src={require('@/assets/svg/action/print.svg')} alt='' />
//                 <Typography>In yêu cầu xuất kho</Typography>
//               </ButtonBase>
//             )}
//             {data.status !== 'DRAFT' && (
//               <p
//                 style={{
//                   marginLeft: '10px',
//                   color: stateDelivery[`${data.status}`].colorCode,
//                 }}
//               >
//                 {stateDelivery[`${data.status}`].label}
//               </p>
//             )}
//           </Box>
//         </div>
//       }
//       defaultOpen={defaultOpen}
//     >
//       <form onSubmit={onSubmit}>
//         <div className='py-6 px-20'>
//           {data.status === 'WAITING' && (
//             // data.status !== 'CANCELED' &&
//             <div className='w-full flex flex-end'>
//               <p
//                 className={
//                   isEdit
//                     ? `ml-auto font-semibold italic cursor-pointer`
//                     : `ml-auto font-semibold italic cursor-pointer text-[#213660]`
//                 }
//                 onClick={() => {
//                   handleEdit()
//                 }}
//               >
//                 Chỉnh sửa
//               </p>
//             </div>
//           )}
//           <CustomTable
//             data={dataTable}
//             columns={columns}
//             paginationHidden
//             isShowColumnStt
//           />
//           {(isEdit || data.status === 'DRAFT') && (
//             <div className='w-1/2 my-12'>
//               <CoreDatePicker
//                 title='Ngày dự kiến xuất kho'
//                 control={control}
//                 name='applyDate'
//                 minDate={new Date()}
//               />
//             </div>
//           )}

//           <div className='flex justify-center items-center w-full my-13'>
//             {data.status === 'DRAFT' && (
//               <div className='flex gap-10'>
//                 <CoreButton
//                   theme='cancel'
//                   className=''
//                   onClick={() => hideDialog()}
//                 >
//                   Huỷ
//                 </CoreButton>
//                 <LoadingButtonCustom
//                   loading={isSubmitting}
//                   theme='submit'
//                   type='submit'
//                   className=''
//                 >
//                   Yêu cầu xuất kho
//                 </LoadingButtonCustom>
//               </div>
//             )}
//             {isEdit && (
//               <div className='flex gap-10'>
//                 <CoreButton
//                   theme='cancel'
//                   // type='submit'
//                   className=''
//                   onClick={() => hideDialog()}
//                 >
//                   Huỷ
//                 </CoreButton>
//                 <LoadingButtonCustom
//                   loading={isSubmitting}
//                   theme='reset'
//                   // type='submit'
//                   className=''
//                   onClick={() => {
//                     handleRejectBill()
//                   }}
//                 >
//                   Huỷ yêu cầu
//                 </LoadingButtonCustom>
//                 <LoadingButtonCustom
//                   loading={isSubmitting}
//                   theme='submit'
//                   type='submit'
//                   className=''
//                 >
//                   Chỉnh sửa yêu cầu
//                 </LoadingButtonCustom>
//               </div>
//             )}
//           </div>
//         </div>
//       </form>
//     </AccordionCustom>
//   )
// }

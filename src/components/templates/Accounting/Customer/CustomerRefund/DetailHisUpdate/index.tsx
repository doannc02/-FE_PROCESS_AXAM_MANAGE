// import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
// import PageWithDetail from '@/components/organism/PageWithDetail'
// import CustomCompareTable, {
//   TableCompareInfInvoice,
// } from '@/components/templates/Accounting/Customer/CustomerInvoice/DetailHisUpdate/components/tableCompareCustom'
// import { WHITE } from '@/helper/colors'
// import { MENU_URL } from '@/routes'
// import { Box, Typography } from '@mui/material'
// import { useRouter } from 'next/router'
// import { useState } from 'react'
// import ExpandableListItem from '../../CustomerInvoice/DetailHisUpdate/components/ExpandableListItem'
// import useDetailHisUpdate from './useDetailHisUpdate'

// const DetailHisUpdate = () => {
//   const router = useRouter()
//   const { id, name, code, historyType } = router.query
//   const [values, handles] = useDetailHisUpdate({ id: Number(id) })
//   const { tableData, isLoading } = values
//   function capitalizeFirstLetter(str: any) {
//     return str?.charAt(0)?.toUpperCase() + str?.slice(1)
//   }
//   const typeInvoice = router.asPath.includes('_REFUND')
//     ? 'REFUND'
//     : router.asPath.includes('_INVOICE')
//     ? 'INVOICE'
//     : ''
//   const [isShowCollapse, setIsShowCollapse] = useState<boolean>(false)
//   const [isShowCollapse2, setIsShowCollapse2] = useState<boolean>(false)
//   const [isShowCollapse3, setIsShowCollapse3] = useState<boolean>(false)
//   const setShowCollapse = (stt: number) => {
//     if (stt === 2) {
//       return setIsShowCollapse2(true)
//     } else if (stt === 3) {
//       return setIsShowCollapse3(true)
//     } else return setIsShowCollapse(true)
//   }
//   return (
//     <>
//       <PageWithDetail
//         title={
//           <div
//             className='flex justify-between w-full'
//             onClick={() =>
//               router.replace({
//                 pathname: `${MENU_URL.CUSTOMER.REFUND}/[id]`,
//                 query: {
//                   id,
//                 },
//               })
//             }
//           >
//             <CoreBreadcrumbs
//               textPrev={
//                 historyType !== 'OUTBOUND'
//                   ? `${String(code)}`
//                   : `${String(code)}`
//               }
//               textCurrent={String(name)}
//             />
//           </div>
//         }
//       >
//         <div className='py-25'>
//           <ExpandableListItem
//             isShowCollapse={isShowCollapse}
//             contentHeder={
//               <div
//                 className='flex items-center justify-evenly h-20'
//                 style={{
//                   backgroundColor: '#F6F7FB',
//                   border: '1px solid #DFE0EB',
//                 }}
//               >
//                 <Typography fontWeight='500' sx={{ textAlign: 'center' }}>
//                   Nội dung thay đổi
//                 </Typography>
//                 <Typography fontWeight='500' sx={{ textAlign: 'center' }}>
//                   Nội dung cũ
//                 </Typography>
//               </div>
//             }
//             header={
//               <div className='flex justify-start item-center'>
//                 <Typography fontWeight='500'>Thông tin chung</Typography>
//               </div>
//             }
//             content={
//               <div className='flex justify-between align-middle'>
//                 <CustomCompareTable
//                   setShowCollapse={setShowCollapse}
//                   data={tableData}
//                   isLoading={isLoading}
//                   isTTInvoice={false}
//                   typeInvoice={typeInvoice}
//                 />
//               </div>
//             }
//           />
//           <ExpandableListItem
//             isShowCollapse={isShowCollapse2}
//             header={
//               <div className='flex justify-start item-center'>
//                 <Typography fontWeight='500'>Thông tin chứng từ</Typography>
//               </div>
//             }
//             content={
//               <TableCompareInfInvoice
//                 setShowCollapse={setShowCollapse}
//                 data={tableData}
//                 isLoading={isLoading}
//               />
//             }
//           />
//           <ExpandableListItem
//             isShowCollapse={isShowCollapse3}
//             header={
//               <div className='flex justify-start item-center'>
//                 <Typography fontWeight='500'>Thông tin thanh toán</Typography>
//               </div>
//             }
//             content={
//               <div className='flex justify-between align-middle'>
//                 <CustomCompareTable
//                   setShowCollapse={setShowCollapse}
//                   data={tableData}
//                   isLoading={isLoading}
//                   isTTInvoice={true}
//                 />
//               </div>
//             }
//           />
//         </div>
//         <Box className='m-10'>
//           <Box
//             sx={{
//               backgroundColor: WHITE,
//               border: '1px solid #DFE0EB',
//             }}
//           >
//             <div className='flex h-20 items-center'>
//               <div
//                 className='h-full flex justify-center items-center w-65'
//                 style={{
//                   borderRight: '1px solid #DFE0EB',
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     padding: '2px',
//                     textAlign: 'center',
//                     fontSize: '14px',
//                     fontWeight: '400',
//                   }}
//                 >
//                   Lý do thay đổi
//                 </Typography>
//               </div>
//               <div
//                 className='h-full w-full flex justify-end'
//                 style={{
//                   borderBottom: '1px solid #DFE0EB',
//                 }}
//               />
//             </div>
//             <Box className='p-15'>
//               {tableData?.invoiceChange?.reason
//                 ? capitalizeFirstLetter(
//                     tableData?.invoiceChange?.reason ?? tableData?.createdBy
//                   )
//                 : ''}
//             </Box>
//           </Box>
//         </Box>
//       </PageWithDetail>
//     </>
//   )
// }

// export default DetailHisUpdate

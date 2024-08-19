// import { CoreButton } from '@/components/atoms/CoreButton'
// import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
// import CoreInput from '@/components/atoms/CoreInput'
// import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
// import { useDialog } from '@/components/hooks/dialog/useDialog'
// import { DialogCustom } from '@/components/organism/DialogCustom'
// import CreateUpdateCustomer from '@/components/templates/ConfigureSaleWarehouse/Customer/CreateUpdateCustomer'
// import {
//   Box,
//   Button,
//   ButtonBase,
//   Checkbox,
//   CircularProgress,
//   FormControlLabel,
//   Grid,
//   Typography,
// } from '@mui/material'
// import Image from 'next/image'
// import { useRouter } from 'next/router'
// import { useState } from 'react'
// import { TableCustomDnd } from '../components/TableCustomDnd'
// import { WareHouseRequestDialog } from '../dialog/RequestForDeliveryDialog'
// import { stateFilter } from '../useSaleOrderManagement'
// import { ActionTable } from './ActionTable'
// import { useCreateAndUpdateSaleOrder } from './useCreateAndUpdateSaleOrder'
// import CustomStep from '@/components/atoms/CustomSteps'
// import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
// import { TaxInfoCustom } from '@/components/atoms/TaxInfoCustom'
// import PageContainer from '@/components/organism/PageContainer'
// import { CustomTable } from '@/components/organism/TableCustom'
// import DialogDetailCustomer from '@/components/templates/ConfigureSaleWarehouse/Customer/DialogDetailCustomer'
// import { errorMsg } from '@/helper/message'
// import moment from 'moment'
// import { DeliveryBillDetail } from '../components/DeliveryBillDetail'
// import { CancelSaleOrderDialog } from '../dialog/CancelSaleOrder'
// import { ListInvoiceBySaleOrderDialog } from './dialog/ListInvoiceBySaleOrderDialog'
// import { Controller } from 'react-hook-form'

// export const CreateAndUpdateSaleOrder = () => {
//   const [values, handles] = useCreateAndUpdateSaleOrder()
//   const router = useRouter()
//   const {
//     control,
//     isEdit,
//     userList,
//     listCustomer,
//     columns,
//     tables,
//     dataTable,
//     dataGetListChosen,
//     typeInput,
//     payments,
//     transactionMethod,
//     shippingPolicy,
//     isLoading,
//     id,
//     dataCustomerDetails,
//     wareHouseList,
//     invoiceList,
//     isRemainingQuantityCanGenerateInvoice,
//     dataFormDetails,
//     saleOrderName,
//     PATH_URL,
//     scopeTypeSelect,
//     watchPartnerId,
//     type,
//     listCurrencyCompany,
//     dataConfigSaleOrder,
//     listPriceList,
//     watchIsOptionPrice,
//     dataPolicyPartner,
//   } = values

//   const {
//     watch,
//     setValue,
//     setTypeInput,
//     append,
//     onSubmit,
//     setTypeSubmit,
//     handleCancel,
//     handleSendEmail,
//     refetchListCustomer,
//   } = handles

//   const { showDialog } = useDialog()
//   const [openCustomer, setOpenCustomer] = useState(false)
//   const [openDeliveryBills, setOpenDeliveryBills] = useState(false)
//   const [openViewCustomer, setOpenViewCustomer] = useState(false)
//   const [tabIndex, setTabIndex] = useState(0)

//   const watchQuoteCreateDate = watch('quoteCreationDate')
//   const watchComputeTaxInfo = watch('computeTaxInfo')
//   const watchDeliveryPolicy = watch('deliveryPolicy')
//   const watchQuotationDate = watch('quotationDate')
//   const watchDeliveryType = watch('deliveryType')
//   const watchNumberOrder = watch('numberOrder')
//   const watchState = watch('state')
//   const watchCode = watch('code')

//   return (
//     <PageContainer
//       title={
//         <Box>
//           <CoreBreadcrumbs
//             textCurrent={isEdit ? watchCode : 'THÊM MỚI'}
//             textPrev={type === 'CLEARANCE' ? 'THANH LÝ' : 'ĐƠN BÁN'}
//             prevUrl={PATH_URL}
//           />
//         </Box>
//       }
//       className='p-15'
//       action={[
//         <div key='action' className='flex w-full'>
//           <div className='flex '>
//             {watchState === 'DRAFT' ? (
//               <div className='flex items-center gap-4'>
//                 <Button
//                   onClick={() =>
//                     router.push({
//                       pathname: `${PATH_URL}/[id]/print/priceReport`,
//                       query: {
//                         id,
//                         saleOrderName,
//                       },
//                     })
//                   }
//                 >
//                   In báo giá
//                 </Button>
//                 <Button onClick={() => handleSendEmail()}>Gửi email</Button>
//                 <Button
//                   onClick={() =>
//                     showDialog(
//                       <WareHouseRequestDialog
//                         id={id}
//                         type={watchDeliveryPolicy}
//                         code={watchCode}
//                       />
//                     )
//                   }
//                 >
//                   Yêu cầu xuất
//                 </Button>
//                 {isEdit && (
//                   <Button
//                     variant='outlined'
//                     onClick={() => {
//                       const data = watch()
//                       showDialog(
//                         <CancelSaleOrderDialog
//                           handleCancel={handleCancel}
//                           data={{ ...data, state: 'CANCEL' }}
//                         />
//                       )
//                     }}
//                   >
//                     Hủy
//                   </Button>
//                 )}
//               </div>
//             ) : (
//               <div className='flex items-center gap-4'>
//                 {dataFormDetails && watchState === 'SALE' ? (
//                   <>
//                     <Button
//                       onClick={() =>
//                         router.push({
//                           pathname: `${PATH_URL}/[id]/print/invoiceOrder`,
//                           query: {
//                             id,
//                             saleOrderName,
//                           },
//                         })
//                       }
//                     >
//                       In đơn đặt hàng
//                     </Button>
//                   </>
//                 ) : watchState === 'SENT' ? (
//                   <>
//                     <Button
//                       onClick={() =>
//                         router.push({
//                           pathname: `${PATH_URL}/[id]/print/priceReport`,
//                           query: {
//                             id,
//                             saleOrderName,
//                           },
//                         })
//                       }
//                     >
//                       In báo giá
//                     </Button>
//                   </>
//                 ) : null}

//                 <Button
//                   onClick={() =>
//                     showDialog(
//                       <WareHouseRequestDialog
//                         id={id}
//                         type={watchDeliveryPolicy}
//                         code={watchCode}
//                       />
//                     )
//                   }
//                 >
//                   Yêu cầu xuất
//                 </Button>
//                 {watchState === 'SALE' &&
//                   isRemainingQuantityCanGenerateInvoice && (
//                     <Button
//                       onClick={() => {
//                         router.push({
//                           pathname: '/salesOrder/invoice/new',
//                           query: {
//                             saleOrderId: id,
//                             type: 'SALE_ORDER',
//                             typeOrder: type,
//                           },
//                         })
//                       }}
//                     >
//                       Tạo chứng từ
//                     </Button>
//                   )}
//                 <Button
//                   variant='outlined'
//                   onClick={() => {
//                     const data = watch()
//                     showDialog(
//                       <CancelSaleOrderDialog
//                         handleCancel={handleCancel}
//                         data={{ ...data, state: 'CANCEL' }}
//                       />
//                     )
//                   }}
//                 >
//                   Hủy
//                 </Button>
//               </div>
//             )}
//           </div>
//           <div className='ml-auto'>
//             <CustomStep
//               enableNextStep={false}
//               index={stateFilter.findIndex((item) => item.value === watchState)}
//               listStep={['BÁO GIÁ', 'ĐÃ GỬI BÁO GIÁ', 'ĐẶT HÀNG', 'HOÀN THÀNH']}
//             />
//           </div>
//         </div>,
//       ]}
//     >
//       <div
//         style={{ border: 'solid 1px #DFE0EB' }}
//         className='flex justify-end w-full '
//       >
//         {(watchState === 'SALE' || watchState === 'DONE') && (
//           <div
//             style={{
//               borderRight: 'solid 1px #DFE0EB',
//               padding: '12px',
//               paddingLeft: '20px',
//             }}
//             className='cursor-pointer'
//             onClick={() => {
//               showDialog(<ListInvoiceBySaleOrderDialog idOrder={id ?? null} />)
//             }}
//           >
//             <p style={{ fontSize: '14px' }} className='m-0'>
//               Hóa đơn
//             </p>
//             <span
//               style={{
//                 fontSize: '14px',
//                 fontStyle: 'italic',
//                 color: '#747475',
//               }}
//             >
//               {invoiceList?.totalElements}
//             </span>
//           </div>
//         )}
//         {(watchState === 'SALE' || watchState === 'DONE') && (
//           <div
//             style={{
//               borderRight: 'solid 1px #DFE0EB',
//               padding: '12px',
//               paddingLeft: '20px',
//             }}
//             className='cursor-pointer'
//             onClick={() => {
//               setOpenDeliveryBills(true)
//             }}
//           >
//             <p style={{ fontSize: '14px' }} className='m-0'>
//               Phiếu xuất
//             </p>
//             <span
//               style={{
//                 fontSize: '14px',
//                 fontStyle: 'italic',
//                 color: '#747475',
//               }}
//             >
//               {watchNumberOrder} phiếu xuất
//             </span>
//           </div>
//         )}
//         <div
//           style={{
//             borderRight: 'solid 1px #DFE0EB',
//             padding: '12px',
//             paddingLeft: '20px',
//           }}
//           className='cursor-pointer'
//           onClick={() => {
//             if (watchPartnerId) {
//               setOpenViewCustomer(true)
//             } else {
//               errorMsg('Vui lòng chọn khách hàng')
//             }
//           }}
//         >
//           <p style={{ fontSize: '14px' }} className='m-0'>
//             Khách hàng
//           </p>
//           <span
//             style={{
//               fontSize: '14px',
//               fontStyle: 'italic',
//               color: '#747475',
//             }}
//           >
//             Xem chi tiết
//           </span>
//         </div>
//       </div>
//       <div className='py-15'>
//         <form className='block mx-auto' onSubmit={onSubmit} autoComplete='off'>
//           {isLoading ? (
//             <div className='w-full text-center'>
//               <CircularProgress />
//             </div>
//           ) : (
//             <>
//               {/* <p className='ml-15 font-[500] text-[24px] m-0'>{watchCode}</p> */}
//               <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
//                 <Grid item xs={12} sm={12} md={6} lg={6}>
//                   <CoreInput
//                     control={control}
//                     name='code'
//                     label={
//                       type === 'CLEARANCE' ? 'Mã đơn thanh lý' : 'Mã đơn hàng'
//                     }
//                     inputProps={{
//                       maxLength: 50,
//                     }}
//                     required={type === 'CLEARANCE'}
//                     rules={{
//                       required:
//                         type === 'CLEARANCE' ? 'Đây là trường bắt buộc' : false,
//                       validate: {
//                         max: (val: string) =>
//                           val.length <= 25 ||
//                           'Mã không được vượt quá 25 kí tự.',
//                         // isValidCode: (val: string) => {
//                         //   const REGEX = /^[a-zA-Z0-9\-\/_]*$/
//                         //   return (
//                         //     REGEX.test(val) || 'Mã bao gồm kí tự chữ, số và -/_'
//                         //   )
//                         // },
//                       },
//                       setValueAs: (val: string) => val.trim(),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={12} md={6} lg={6}>
//                   <CoreAutocomplete
//                     control={control}
//                     name='scopeType'
//                     label='Loại chứng từ'
//                     returnValueType='enum'
//                     options={scopeTypeSelect}
//                     rules={{
//                       required: 'Đây là trường bắt buộc',
//                     }}
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={12} md={6} lg={6}>
//                   <CoreAutocomplete
//                     control={control}
//                     name='partnerId'
//                     label='Khách hàng'
//                     placeholder='Chọn khách hàng'
//                     valuePath='id'
//                     labelPath='name'
//                     returnValueType='enum'
//                     options={listCustomer}
//                     rules={{
//                       required: 'Đây là trường bắt buộc',
//                     }}
//                     required
//                   />
//                   {/* {type !== 'MERCHANT' && type !== 'CLEARANCE' && (
//                     <div className='mt-4'>
//                       <span
//                         onClick={() => setOpenCustomer(true)}
//                         style={{ fontSize: '14px' }}
//                         className='text-[#00CC6A] cursor-pointer'
//                       >
//                         + Thêm mới khách hàng
//                       </span>
//                     </div>
//                   )} */}
//                 </Grid>
//                 <Grid item xs={12} sm={12} md={6} lg={6}>
//                   <CoreAutocomplete
//                     control={control}
//                     name='currencyId'
//                     label='Đơn vị tiền tệ'
//                     valuePath='id'
//                     labelPath='name'
//                     returnValueType='enum'
//                     options={listCurrencyCompany}
//                     rules={{
//                       required: 'Đây là trường bắt buộc',
//                     }}
//                     disabled={dataPolicyPartner?.isHasPolicy}
//                     required
//                   />
//                 </Grid>
//                 {dataConfigSaleOrder?.data.isOptionPrice && (
//                   <Grid item xs={12}>
//                     <FormControlLabel
//                       control={
//                         <Controller
//                           name='isOptionPrice'
//                           control={control}
//                           render={({ field }) => {
//                             return (
//                               <Checkbox
//                                 checked={field.value ?? false}
//                                 {...field}
//                               />
//                             )
//                           }}
//                         />
//                       }
//                       label='Lấy giá theo chính sách bảng giá'
//                     />
//                   </Grid>
//                 )}
//                 {dataPolicyPartner?.isHasPolicy && (
//                   <Grid item xs={12} sm={12} md={6} lg={6}>
//                     <CoreInput
//                       control={control}
//                       name='namePolicy'
//                       label='Chính sách bảng giá'
//                       disabled={dataPolicyPartner?.isHasPolicy}
//                     />
//                   </Grid>
//                 )}
//                 {type !== 'CLEARANCE' && type !== 'OEM' && watchIsOptionPrice && (
//                   <Grid item xs={12} sm={12} md={6} lg={6}>
//                     <CoreAutocomplete
//                       control={control}
//                       name='pricelistId'
//                       label='Bảng giá'
//                       valuePath='id'
//                       labelPath='name'
//                       returnValueType='enum'
//                       options={listPriceList}
//                       rules={{
//                         required: 'Đây là trường bắt buộc',
//                       }}
//                       disabled={dataPolicyPartner?.isHasPolicy}
//                       required
//                     />
//                   </Grid>
//                 )}
//                 <Grid item xs={12} sm={12} md={6} lg={6}>
//                   <CoreDatePicker
//                     title='Ngày tạo báo giá'
//                     control={control}
//                     name='quoteCreationDate'
//                     placeholder='dd/mm/yyyy'
//                     // rules={{
//                     //   required: 'Đây là trường bắt buộc',
//                     // }}
//                     // error={!!errors.createDate}
//                     // helperText={errors.createDate?.message}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={12} md={6} lg={6}>
//                   <CoreDatePicker
//                     control={control}
//                     name='quotationDate'
//                     title='Ngày gửi báo giá'
//                     placeholder='dd/mm/yyyy'
//                     minDate={
//                       !!watchQuoteCreateDate ? watchQuoteCreateDate : new Date()
//                     }
//                     // rules={{
//                     //   required: 'Đây là trường bắt buộc',
//                     // }}
//                     // error={!!errors.quotationDate}
//                     // helperText={errors.quotationDate?.message}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={12} md={6} lg={6}>
//                   <CoreDatePicker
//                     title='Ngày đặt hàng'
//                     control={control}
//                     name='orderDate'
//                     placeholder='dd/mm/yyyy'
//                     minDate={
//                       !!watchQuotationDate ? watchQuotationDate : new Date()
//                     }
//                     // error={!!errors.orderDate}
//                     // helperText={errors.orderDate?.message}
//                   />
//                 </Grid>

//                 {/* <Grid item xs={12} sm={12} md={6} lg={6}>
//                   <CoreAutocomplete
//                     control={control}
//                     name='paymentTermId'
//                     label='Điều khoản thanh toán'
//                     placeholder='Chọn điều khoản thanh toán'
//                     valuePath='id'
//                     labelPath='name'
//                     returnValueType='enum'
//                     options={listPaymentTerm}
//                     rules={{
//                       required: 'Đây là trường bắt buộc',
//                     }}
//                     required
//                   />
//                 </Grid> */}
//                 <Grid item xs={12} sm={12} md={6} lg={6}>
//                   <CoreAutocomplete
//                     control={control}
//                     name='saleUserIds'
//                     label='Người phụ trách'
//                     placeholder='Chọn Người phụ trách'
//                     valuePath='id'
//                     labelPath='name'
//                     returnValueType='enum'
//                     options={userList}
//                     InputProps={{
//                       readOnly: true,
//                       style: { paddingRight: 10 },
//                       endAdornment: (
//                         <Image
//                           src={require('@/assets/svg/search.svg')}
//                           alt=''
//                         />
//                       ),
//                     }}
//                     multiple
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={12} md={6} lg={6}>
//                   <CoreAutocomplete
//                     control={control}
//                     name='paymentMethod'
//                     label='Hình thức thanh toán'
//                     placeholder='Chọn hình thức thanh toán'
//                     returnValueType='enum'
//                     options={payments}
//                     rules={{
//                       required: 'Đây là trường bắt buộc',
//                     }}
//                     disabled={!!!watchPartnerId}
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={12} md={6} lg={6}>
//                   <CoreAutocomplete
//                     control={control}
//                     name='deliveryType'
//                     label='Phương thức giao nhận'
//                     placeholder='Chọn phương thức giao nhận'
//                     returnValueType='enum'
//                     options={transactionMethod}
//                     rules={{
//                       required: 'Đây là trường bắt buộc',
//                     }}
//                     required
//                   />
//                 </Grid>
//                 {(watchDeliveryType === 'SHIP' ||
//                   watchDeliveryType === 'FREE_SHIP') && (
//                   <Grid item xs={12} sm={12} md={6} lg={6}>
//                     <CoreAutocomplete
//                       control={control}
//                       name='deliveryAddressId'
//                       label='Địa điểm giao hàng'
//                       placeholder='Chọn địa điểm giao hàng'
//                       valuePath='id'
//                       labelPath='address'
//                       returnValueType='enum'
//                       options={
//                         dataCustomerDetails?.addressContacts &&
//                         Array.isArray(dataCustomerDetails?.addressContacts)
//                           ? dataCustomerDetails?.addressContacts
//                           : []
//                       }
//                       rules={{
//                         required: 'Đây là trường bắt buộc',
//                       }}
//                       required
//                     />
//                   </Grid>
//                 )}
//                 <Grid item xs={12} sm={12} md={6} lg={6}>
//                   <CoreAutocomplete
//                     control={control}
//                     name='deliveryPolicy'
//                     label='Chính sách vận chuyển'
//                     placeholder='Chọn chính sách vận chuyển'
//                     returnValueType='enum'
//                     options={shippingPolicy}
//                     rules={{
//                       required: 'Đây là trường bắt buộc',
//                     }}
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={12} md={6} lg={6}>
//                   <CoreAutocomplete
//                     control={control}
//                     name='warehouseId'
//                     label='Kho'
//                     placeholder='Chọn kho'
//                     valuePath='id'
//                     labelPath='name'
//                     returnValueType='enum'
//                     options={wareHouseList?.content ?? []}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={12} md={6} lg={6}>
//                   <CoreDatePicker
//                     control={control}
//                     name='expireHoldDate'
//                     title='Giữ hàng đến ngày '
//                     placeholder='dd/mm/yyyy'
//                     minDate={
//                       !!watchQuoteCreateDate
//                         ? moment(watchQuoteCreateDate).add(3, 'days')
//                         : moment(new Date()).add(3, 'days')
//                     }
//                     rules={{
//                       required: 'Đây là trường bắt buộc',
//                     }}
//                     required
//                     // error={!!errors.quotationDate}
//                     // helperText={errors.quotationDate?.message}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={12}>
//                   <CoreInput
//                     control={control}
//                     name='note'
//                     label='Ghi chú'
//                     placeholder='Nhập ghi chú'
//                     multiline
//                     minRows={5}
//                     inputProps={{
//                       maxLength: 250,
//                     }}
//                   />
//                 </Grid>
//                 <Box
//                   sx={{
//                     mt: '40px',
//                     width: '100vw',
//                     borderTop: 'solid 1px #DFE0EB',
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       borderRight: 'solid 1px #DFE0EB',
//                     }}
//                     className='flex'
//                   >
//                     <ButtonBase
//                       sx={{
//                         padding: '14px 20px',
//                         backgroundColor: tabIndex === 1 ? '#F6F7FB' : '#fff',
//                       }}
//                       onClick={() => setTabIndex(0)}
//                     >
//                       <Typography variant='body2'>
//                         Thông tin đặt hàng
//                       </Typography>
//                     </ButtonBase>
//                     <Box
//                       sx={{ borderRight: 'solid 1px #DFE0EB', padding: '0px' }}
//                     ></Box>
//                     <ButtonBase
//                       sx={{
//                         padding: '14px 20px ',
//                         backgroundColor: tabIndex === 0 ? '#F6F7FB' : '#fff',
//                       }}
//                       onClick={() => setTabIndex(1)}
//                     >
//                       <Typography variant='body2'>Thông tin khác</Typography>
//                     </ButtonBase>
//                     <Box
//                       sx={{ borderRight: 'solid 1px #DFE0EB', padding: '0px' }}
//                     ></Box>
//                     <Box sx={{ borderBottom: 'solid 1px #DFE0EB' }}></Box>
//                   </Box>
//                 </Box>

//                 {tabIndex === 0 && (
//                   <>
//                     <Grid item xs={12} sm={12}>
//                       <span className='font-medium'>Sản phẩm cần bán</span>
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TableCustomDnd
//                         setValue={setValue}
//                         watch={watch}
//                         fieldsName='saleOrderLines'
//                         columns={columns}
//                         data={dataTable}
//                         actionTable={
//                           <ActionTable
//                             control={control}
//                             typeInput={typeInput}
//                             setValue={setValue}
//                             setTypeInput={setTypeInput}
//                             columns={columns}
//                             append={append}
//                           />
//                         }
//                       />
//                     </Grid>
//                     <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
//                     {watchIsOptionPrice && (
//                       <Grid item xs={12} sm={12} md={6} lg={6}>
//                         <CoreAutocomplete
//                           control={control}
//                           name='promotionIds'
//                           label='Chương trình khuyến mãi'
//                           placeholder='Chọn chương trình khuyến mãi'
//                           valuePath='id'
//                           labelPath='name'
//                           returnValueType='enum'
//                           multiple
//                           options={[]}
//                         />
//                       </Grid>
//                     )}
//                     {watch(`saleOrderLines`)?.length > 0 && (
//                       <Grid
//                         item
//                         xs={12}
//                         sm={12}
//                         style={{
//                           marginTop: '10px',
//                           marginBottom: '40px',
//                         }}
//                       >
//                         <TaxInfoCustom data={watchComputeTaxInfo} />
//                       </Grid>
//                     )}
//                   </>
//                 )}
//                 {tabIndex === 1 && (
//                   <>
//                     <Grid sx={{ marginTop: '30px', marginLeft: '30px' }}>
//                       <CustomTable
//                         columns={tables}
//                         data={[
//                           ...dataGetListChosen,
//                           {
//                             sku: <Typography>Tổng</Typography>,
//                             quantity: (
//                               <Typography
//                                 sx={{ fontWeight: 600, marginRight: '88px' }}
//                               >
//                                 {dataGetListChosen &&
//                                   (watch('saleOrderLines') ?? [])
//                                     .map((item: any) => {
//                                       return item.quantity
//                                     })
//                                     .reduce((total: any, num: any) => {
//                                       return total + Math.round(num)
//                                     }, 0)}
//                               </Typography>
//                             ),
//                             sumOfWeight: (
//                               <Typography
//                                 sx={{ fontWeight: 600, marginRight: '35px' }}
//                               >
//                                 {dataGetListChosen &&
//                                   (watch('saleOrderLines') ?? [])
//                                     .map((item: any) => {
//                                       return (
//                                         (item?.productInfo
//                                           ?.baseProductPackingLine?.weight ??
//                                           0) * (item?.quantity ?? 0)
//                                       )
//                                     })
//                                     .reduce((total: any, num: any) => {
//                                       return total + Math.round(num)
//                                     }, 0)}
//                               </Typography>
//                             ),
//                           },
//                         ]}
//                         paginationHidden
//                       />
//                     </Grid>
//                   </>
//                 )}
//                 <div className='flex items-center justify-center w-full my-13'>
//                   <div className='flex gap-10'>
//                     <CoreButton
//                       theme='cancel'
//                       onClick={() => router.push(PATH_URL)}
//                     >
//                       Hủy
//                     </CoreButton>
//                     {watchState === 'DRAFT' && (
//                       <CoreButton
//                         theme='cancel'
//                         type='submit'
//                         onClick={() => {
//                           setTypeSubmit('SAVE')
//                         }}
//                       >
//                         Lưu báo giá
//                       </CoreButton>
//                     )}
//                     {watchState === 'DRAFT' || watchState === 'SENT' ? (
//                       <CoreButton
//                         theme='submit'
//                         type='submit'
//                         onClick={() => {
//                           setTypeSubmit('CONFIRM')
//                         }}
//                       >
//                         Xác nhận
//                       </CoreButton>
//                     ) : (
//                       <CoreButton
//                         theme='submit'
//                         type='submit'
//                         onClick={() => {
//                           setTypeSubmit('CONFIRM')
//                         }}
//                       >
//                         Lưu thay đổi
//                       </CoreButton>
//                     )}
//                   </div>
//                 </div>
//               </Grid>
//             </>
//           )}
//         </form>
//         <DialogCustom
//           title='Thêm mới'
//           open={openCustomer}
//           onClose={() => setOpenCustomer(false)}
//           PaperProps={{}}
//           maxWidth='lg'
//           fullWidth
//           //position='top'
//           disabledForm
//         >
//           <div className='w-full p-10'>
//             <CreateUpdateCustomer
//               isPopup
//               onCancelPopup={() => setOpenCustomer(false)}
//               onSubmitSuccess={(val: any) => {
//                 setOpenCustomer(false)
//                 refetchListCustomer()
//               }}
//             />
//           </div>
//         </DialogCustom>
//         <DialogCustom
//           title={watchCode}
//           open={openDeliveryBills}
//           onClose={() => setOpenDeliveryBills(false)}
//           PaperProps={{}}
//           maxWidth='lg'
//           fullWidth
//           //position='top'
//         >
//           <div className='my-10 p-15'>
//             <DeliveryBillDetail code={watchCode} />
//           </div>
//         </DialogCustom>
//         <DialogDetailCustomer
//           open={openViewCustomer}
//           onClose={() => setOpenViewCustomer(false)}
//           id={watchPartnerId}
//         />
//       </div>
//     </PageContainer>
//   )
// }

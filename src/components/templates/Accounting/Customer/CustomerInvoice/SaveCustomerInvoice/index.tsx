// import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
// import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
// import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
// import { CoreButton } from '@/components/atoms/CoreButton'
// import CoreCheckbox from '@/components/atoms/CoreCheckbox'
// import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
// import CoreInput from '@/components/atoms/CoreInput'
// import CustomStep from '@/components/atoms/CustomSteps'
// import PunishLine from '@/components/atoms/PunishLine'
// import { SelectBoxCustomV2 } from '@/components/atoms/SelectBoxCustomV2'
// import TitleWithAmount from '@/components/atoms/TitleWithAmount'
// import { WarningText } from '@/components/atoms/WarningText'
// import { TopAction } from '@/components/molecules/TopAction'
// import CoreNavbar from '@/components/organism/CoreNavbar'
// import { CoreTable } from '@/components/organism/CoreTable'
// import MoneyBalanceItem from '@/components/organism/MoneyBalanceItem'
// import PageContainer from '@/components/organism/PageContainer'
// import { TableCustomDnd } from '@/components/organism/TableCustomDnd'
// import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
// import DialogConfirmDraft from '@/components/templates/Accounting/Dialog/DialogConfirmDraft'
// import DialogDeleteAccountMove from '@/components/templates/Accounting/Dialog/DialogDeleteAccountMove'
// import DialogPayment from '@/components/templates/Accounting/Dialog/DialogPayment'
// import PopupDetailInvoice from '@/components/templates/Accounting/Dialog/PopupDetailInvoice'
// import { scopeCustomerTypeSelect } from '@/enum'
// import { GREEN, ORANGE, PRIMARY, RED } from '@/helper/colors'
// import { REGEX } from '@/helper/regex'
// import { useCheckPath } from '@/path'
// import { useAppSelector } from '@/redux/hook'
// import { MENU_URL } from '@/routes'
// import { getAccountJournalList } from '@/service/accounting/accountJournal/getList'
// import { getListObjectCurrency } from '@/service/accounting/accountMove/getListIncome'
// import { getPaymentTermList } from '@/service/accounting/paymentTerm/getList'
// import { getBranchList } from '@/service/common/branch/getList'
// import { getPartnerList } from '@/service/common/partner/getListTiny'
// import { Grid, IconButton, Typography } from '@mui/material'
// import { useTranslation } from 'next-i18next'
// import Image from 'next/image'
// import { useRouter } from 'next/router'
// import { useMemo, useState } from 'react'
// import { useQueryClient } from 'react-query'
// import DialogCopyInvoice from '../../../Dialog/DialogCopyInvoice'
// import DialogHisUpdateList from '../../../Dialog/DialogHistoryEditBound'
// import RenderAnotherBook from '../../Components/RenderAnotherBook'
// import useCustomerInvoice from './useCustomerInvoice'

// const SaveCustomerInvoice = () => {
//   const { t } = useTranslation('accounting/customer-invoice')
//   const router = useRouter()
//   const [paramsPartnerExt, setParamsPartnerExt] = useState({})
//   const queryClient = useQueryClient()
//   const [values, handles] = useCustomerInvoice()
//   const {
//     id,
//     data,
//     ledgerRefs,
//     codeLedger,
//     actionType,
//     valueTab,
//     invoiceName,
//     control,
//     isUpdate,
//     isLoading,
//     isLoadingSubmit,
//     methodForm,
//     invoiceColumns,
//     invoiceLinesTableData,
//     moveLinesColumns,
//     moveLinesTableData,
//     incomeExpenseColumns,
//     fieldLedgerRefs,
//     idLedger,
//   } = values

//   const { watch, setValue } = methodForm

//   const {
//     refetch,
//     paramsPartner,
//     append,
//     remove,
//     onSubmit,
//     onDraftSubmit,
//     onCancel,
//     appendInvoiceLines,
//     handleChangeTab,
//     showDialog,
//     onAfterChangeValue,
//   } = handles
//   const isDisplayState =
//     watch('state') === 'DRAFT' ? 0 : watch('state') === 'POSTED' ? 1 : -1
//   const { invoiceCk, typeInvoice } = useCheckPath()
//   const { id: idBranch } = useAppSelector((state) => state.branchData)
//   const { id: companyId } = useAppSelector((state) => state.companyConfigData)

//   //component Right action
//   const renderRightAction = useMemo(() => {
//     return (
//       <div className='bg-white flex justify-between w-full items-center'>
//         <div className='flex gap-5'>
//           {watch('state') === 'POSTED' && (
//             <div
//               className='flex items-center cursor-pointer'
//               onClick={() => {
//                 showDialog(
//                   <DialogConfirmDraft
//                     id={id}
//                     refetch={refetch}
//                     type='INVOICE'
//                   />
//                 )
//               }}
//             >
//               <IconButton>
//                 <Image
//                   src={require('@/assets/svg/action/view.svg')}
//                   alt='view'
//                   width={16}
//                   height={16}
//                 />
//               </IconButton>
//               <Typography variant='body2'>Đặt lại nháp</Typography>
//             </div>
//           )}

//           {['NOT_PAYMENT', 'PARTIAL_PAYMENT'].includes(
//             watch('paymentStatus')
//           ) && (
//             <div
//               className='flex items-center cursor-pointer'
//               onClick={() => {
//                 showDialog(
//                   <DialogPayment
//                     id={id}
//                     name={watch('code')}
//                     type='OUTBOUND'
//                     amount={
//                       watch('paymentStatus') === 'NOT_PAYMENT'
//                         ? data
//                           ? data.data.amountTotal
//                           : watch('amountTotal')
//                         : watch('paymentStatus') === 'PARTIAL_PAYMENT'
//                         ? watch('moneyPaid')
//                         : 0
//                     }
//                     refetch={refetch}
//                   />
//                 )
//               }}
//             >
//               <IconButton>
//                 <Image
//                   src={require('@/assets/svg/action/view.svg')}
//                   alt='view'
//                   width={16}
//                   height={16}
//                 />
//               </IconButton>
//               <Typography variant='body2'> Ghi nhận thanh toán</Typography>
//             </div>
//           )}

//           {
//             <div
//               className='flex items-center cursor-pointer'
//               onClick={() => {
//                 router.push({
//                   pathname: `${MENU_URL.CUSTOMER.INVOICE[invoiceCk][typeInvoice]}/[id]/print`,
//                   query: {
//                     id,
//                     invoiceName,
//                     fileUrl: watch('filePDF'),
//                   },
//                 })
//               }}
//             >
//               <IconButton>
//                 <Image
//                   src={require('@/assets/svg/action/view.svg')}
//                   alt='view'
//                   width={16}
//                   height={16}
//                 />
//               </IconButton>
//               <Typography variant='body2'>In chứng từ</Typography>
//             </div>
//           }
//         </div>
//         {watch('state') === 'DRAFT' && !router.asPath.includes('/addNew') ? (
//           <TopAction
//             actionList={['copy', 'edit', 'delete', 'history']}
//             onCopyAction={() => {
//               showDialog(
//                 <DialogCopyInvoice
//                   id={id}
//                   refetch={() => {
//                     router.push({
//                       pathname:
//                         MENU_URL.CUSTOMER.INVOICE[invoiceCk][typeInvoice],
//                     })
//                   }}
//                 />
//               )
//             }}
//             onEditAction={() => {
//               router.replace({
//                 pathname: `${MENU_URL.CUSTOMER.INVOICE[invoiceCk][typeInvoice]}/[id]`,
//                 query: {
//                   id,
//                 },
//               })
//             }}
//             onDeleteAction={() => {
//               showDialog(
//                 <DialogDeleteAccountMove
//                   id={id}
//                   refetch={() => {
//                     router.push({
//                       pathname: `${MENU_URL.CUSTOMER.INVOICE}`,
//                     })
//                   }}
//                 />
//               )
//             }}
//             onHistoryAction={() => {
//               showDialog(
//                 <DialogHisUpdateList
//                   code={watch('code')}
//                   changeId={id}
//                   historyType='OUT_INVOICE'
//                   refetch={() => {}}
//                 />
//               )
//             }}
//           />
//         ) : !router.asPath.includes('/addNew') ? (
//           <TopAction
//             actionList={['copy', 'history']}
//             onCopyAction={() => {
//               showDialog(
//                 <DialogCopyInvoice
//                   id={id}
//                   refetch={() => {
//                     router.push({
//                       pathname:
//                         MENU_URL.CUSTOMER.INVOICE[invoiceCk][typeInvoice],
//                     })
//                   }}
//                 />
//               )
//             }}
//             onHistoryAction={() => {
//               showDialog(
//                 <DialogHisUpdateList
//                   code={watch('code')}
//                   changeId={id}
//                   historyType='OUT_INVOICE'
//                   refetch={() => {}}
//                 />
//               )
//             }}
//           />
//         ) : (
//           <TopAction
//             actionList={['copy']}
//             onCopyAction={() => {
//               showDialog(
//                 <DialogCopyInvoice
//                   id={id}
//                   refetch={() => {
//                     router.push({
//                       pathname:
//                         MENU_URL.CUSTOMER.INVOICE[invoiceCk][typeInvoice],
//                     })
//                   }}
//                 />
//               )
//             }}
//           />
//         )}
//       </div>
//     )
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     data,
//     isUpdate,
//     id,
//     invoiceCk,
//     invoiceName,
//     refetch,
//     router,
//     showDialog,
//     typeInvoice,
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     watch('state'),
//   ])

//   // component Group button
//   const renderGroupButton = useMemo(() => {
//     return (
//       <>
//         {watch('state') === 'DRAFT' && actionType !== 'VIEW' && (
//           <div className='space-x-12 text-center my-10'>
//             <CoreButton theme='cancel' onClick={onCancel}>
//               {t('common:btn.cancel')}
//             </CoreButton>
//             <CoreButton
//               theme='draft'
//               onClick={onDraftSubmit}
//               loading={isLoadingSubmit}
//             >
//               {t('common:btn.draft')}
//             </CoreButton>
//             <CoreButton theme='submit' type='submit' loading={isLoadingSubmit}>
//               {isUpdate ? t('common:btn.save_change') : t('common:btn.add')}
//             </CoreButton>
//           </div>
//         )}
//       </>
//     )
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     actionType,
//     isLoadingSubmit,
//     isUpdate,
//     onCancel,
//     onDraftSubmit,
//     t,
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     watch('state'),
//   ])

//   // display info invoice
//   const renderInvoice = useMemo(() => {
//     return (
//       <div className='flex justify-end'>
//         {watch('state') === 'POSTED' && (
//           <CustomStep
//             listStep={[
//               '',
//               watch('paymentStatus') === 'PAID'
//                 ? 'Đã thanh toán'
//                 : watch('paymentStatus') === 'PARTIAL_PAYMENT'
//                 ? 'Thanh toán 1 phần'
//                 : watch('paymentStatus') === 'REVERSE'
//                 ? 'Đảo ngược'
//                 : 'Chưa thanh toán',
//             ]}
//             index={1}
//             enableNextStep={false}
//             color={
//               watch('paymentStatus') === 'PAID'
//                 ? GREEN
//                 : watch('paymentStatus') === 'PARTIAL_PAYMENT'
//                 ? ORANGE
//                 : RED
//             }
//           />
//         )}
//       </div>
//     )
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [watch, watch('state'), watch('paymentStatus')])

//   return (
//     <PageContainer
//       title={
//         <div className='flex justify-between w-full'>
//           <CoreBreadcrumbs
//             isShowDashboard
//             breadcrumbs={[
//               {
//                 title: t('title'),
//                 pathname: MENU_URL.CUSTOMER.INVOICE[invoiceCk][typeInvoice],
//               },
//               {
//                 title: (
//                   <Typography>
//                     {isUpdate
//                       ? actionType === 'VIEW'
//                         ? t('common:detail')
//                         : t('common:btn.edit')
//                       : t('common:btn.add')}
//                   </Typography>
//                 ),
//               },
//             ]}
//           />
//           <CoreBreadcrumbs
//             breadcrumbs={[
//               {
//                 title: (
//                   <Typography
//                     sx={{
//                       color: isDisplayState === 0 && (PRIMARY as any),
//                     }}
//                   >
//                     1. Nháp
//                   </Typography>
//                 ),
//               },
//               {
//                 title: (
//                   <Typography
//                     sx={{
//                       color: isDisplayState === 1 && (PRIMARY as any),
//                     }}
//                   >
//                     2. Đã vào sổ
//                   </Typography>
//                 ),
//               },
//             ]}
//           />
//         </div>
//       }
//     >
//       <form onSubmit={onSubmit}>
//         <CoreNavbar
//           breadcrumbs={[
//             {
//               title: 'Chi tiết',
//               content: (
//                 <>
//                   {renderInvoice}
//                   {watch('moneyPaid') > 0 &&
//                     watch('moneyBalanceResponses') &&
//                     watch('moneyBalanceResponses').length > 0 && (
//                       <div className='py-4'>
//                         <WarningText bgColor='#abdbe3'>
//                           Bạn có các khoản tín dụng chưa thanh toán với khách
//                           hàng này. Bạn có thể phân bổ chúng để ghi nhận là hóa
//                           đơn này đã thanh toán.
//                         </WarningText>
//                       </div>
//                     )}

//                   <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
//                     {isUpdate && (
//                       <Grid
//                         item
//                         xs={12}
//                         style={{
//                           marginBottom: '15px',
//                         }}
//                       >
//                         <Typography variant='h6'>{invoiceName}</Typography>
//                       </Grid>
//                     )}
//                     <Grid item xs={12} sm={12} md={4} lg={4}>
//                       <CoreInput
//                         control={control}
//                         name='code'
//                         label='Mã chứng từ'
//                         placeholder='Nhập mã chứng từ'
//                         readOnly={watch('state') === 'POSTED'}
//                         inputProps={{ maxLength: 50 }}
//                         rules={{
//                           validate: {
//                             isCode: (v: string) =>
//                               REGEX.CODE.test(v) ||
//                               t('common:validation.alias'),
//                           },
//                         }}
//                         disabled={isUpdate}
//                       />
//                     </Grid>
//                     {watch('orderName') && (
//                       <Grid item xs={12} sm={12} md={4} lg={4}>
//                         <CoreInput
//                           control={control}
//                           name='orderName'
//                           label='Đơn hàng'
//                           readOnly
//                           inputProps={{ maxLength: 50 }}
//                         />
//                       </Grid>
//                     )}
//                     <Grid item xs={12} sm={12} md={4} lg={4}>
//                       <CoreAutocomplete
//                         control={control}
//                         name='scopeType'
//                         label='Loại chứng từ'
//                         placeholder='Chọn loại chứng từ'
//                         required
//                         options={scopeCustomerTypeSelect}
//                         rules={{
//                           required: t('common:validation.required'),
//                         }}
//                         onChangeValue={() => {
//                           const invoiceLines = watch('invoiceLines') ?? []
//                           if (invoiceLines.length > 0) {
//                             invoiceLines.map((_, index) =>
//                               setValue(`invoiceLines.${index}.taxIds`, [])
//                             )
//                           }
//                         }}
//                         readOnly={watch('state') === 'POSTED'}
//                       />
//                     </Grid>

//                     {router.asPath.includes('/all') && (
//                       <Grid item xs={12} sm={12} md={4} lg={4}>
//                         <CoreAutocomplete
//                           control={control}
//                           name='saleType'
//                           label={`${
//                             invoiceCk === 'INTERNAL'
//                               ? 'Loại khách hàng'
//                               : 'Loại khách hàng'
//                           }`}
//                           placeholder={`${
//                             invoiceCk === 'INTERNAL'
//                               ? 'Loại khách hàng'
//                               : 'Loại khách hàng'
//                           }`}
//                           required
//                           options={[
//                             { value: 'OEM', label: 'OEM' },
//                             { value: 'B2B', label: 'B2B' },
//                             { value: 'B2C', label: 'B2C' },
//                             { value: 'MERCHANT', label: 'Merchant' },
//                             { value: 'LIQUIDATION', label: 'Thanh lý' },
//                           ]}
//                           rules={{
//                             required: t('common:validation.required'),
//                           }}
//                           onChangeValue={async (val) => {
//                             const params = paramsPartner(val)
//                             setParamsPartnerExt(params)
//                             setValue('partner', {
//                               code: '',
//                               label: '',
//                               name: '',
//                             })
//                           }}
//                           readOnly={watch('state') === 'POSTED'}
//                         />
//                       </Grid>
//                     )}

//                     {router.asPath.includes('customerInvoice/normal') ? (
//                       <Grid item xs={12} sm={12} md={4} lg={4}>
//                         <CoreAutoCompleteAPI
//                           control={control}
//                           name='partner'
//                           label='Khách hàng'
//                           placeholder='Chọn khách hàng'
//                           labelPath2='code'
//                           required
//                           params={
//                             typeInvoice !== 'EXTERNAL'
//                               ? {
//                                   ...paramsPartner(typeInvoice),
//                                 }
//                               : {
//                                   ...paramsPartnerExt,
//                                 }
//                           }
//                           fetchDataFn={getPartnerList}
//                           rules={{
//                             required: t('common:validation.required'),
//                             validate: {
//                               ckValidPath2: (val: any) => {
//                                 return (
//                                   val.code !== '' ||
//                                   t('common:validation.required')
//                                 )
//                               },
//                             },
//                           }}
//                           onChangeValue={() => {
//                             queryClient.invalidateQueries({
//                               queryKey: ['api/v1/partners/branch-list-tiny'],
//                             })
//                           }}
//                           readOnly={watch('state') === 'POSTED'}
//                         />
//                       </Grid>
//                     ) : (
//                       <Grid item xs={12} sm={12} md={4} lg={4}>
//                         <CoreAutoCompleteAPI
//                           control={control}
//                           name='partner'
//                           label='Khách hàng'
//                           placeholder='Chọn khách hàng'
//                           labelPath2='code'
//                           required
//                           params={{
//                             isDefaultCompany: true,
//                             activated: true,
//                             branchNowId: idBranch ?? companyId,
//                           }}
//                           fetchDataFn={getBranchList}
//                           rules={{
//                             required: t('common:validation.required'),
//                           }}
//                           readOnly={watch('state') === 'POSTED'}
//                         />
//                       </Grid>
//                     )}
//                     <Grid item xs={12} sm={12} md={4} lg={4}>
//                       <CoreAutoCompleteAPI
//                         control={control}
//                         name='accountJournal'
//                         label='Sổ kế toán'
//                         placeholder='Chọn sổ kế toán'
//                         required
//                         fetchDataFn={getAccountJournalList}
//                         params={{
//                           type: 'SALE',
//                           accountLedgerId: idLedger,
//                         }}
//                         readOnly={watch('state') === 'POSTED'}
//                         onChangeValue={onAfterChangeValue}
//                         rules={{ required: t('common:validation.required') }}
//                       />
//                     </Grid>

//                     <Grid item xs={12} sm={12} md={4} lg={4}>
//                       <CoreDatePicker
//                         control={control}
//                         name='date'
//                         title='Ngày tạo chứng từ'
//                         placeholder='Chọn ngày'
//                         required
//                         format='YYYY-MM-DD'
//                         rules={{
//                           required: t('common:validation.required'),
//                         }}
//                         readOnly={watch('state') === 'POSTED'}
//                       />
//                     </Grid>

//                     <Grid item xs={12} sm={12} md={4} lg={4}>
//                       <CoreAutoCompleteAPI
//                         control={control}
//                         name='paymentTerm'
//                         label='Điều khoản thanh toán'
//                         placeholder='Chọn điều khoản thanh toán'
//                         fetchDataFn={getPaymentTermList}
//                         params={{
//                           type: 'SALE',
//                         }}
//                         readOnly={watch('state') === 'POSTED'}
//                       />
//                     </Grid>
//                     {!watch('paymentTerm') && (
//                       <Grid item xs={12} sm={12} md={4} lg={4}>
//                         <CoreDatePicker
//                           control={control}
//                           name='dueDate'
//                           title='Ngày hết hạn'
//                           placeholder='Chọn ngày'
//                           format='YYYY-MM-DD'
//                           required
//                           rules={{
//                             required: t('common:validation.required'),
//                           }}
//                           readOnly={watch('state') === 'POSTED'}
//                         />
//                       </Grid>
//                     )}

//                     <Grid item xs={12} sm={12} md={4} lg={4}>
//                       <CoreDatePicker
//                         control={control}
//                         name='accountingDate'
//                         title='Ngày vào sổ'
//                         placeholder='Chọn ngày'
//                         format='YYYY-MM-DD'
//                         readOnly={watch('state') === 'POSTED'}
//                       />
//                     </Grid>

//                     <Grid item xs={12} sm={12} md={4} lg={4}>
//                       <SelectBoxCustomV2
//                         control={control}
//                         name='incomeExpense'
//                         columns={incomeExpenseColumns}
//                         labelPath='name'
//                         valuePath='id'
//                         fetchDataFn={getListObjectCurrency}
//                         className='w-full'
//                         label='Đối tượng thu'
//                         placeholder='Chọn đối tượng thu'
//                       />
//                     </Grid>

//                     {codeLedger === 'SC00' && (
//                       <Grid
//                         item
//                         xs={12}
//                         sm={12}
//                         md={12}
//                         lg={12}
//                         sx={{ marginBottom: '10px' }}
//                       >
//                         <CoreCheckbox
//                           name='isAnotherBook'
//                           control={control}
//                           label='Sổ khác'
//                         />
//                       </Grid>
//                     )}

//                     {(watch('isAnotherBook') === true &&
//                       codeLedger === 'SC00' &&
//                       watch('state') === 'POSTED' &&
//                       watch('isCreateAnotherBook') === true) ||
//                     (watch('isAnotherBook') === true &&
//                       actionType !== 'VIEW') ? (
//                       <>
//                         <RenderAnotherBook
//                           actionType={actionType}
//                           append={append}
//                           remove={remove}
//                           control={control}
//                           fieldLedgerRefs={fieldLedgerRefs}
//                           watch={watch}
//                         />
//                       </>
//                     ) : (
//                       <></>
//                     )}

//                     <Grid item xs={12} sm={12}>
//                       <div className='flex gap-1 items-center mt-5'>
//                         <Typography variant='h6'>Thông tin chứng từ</Typography>
//                       </div>
//                     </Grid>
//                     <Grid
//                       item
//                       xs={12}
//                       style={{
//                         marginBottom: '15px',
//                       }}
//                     >
//                       <TableCustomDnd
//                         setValue={setValue}
//                         watch={watch}
//                         fieldsName='invoiceLines'
//                         columns={
//                           actionType
//                             ? invoiceColumns.slice(0, -1)
//                             : invoiceColumns
//                         }
//                         data={invoiceLinesTableData}
//                         isShowColumnStt
//                         actionTable={
//                           watch('state') === 'DRAFT' &&
//                           !watch('orderName') &&
//                           actionType !== 'VIEW' ? (
//                             <ActionTable
//                               columns={invoiceColumns}
//                               append={appendInvoiceLines}
//                               defaultValueLine={{
//                                 amountUntaxed: 0,
//                                 amountTotal: 0,
//                                 lineTax: 0,
//                                 discount: 0,
//                                 taxIds: [],
//                               }}
//                             />
//                           ) : null
//                         }
//                       />
//                     </Grid>
//                     {
//                       <div className='flex flex-col w-full gap-10 mt-10 mb-20'>
//                         <TitleWithAmount
//                           amount={watch('amountUntaxed')}
//                           title='Thành tiền chưa thuế'
//                         />

//                         {(watch('computeTaxInfo')
//                           ? watch('computeTaxInfo').summaryItems
//                           : []
//                         ).map((item: any, index: number) => {
//                           return (
//                             <TitleWithAmount
//                               key={index}
//                               amount={item.amount}
//                               title={item.taxName}
//                             />
//                           )
//                         })}

//                         <TitleWithAmount
//                           amount={watch('totalTax')}
//                           title='Tổng thuế'
//                         />

//                         <TitleWithAmount
//                           amount={watch('amountTotal')}
//                           title='Thành tiền'
//                         />

//                         {watch('movePunishes') &&
//                           watch('movePunishes').length > 0 && (
//                             <div className='flex flex-row-reverse'>
//                               <div className='flex flex-col'>
//                                 <div className='flex flex-row-reverse mb-5'>
//                                   <div className='w-260'>
//                                     <Typography variant='h6'>
//                                       Phạt trả chậm
//                                     </Typography>
//                                   </div>
//                                 </div>

//                                 {watch('movePunishes').map((item, index) => {
//                                   return (
//                                     <PunishLine
//                                       key={index}
//                                       index={index + 1}
//                                       data={item}
//                                       refetch={refetch}
//                                     />
//                                   )
//                                 })}
//                               </div>
//                             </div>
//                           )}

//                         {watch('paymentResponses') &&
//                           watch('paymentResponses').length > 0 && (
//                             <div className='flex flex-row-reverse'>
//                               <div className='flex flex-col gap-5'>
//                                 <div className='flex flex-row-reverse'>
//                                   <div className='w-260'>
//                                     <Typography variant='h6'>
//                                       Đã thanh toán
//                                     </Typography>
//                                   </div>
//                                 </div>

//                                 {watch('paymentResponses').map(
//                                   (item, index) => {
//                                     return (
//                                       <PopupDetailInvoice
//                                         key={index}
//                                         item={item}
//                                       />
//                                     )
//                                   }
//                                 )}
//                               </div>
//                             </div>
//                           )}

//                         {watch('discount') !== null &&
//                           Number(watch('discount')) > 0 && (
//                             <TitleWithAmount
//                               title='Áp dụng DKTK'
//                               amount={-(watch('discount') ?? 0)}
//                             />
//                           )}

//                         {watch('state') === 'POSTED' &&
//                           watch('moneyPaid') !== null &&
//                           watch('moneyPaid') !== undefined && (
//                             <TitleWithAmount
//                               title='Số tiền phải trả'
//                               variant='subtitle1'
//                               amount={watch('moneyPaid')}
//                             />
//                           )}

//                         {watch('moneyPaid') > 0 &&
//                           watch('moneyBalanceResponses') &&
//                           watch('moneyBalanceResponses').length > 0 && (
//                             <div className='flex flex-col gap-10'>
//                               <div className='flex flex-row-reverse'>
//                                 <div className='w-260'>
//                                   <Typography variant='h6'>
//                                     Đối trừ công nợ
//                                   </Typography>
//                                 </div>
//                               </div>

//                               {isUpdate &&
//                                 data &&
//                                 watch('moneyBalanceResponses').map(
//                                   (item, index) => {
//                                     return (
//                                       <MoneyBalanceItem
//                                         key={index}
//                                         item={item}
//                                         dataInvoice={data.data}
//                                         type='OUTBOUND'
//                                         refetch={refetch}
//                                       />
//                                     )
//                                   }
//                                 )}
//                             </div>
//                           )}
//                       </div>
//                     }
//                   </Grid>
//                   {renderGroupButton}
//                 </>
//               ),
//               rightAction: renderRightAction,
//             },
//             {
//               title: 'Bút toán',
//               content: (
//                 <>
//                   <Grid
//                     container
//                     spacing={{ xs: 1, sm: 2, md: 3 }}
//                     style={{ marginBottom: '40px' }}
//                   >
//                     <Grid item xs={12}>
//                       <CoreTable
//                         tableName='saveCustomerInv'
//                         columns={moveLinesColumns}
//                         data={moveLinesTableData}
//                         paginationHidden
//                       />
//                     </Grid>
//                   </Grid>
//                   {renderGroupButton}
//                 </>
//               ),
//               rightAction: renderRightAction,
//             },
//           ]}
//         />
//       </form>
//     </PageContainer>
//   )
// }

// export default SaveCustomerInvoice

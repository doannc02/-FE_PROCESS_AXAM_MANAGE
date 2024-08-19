// import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
// import CoreInput from '@/components/atoms/CoreInput'
// import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
// import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
// import { useDialog } from '@/components/hooks/dialog/useDialog'
// import useCheckPathPartnerType from '@/components/hooks/path/useCheckPathPartnerType'
// import { Action } from '@/components/molecules/Action'
// import {
//   ColumnProps,
//   ColumnProps as ColumnProps1,
// } from '@/components/organism/CoreTable'
// import { capitalize } from '@/helper/capitalize'
// import { MAX_VALUE } from '@/helper/contain'
// import { errorMsg, successMsg } from '@/helper/message'
// import { useFormCustom } from '@/lib/form'
// import { useCheckPath } from '@/path'
// import { useAppSelector } from '@/redux/hook'
// import { MENU_URL } from '@/routes'
// import { useQueryGetAccountNames } from '@/service/accounting/account/getNames'
// import { useQueryGetAccountMoveDetail } from '@/service/accounting/accountMove/getDetail'
// import {
//   AccountMoveDetail,
//   TypeLedgerRefs,
// } from '@/service/accounting/accountMove/getDetail/type'
// import { postGenerateMoveLines } from '@/service/accounting/accountMove/postGenerateLines'
// import {
//   postAccountMove,
//   putAccountMove,
// } from '@/service/accounting/accountMove/save'
// import { useQueryGetAccountTagList } from '@/service/accounting/accountTag/getList'
// import { useQueryGetTaxList } from '@/service/accounting/tax/getList'
// import { getProductTinyList } from '@/service/product/productController/getListTiny'
// import { getUomBaseOfProduct } from '@/service/product/productController/getUomBase'
// import { getUomProductList } from '@/service/product/productController/getUomGroup'
// import { useQueryGetWarehouseList } from '@/service/warehouse/getList'
// import { getDateNow } from '@/utils/date/date'
// import { Stack, Typography } from '@mui/material'
// import _ from 'lodash'
// import { useTranslation } from 'next-i18next'
// import { useRouter } from 'next/router'
// import { useCallback, useEffect, useMemo, useState } from 'react'
// import { useFieldArray } from 'react-hook-form'
// import { useMutation } from 'react-query'
// import UomAutocomplete from '../../../_component/UomAutocomplete'

// let f: any = null
// export const defaultLedgerRefs: TypeLedgerRefs = {
//   accountLedger: null,
//   accountJournal: null,
// }
// const useCustomerInvoice = () => {
//   const { t } = useTranslation('accounting/customer-invoice')
//   const router = useRouter()
//   const id = Number(router.query?.id)
//   const { actionType } = router.query
//   const isUpdate = !!id
//   const { invoiceCk, typeInvoice } = useCheckPath()
//   const { type } = useCheckPathPartnerType()
//   const { showDialog, hideDialog } = useDialog()
//   const { id: idLedger, code: codeLedger } = useAppSelector(
//     (state) => state.ledgerRefData
//   )
//   const formatType =
//     invoiceCk === 'NORMAL'
//       ? typeInvoice.toLowerCase()
//       : typeInvoice === 'INTERNAL'
//       ? `${typeInvoice.toLowerCase()}`
//       : `${typeInvoice.toLowerCase()}-internal`

//   const methodForm = useFormCustom<AccountMoveDetail>({
//     defaultValues: {
//       id: null,
//       code: '',
//       orderName: '',
//       saleOrderId: null,
//       returnSaleOrderId: null,
//       purchaseOrderId: null,
//       returnPurchaseOrderId: null,
//       paymentStatus: 'NOT_PAYMENT',
//       state: 'DRAFT',
//       scopeType: 'DOMESTIC_WAREHOUSE',
//       date: getDateNow(),
//       accountingDate: getDateNow(),
//       accountPaymentId: null,
//       invoiceLines: [
//         {
//           amountTotal: 0,
//           amountUntaxed: 0,
//           discount: 0,
//           lineTax: 0,
//           taxIds: [],
//         },
//       ],
//       amountTotal: 0,
//       movePunishes: [],
//       paymentResponses: [],
//       moneyBalanceResponses: [],
//       ledgerRefs: [defaultLedgerRefs],
//       accountLedger: {
//         id: idLedger,
//         name: '',
//         code: '',
//       },
//       isAnotherBook: false,
//       isCreateAnotherBook: false,
//     },
//   })

//   let renderTime = new Date(Date.now()).getTime()

//   const {
//     control,
//     formState,
//     handleSubmit,
//     reset,
//     setValue,
//     getValues,
//     watch,
//     setError,
//   } = methodForm

//   const { isLoading, data, refetch } = useQueryGetAccountMoveDetail(
//     { id, typeSale: formatType },
//     { enabled: !!id }
//   )

//   const { currency } = useAppSelector((state) => state.companyConfigData)

//   const [valueTab, setValueTab] = useState<'Detail' | 'Entry'>('Detail')
//   const handleChangeTab = (
//     _: React.SyntheticEvent,
//     newValue: 'Detail' | 'Entry'
//   ) => {
//     setValueTab(newValue)
//   }

//   const {
//     fields: fieldLedgerRefs,
//     append,
//     remove,
//   } = useFieldArray({
//     control,
//     name: 'ledgerRefs',
//   })

//   const { isLoading: isLoadingTax, data: taxSelect } = useQueryGetTaxList({
//     page: 0,
//     size: MAX_VALUE,
//     type: 'SALE',
//     scopeType: watch('scopeType'),
//     isActive: true,
//   })

//   const { isLoading: isLoadingAccountTag, data: accountTagSelect } =
//     useQueryGetAccountTagList({
//       page: 0,
//       size: MAX_VALUE,
//     })

//   const { isLoading: isLoadingAccountSelect, data: accountSelect } =
//     useQueryGetAccountNames({
//       page: 0,
//       size: MAX_VALUE,
//     })
//   const { data: wareHouseList } = useQueryGetWarehouseList({
//     page: 0,
//     size: MAX_VALUE,
//   })
//   const computeTax = useCallback(async () => {
//     try {
//       const invoiceWatch = watch('invoiceLines') ?? []
//       let validate = true
//       if (invoiceWatch) {
//         invoiceWatch.forEach((item) => {
//           if (
//             _.isNil(item.quantity) ||
//             _.isNil(item.unitPrice) ||
//             _.isNil(item.product?.id) ||
//             _.isNil(item.uom?.id)
//           ) {
//             validate = false
//             // eslint-disable-next-line react-hooks/exhaustive-deps
//             renderTime = new Date(Date.now()).getTime()
//           }
//         })
//       }
//       if (!validate || watch('state') === 'POSTED') return
//       const type = invoiceCk === 'INTERNAL' ? 'INTERNAL' : 'EXTERNAL'
//       const res = await postGenerateMoveLines({
//         type: type,
//         moveType: 'OUT_INVOICE',
//         accountJournalId: watch('accountJournal')?.id,
//         data: invoiceWatch,
//       })

//       if (res.data) {
//         setValue('computeTaxInfo', res.data)
//       }

//       if (res?.data?.moveLines) {
//         setValue('moveLines', res.data.moveLines ?? [])
//       }

//       // unTax
//       if (res.data.taxLines && res.data.taxLines.length > 0) {
//         const amountUntaxed = res.data.taxLines
//           .map((ele, index) => {
//             setValue(`invoiceLines.${index}.amountUntaxed`, ele.untaxedAmount)
//             return ele.untaxedAmount * 100
//           })
//           .reduce((a, b) => a + b, 0)

//         setValue('amountUntaxed', amountUntaxed / 100)
//       }

//       //Tax
//       if (res.data.taxLines && res.data.taxLines.length > 0) {
//         const totalTax = res.data.taxLines
//           .map((ele, index) => {
//             setValue(`invoiceLines.${index}.lineTax`, ele.amount)
//             return ele.amount * 100
//           })
//           .reduce((a, b) => a + b, 0)

//         setValue('totalTax', totalTax / 100)
//       }

//       //Amount
//       const amountTotal = invoiceWatch
//         .map((item, index) => {
//           setValue(
//             `invoiceLines.${index}.amountTotal`,
//             item.amountUntaxed + item.lineTax
//           )
//           return item.amountUntaxed * 100 + item.lineTax * 100
//         })
//         .reduce((a, b) => a + b, 0)
//       setValue('amountTotal', amountTotal / 100)
//     } catch (err) {
//       errorMsg(err)
//     }
//   }, [])

//   useEffect(() => {
//     if (id && data && data.data) {
//       reset({
//         ...data.data,
//         invoiceLines: data.data.invoiceLines.map((item) => ({
//           ...item,
//           taxIds: item?.taxes?.map((item) => item?.id),
//           lineTax: item.amountTotal - item.amountUntaxed,
//         })),
//         moveLines: data.data.moveLines.map((item) => ({
//           ...item,
//           accountId: item.account.id,
//           accountTagIds: item.accountTags.map((item) => item.id),
//         })),
//         totalTax: data.data.amountTotal - data.data.amountUntaxed,
//       })
//     }

//     computeTax()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id, data, reset, computeTax])

//   const {
//     fields,
//     append: appendInvoiceLines,
//     remove: removeInvoiceLines,
//   } = useFieldArray({
//     control,
//     name: 'invoiceLines',
//     keyName: 'key',
//   })

//   const { fields: fieldMoveLines } = useFieldArray({
//     control,
//     name: 'moveLines',
//     keyName: 'key',
//   })

//   const onAfterChangeValue = () => {
//     const t = new Date(Date.now()).getTime() - renderTime
//     if (t < 2000 && f) {
//       clearTimeout(f)
//       renderTime = new Date(Date.now()).getTime()
//     }
//     f = setTimeout(computeTax, 2000)
//   }

//   const invoiceColumns = useMemo(
//     () =>
//       [
//         {
//           header: 'Sản phẩm',
//           fieldName: 'product',
//           styleCell: {
//             style: {
//               minWidth: 350,
//             },
//           },
//         },
//         {
//           header: 'Số lượng',
//           fieldName: 'quantity',
//         },
//         {
//           header: 'Đơn giá' + ` (${currency})`,
//           fieldName: 'unitPrice',
//         },
//         {
//           header: 'Thuế',
//           fieldName: 'taxIds',
//           styleCell: {
//             style: {
//               minWidth: 250,
//             },
//           },
//         },
//         {
//           header: 'Khuyến mại (%)',
//           fieldName: 'discount',
//         },
//         {
//           header: 'Trước thuế' + ` (${currency})`,
//           fieldName: 'amountUntaxed',
//           styleCell: {
//             style: {
//               minWidth: 250,
//             },
//           },
//         },
//         {
//           header: 'Tiền thuế' + ` (${currency})`,
//           fieldName: 'lineTax',
//           styleCell: {
//             style: {
//               minWidth: 250,
//             },
//           },
//         },
//         {
//           header: 'Sau thuế' + ` (${currency})`,
//           fieldName: 'amountTotal',
//           styleCell: {
//             style: {
//               minWidth: 250,
//             },
//           },
//         },
//         {
//           header: '',
//           fieldName: 'action',
//         },
//       ] as ColumnProps[],

//     [currency]
//   )

//   const ProductColumns = useMemo(
//     () =>
//       [
//         {
//           header: 'SKU',
//           fieldName: 'sku',
//           styleCell: {
//             style: {
//               maxWidth: '140px',
//               cursor: 'pointer',
//             },
//           },
//         },
//         {
//           header: 'Tên sản phẩm',
//           fieldName: 'name',
//           styleCell: {
//             style: {
//               maxWidth: '300px',
//               cursor: 'pointer',
//             },
//           },
//         },
//         {
//           header: 'Tổng tồn',
//           fieldName: 'totalInventory',
//           styleCell: {
//             style: {
//               // maxWidth: '200px',
//               cursor: 'pointer',
//             },
//           },
//         },
//         ...(wareHouseList?.data?.content ?? []).map((item) => ({
//           header: item.name,
//           fieldName: item.id,
//           styleCell: {
//             style: {
//               // maxWidth: '100px',
//               cursor: 'pointer',
//             },
//           },
//         })),
//       ] as ColumnProps[],
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     []
//   )

//   const paramsGetProduct = useMemo(() => {
//     return {}
//   }, [])
//   const invoiceLinesTableData = (fields ?? []).map((item, index) => {
//     if (actionType === 'VIEW')
//       return {
//         id: item.key,
//         product: item.product?.name,
//         quantity: item.quantity + ' - ' + item.uom?.name,
//         unitPrice: (
//           <CurrencyFormatCustom variant='body1' amount={item.unitPrice} />
//         ),
//         taxIds: item.taxIds
//           .map((ele) => {
//             if (taxSelect) {
//               return taxSelect.data.content.find((tax) => tax.id === ele)
//             }
//           })
//           .map((item) => item?.name)
//           .join(', '),
//         discount: item.discount,
//         amountUntaxed: (
//           <CurrencyFormatCustom variant='body1' amount={item.amountUntaxed} />
//         ),
//         lineTax: <CurrencyFormatCustom variant='body1' amount={item.lineTax} />,
//         amountTotal: (
//           <CurrencyFormatCustom variant='body1' amount={item.amountTotal} />
//         ),
//       }

//     return {
//       id: item.key,
//       product: (
//         <SelectBoxCustom
//           typePath={type}
//           control={control}
//           columns={ProductColumns}
//           labelPath='name'
//           valuePath='id'
//           params={{}}
//           name={`invoiceLines.${index}.product`}
//           label=''
//           placeholder='Chọn sản phẩm'
//           fetchDataFn={getProductTinyList}
//           // rules={{
//           //   required: t('common:validation.required'),
//           // }}
//           //isHasMessageError={false}
//           //readOnly={watch('state') === 'POSTED'}
//           onChangeValue={async (val) => {
//             // setValue(`invoiceLines.${index}`, currentLine)
//             if (val) {
//               const res = await getUomBaseOfProduct({ productId: val?.id })
//               if (res && res.data)
//                 setValue(`invoiceLines.${index}.uom`, res.data)
//             } else {
//               setValue(`invoiceLines.${index}.uom`, null)
//             }
//             onAfterChangeValue()
//           }}
//         />
//       ),
//       quantity: (
//         <CoreInput
//           control={control}
//           name={`invoiceLines.${index}.quantity`}
//           placeholder='Số lượng'
//           type='number'
//           readOnly={watch('state') === 'POSTED'}
//           rules={{
//             required: t('common:validation.required'),
//           }}
//           inputProps={{
//             maxLength: 20,
//           }}
//           isHasMessageError={false}
//           InputProps={{
//             endAdornment: (
//               <div className='w-90'>
//                 <UomAutocomplete
//                   style={{
//                     border: 'none',
//                   }}
//                   control={control}
//                   name={`invoiceLines.${index}.uom`}
//                   label=''
//                   placeholder='Đơn vị'
//                   fetchDataFn={getUomProductList}
//                   params={{
//                     id: watch(`invoiceLines.${index}.product.id`),
//                   }}
//                   readOnly={watch('state') === 'POSTED'}
//                   isHasMessageError={false}
//                 />
//               </div>
//             ),
//           }}
//           onChangeValue={onAfterChangeValue}
//         />
//       ),
//       unitPrice: (
//         <CoreInput
//           control={control}
//           name={`invoiceLines.${index}.unitPrice`}
//           type='number'
//           rules={{
//             required: t('common:validation.required'),
//           }}
//           inputProps={{
//             maxLength: 19,
//           }}
//           isHasMessageError={false}
//           placeholder='Nhập đơn giá'
//           readOnly={watch('state') === 'POSTED'}
//           onChangeValue={onAfterChangeValue}
//         />
//       ),
//       taxIds: (
//         <CoreAutocomplete
//           multiple={true}
//           control={control}
//           name={`invoiceLines.${index}.taxIds`}
//           loading={isLoadingTax}
//           valuePath='id'
//           labelPath='name'
//           placeholder='Chọn các loại thuế'
//           options={taxSelect ? taxSelect.data.content : []}
//           readOnly={watch('state') === 'POSTED'}
//           onChangeValue={onAfterChangeValue}
//         />
//       ),
//       discount: (
//         <CoreInput
//           control={control}
//           name={`invoiceLines.${index}.discount`}
//           type='number'
//           placeholder='Nhập khuyến mại'
//           onChangeValue={onAfterChangeValue}
//           readOnly={watch('state') === 'POSTED'}
//         />
//       ),
//       amountUntaxed: (
//         <CurrencyFormatCustom
//           variant='body2'
//           amount={getValues(`invoiceLines.${index}.amountUntaxed`)}
//         />
//       ),

//       lineTax: (
//         <CurrencyFormatCustom
//           variant='body2'
//           amount={getValues(`invoiceLines.${index}.lineTax`)}
//         />
//       ),

//       amountTotal: (
//         <CurrencyFormatCustom
//           variant='body2'
//           amount={getValues(`invoiceLines.${index}.amountTotal`)}
//         />
//       ),
//       action:
//         watch('state') === 'POSTED' ? null : (
//           <Action
//             actionList={['delete']}
//             onDeleteAction={() => {
//               removeInvoiceLines(index)
//             }}
//           />
//         ),
//     }
//   })

//   const moveLinesColumns = useMemo(
//     () =>
//       [
//         {
//           header: 'Tài khoản',
//           fieldName: 'accountId',
//           styleCell: {
//             style: {
//               minWidth: 300,
//             },
//           },
//         },
//         {
//           header: 'Nhãn',
//           fieldName: 'label',
//           styleCell: {
//             style: {
//               minWidth: 300,
//             },
//           },
//         },
//         {
//           header: 'Nợ' + ` (${currency})`,
//           fieldName: 'debit',
//           styleCell: {
//             style: {
//               minWidth: 300,
//             },
//           },
//         },
//         {
//           header: 'Có' + ` (${currency})`,
//           fieldName: 'credit',
//           styleCell: {
//             style: {
//               minWidth: 300,
//             },
//           },
//         },
//       ] as ColumnProps1[],
//     [currency]
//   )
//   const ledgerRefs = (fieldLedgerRefs ?? []).map((item, index) => {
//     if (actionType === 'VIEW') {
//       return (
//         <Stack key={index} direction='row' justifyContent='space-between'>
//           <Typography>{item?.accountLedger?.name}</Typography>
//           <Typography>{item?.accountJournal?.name}</Typography>
//         </Stack>
//       )
//     }
//   })
//   const moveLinesTableData = (fieldMoveLines ?? []).map((item, index) => {
//     if (actionType === 'VIEW') {
//       return {
//         label: item.label ?? '-',
//         debit: <CurrencyFormatCustom amount={item.debit} />,
//         credit: <CurrencyFormatCustom amount={item.credit} />,
//       }
//     }

//     return {
//       accountId: (
//         <CoreAutocomplete
//           control={control}
//           name={`moveLines.${index}.accountId`}
//           placeholder='Chọn account'
//           valuePath='id'
//           labelPath='name'
//           loading={isLoadingAccountSelect}
//           options={(accountSelect?.data.content ?? []).map((item) => ({
//             id: item.id,
//             name: item.code + ' - ' + item.name,
//           }))}
//           rules={{
//             required: t('common:validation.required'),
//           }}
//           isHasMessageError={false}
//           readOnly={watch('state') === 'POSTED'}
//         />
//       ),
//       label: (
//         <CoreInput
//           control={control}
//           name={`moveLines.${index}.label`}
//           readOnly={watch('state') === 'POSTED'}
//         />
//       ),
//       debit: (
//         <CoreInput
//           control={control}
//           name={`moveLines.${index}.debit`}
//           type='number'
//           readOnly={watch('state') === 'POSTED'}
//         />
//       ),
//       credit: (
//         <CoreInput
//           control={control}
//           name={`moveLines.${index}.credit`}
//           type='number'
//           readOnly={watch('state') === 'POSTED'}
//         />
//       ),
//       accountTagIds: (
//         <CoreAutocomplete
//           multiple
//           control={control}
//           name={`moveLines.${index}.accountTagIds`}
//           placeholder='Chọn account tag'
//           valuePath='id'
//           labelPath='name'
//           loading={isLoadingAccountTag}
//           options={accountTagSelect ? accountTagSelect.data.content : []}
//           readOnly={watch('state') === 'POSTED'}
//         />
//       ),
//     }
//   })

//   const incomeExpenseColumns = useMemo(
//     () =>
//       [
//         {
//           header: 'Mã đối tượng',
//           fieldName: 'code',
//         },
//         {
//           header: 'Tên đối tượng',
//           fieldName: 'name',
//         },
//       ] as ColumnProps[],
//     []
//   )

//   // SUBMIT
//   const onCancel = () => {
//     router.back()
//   }

//   const { mutate, isLoading: isLoadingSubmit } = useMutation(
//     isUpdate ? putAccountMove : postAccountMove,
//     {
//       onSuccess: (res) => {
//         successMsg(t('common:message.success'))
//         if (res?.data?.data?.id) {
//           router.push({
//             pathname: `${MENU_URL.CUSTOMER.INVOICE[invoiceCk][typeInvoice]}/[id]`,
//             query: {
//               id: res?.data?.data?.id,
//               actionType: 'VIEW',
//             },
//           })
//           refetch()
//         }
//       },
//       onError: (error) => {
//         errorMsg(error, setError)
//       },
//     }
//   )
//   const isCheckValidate = (input: AccountMoveDetail) => {
//     let flag = true
//     const { moveLines, invoiceLines } = input

//     if (!invoiceLines || invoiceLines.length < 1) {
//       errorMsg('Vui lòng nhập thông tin sản phẩm.')
//       flag = false
//     }

//     // moveLines.map((item, index) => {
//     //   if (!item.accountId) {
//     //     if (valueTab === 'Detail') setValueTab('Entry')
//     //     setError(`moveLines.${index}.accountId`, {
//     //       message: t('common:validation.required') as string,
//     //     })
//     //     flag = false
//     //   }
//     // })

//     const totalCredit = moveLines
//       .map((item) => item.credit)
//       .reduce((a, b) => a + b, 0)

//     const debitTotal = moveLines
//       .map((item) => item.debit)
//       .reduce((a, b) => a + b, 0)

//     // if (totalCredit !== debitTotal) {
//     //   if (valueTab === 'Detail') setValueTab('Entry')
//     //   errorMsg('Tổng nợ phải bằng tổng có.')
//     //   flag = false
//     // }

//     return flag
//   }

//   const onDraftSubmit = handleSubmit(async (input) => {
//     if (isCheckValidate(input))
//       if (watch('isAnotherBook') === false) {
//         mutate({
//           requestBody: {
//             ...input,
//             state: 'DRAFT',
//             ledgerRefs: [],
//           },
//           typeInvoice: formatType,
//         })
//       } else {
//         mutate({
//           requestBody: {
//             ...input,
//             state: 'DRAFT',
//           },
//           typeInvoice: formatType,
//         })
//       }
//   })

//   const paramsPartner = (typeInvoice: string) => {
//     if (typeInvoice === 'MERCHANT') {
//       return {
//         isMerchant: true,
//         status: 'APPROVED',
//         merchantActivated: true,
//       }
//     } else if (typeInvoice === 'LIQUIDATION') {
//       return { isActivated: true }
//     } else {
//       const typeInv = typeInvoice.toLowerCase()
//       const params: { [key: string]: any } = {
//         [`is${capitalize(typeInv)}`]: true,
//       }
//       params[`${typeInvoice.toLowerCase()}Activated`] = true
//       return params
//     }
//   }
//   const onSubmit = handleSubmit(async (input) => {
//     if (watch('accountingDate')) {
//       if (isCheckValidate(input)) {
//         if (watch('isAnotherBook') === false) {
//           mutate({
//             requestBody: {
//               ...input,
//               state: 'POSTED',
//               ledgerRefs: [],
//             },
//             typeInvoice: formatType,
//           })
//         } else {
//           mutate({
//             requestBody: {
//               ...input,
//               state: 'POSTED',
//             },
//             typeInvoice: formatType,
//           })
//         }
//       }
//     } else {
//       setError('accountingDate', {
//         message: t('common:validation.required') as string,
//       })
//     }
//   })

//   return [
//     {
//       id,
//       actionType,
//       isUpdate,
//       codeLedger,
//       data,
//       valueTab,
//       invoiceName: data ? data?.data?.code : null,
//       control,
//       formState,
//       isLoading,
//       isLoadingSubmit,
//       methodForm,
//       invoiceColumns,
//       invoiceLinesTableData,
//       moveLinesColumns,
//       moveLinesTableData,
//       incomeExpenseColumns,
//       ledgerRefs,
//       fieldLedgerRefs,
//       idLedger,
//     },
//     {
//       refetch,
//       paramsPartner,
//       onSubmit,
//       onDraftSubmit,
//       onCancel,
//       append,
//       remove,
//       appendInvoiceLines,
//       removeInvoiceLines,
//       computeTax,
//       handleChangeTab,
//       onAfterChangeValue,
//       showDialog,
//       hideDialog,
//     },
//   ] as const
// }

// export default useCustomerInvoice

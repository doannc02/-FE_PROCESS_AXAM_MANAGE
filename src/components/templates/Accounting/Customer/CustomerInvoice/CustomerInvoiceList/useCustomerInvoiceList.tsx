// import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
// import InvoiceStatus from '@/components/atoms/InvoiceStatus'
// import PaymentStatus from '@/components/atoms/PaymentStatus'
// import { useDialog } from '@/components/hooks/dialog/useDialog'
// import { ColumnProps } from '@/components/organism/CoreTable'
// import { RED } from '@/helper/colors'
// import { convertToDate } from '@/utils/date/convertToDate'
// import { useFormCustom } from '@/lib/form'
// import { useCheckPath } from '@/path'
// import { useAppSelector } from '@/redux/hook'
// import { TRANSLATE } from '@/routes'
// import { useQueryGetAccountMoveList } from '@/service/accounting/accountMove/getList'
// import { RequestBody } from '@/service/accounting/accountMove/getList/type'
// import { Typography } from '@mui/material'
// import _ from 'lodash'
// import moment from 'moment'
// import { useTranslation } from 'next-i18next'
// import { useRouter } from 'next/router'
// import { useMemo, useState } from 'react'

// const useCustomerInvoiceList = () => {
//   const { t } = useTranslation(TRANSLATE.ACCOUNT_INVOICE)
//   const router = useRouter()
//   const { typeInvoice, invoiceCk } = useCheckPath()
//   const formatType =
//     invoiceCk === 'NORMAL'
//       ? typeInvoice.toLowerCase()
//       : typeInvoice === 'INTERNAL'
//       ? `${typeInvoice.toLowerCase()}`
//       : `${typeInvoice.toLowerCase()}-internal`

//   const defaultValues = {
//     search: '',
//     page: 0,
//     size: 20,
//     startDate: convertToDate(moment().startOf('month'), 'YYYY-MM-DD'),
//     endDate: convertToDate(moment().endOf('month'), 'YYYY-MM-DD'),
//     ...router.query,
//   }

//   const methodForm = useFormCustom<RequestBody['GET']>({
//     defaultValues,
//   })

//   const { id } = useAppSelector((state) => state.ledgerRefData)
//   const { currency } = useAppSelector((state) => state.companyConfigData)
//   const { showDialog } = useDialog()

//   const columns = useMemo(
//     () =>
//       [
//         {
//           header: t('table.code'),
//           fieldName: 'code',
//         },
//         {
//           header: t('table.partner'),
//           fieldName: 'partner',
//         },
//         {
//           header: t('table.date'),
//           fieldName: 'date',
//         },
//         {
//           header: t('table.dueDate'),
//           fieldName: 'dueDate',
//         },
//         {
//           header: t('table.amountUntaxed') + ` (${currency})`,
//           fieldName: 'amountUntaxed',
//         },
//         {
//           header: t('table.amountTotal') + ` (${currency})`,
//           fieldName: 'amountTotal',
//         },
//         {
//           header: t('table.paymentStatus'),
//           fieldName: 'paymentStatus',
//         },
//         {
//           header: t('table.state'),
//           fieldName: 'state',
//         },
//       ] as ColumnProps[],
//     [currency, t]
//   )
//   const columnsAll = useMemo(
//     () =>
//       [
//         {
//           header: t('table.code'),
//           fieldName: 'code',
//         },
//         {
//           header: t('table.saleType'),
//           fieldName: 'saleType',
//         },
//         {
//           header: t('table.partner'),
//           fieldName: 'partner',
//         },
//         {
//           header: t('table.date'),
//           fieldName: 'date',
//         },
//         {
//           header: t('table.dueDate'),
//           fieldName: 'dueDate',
//         },
//         {
//           header: t('table.amountUntaxed') + ` (${currency})`,
//           fieldName: 'amountUntaxed',
//         },
//         {
//           header: t('table.amountTotal') + ` (${currency})`,
//           fieldName: 'amountTotal',
//         },
//         {
//           header: t('table.paymentStatus'),
//           fieldName: 'paymentStatus',
//         },
//         {
//           header: t('table.state'),
//           fieldName: 'state',
//         },
//       ] as ColumnProps[],
//     [currency, t]
//   )

//   const [queryPage, setQueryPage] = useState<any>(
//     _.omitBy(defaultValues, _.isNil)
//   )
//   const onChangePageSize = (val: any) => {
//     const { page, size } = val
//     const input = { ...queryPage, page, size }

//     setQueryPage(input)
//   }

//   const onReset = () => {
//     methodForm.reset(defaultValues)
//     const input = _.omitBy(defaultValues, (v) => _.isNil(v))
//     setQueryPage(input)
//   }

//   const onSubmit = methodForm.handleSubmit(async (input) => {
//     setQueryPage(input)
//   })

//   const {
//     isLoading: isLoadingTable,
//     data,
//     refetch,
//   } = useQueryGetAccountMoveList({
//     ...queryPage,
//     typePathInvoice: formatType,
//     accountLedgerId: id,
//   })

//   const tableData = (data?.data?.content ?? []).map((item) => {
//     if (router.asPath.includes('/all')) {
//       return {
//         id: item.id,
//         code: <Typography variant='subtitle1'>{item.code}</Typography>,
//         partner: item.partner
//           ? item.partner?.code + ' - ' + item.partner?.name
//           : '',
//         saleType: item.saleType === 'LIQUIDATION' ? 'Thanh Lý' : item.saleType,
//         date: convertToDate(item.date),
//         dueDate: convertToDate(item.dueDate),
//         amountUntaxed: (
//           <CurrencyFormatCustom amount={item.amountUntaxed} color={RED} />
//         ),
//         amountTotal: (
//           <CurrencyFormatCustom amount={item.amountTotal} color={RED} />
//         ),
//         paymentStatus: <PaymentStatus value={item.paymentStatus} />,
//         state: <InvoiceStatus value={item.state} />,
//       }
//     } else
//       return {
//         id: item.id,
//         code: <Typography variant='subtitle1'>{item.code}</Typography>,
//         partner: item.partner
//           ? item.partner?.code + ' - ' + item.partner?.name
//           : '',
//         date: convertToDate(item.date),
//         dueDate: convertToDate(item.dueDate),
//         amountUntaxed: (
//           <CurrencyFormatCustom amount={item.amountUntaxed} color={RED} />
//         ),
//         amountTotal: (
//           <CurrencyFormatCustom amount={item.amountTotal} color={RED} />
//         ),
//         paymentStatus: <PaymentStatus value={item.paymentStatus} />,
//         state: <InvoiceStatus value={item.state} />,
//       }
//   })

//   return [
//     {
//       methodForm,
//       columns,
//       isLoadingTable,
//       tableData,
//       page: data?.data?.page,
//       size: data?.data?.size,
//       totalPages: data?.data?.totalPages,
//       columnsAll,
//     },
//     { onSubmit, onReset, onChangePageSize, refetch },
//   ] as const
// }

// export default useCustomerInvoiceList

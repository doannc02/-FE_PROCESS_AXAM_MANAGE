// import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
// import { useDialog } from '@/components/hooks/dialog/useDialog'
// import { Action } from '@/components/molecules/Action'
// import { ColumnProps } from '@/components/organism/CoreTable'
// import { RED } from '@/helper/colors'
// import { useCheckPathInventory } from '@/path'
// import { useQueryGetInventoryByVariants } from '@/service/warehouse/inventoryWarehouse/viewInventoryByVariants/list'
// import { RequestParams } from '@/service/warehouse/inventoryWarehouse/viewInventoryByVariants/list/type'
// import { useRouter } from 'next/router'
// import { useMemo, useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { DialogViewGroupProductByLotsOrSerial } from './Dialog/DialogViewGroupProductByLotsOrSerial'

// const defaultValues = {
//   search: '',
//   sku: '',
//   name: '',
//   page: 0,
//   size: 20,
//   checkingType: 'ALL',
//   productTemplateId: null,
// }

// export const listType = [
//   { value: 'ALL', label: 'Tất cả' },
//   {
//     value: 'LOTS',
//     label: 'Biến thể xem theo lô',
//   },
//   {
//     value: 'SERIAL',
//     label: 'Biến thể xem theo serial',
//   },
// ]

// export const useInventoryByVariants = () => {
//   const router = useRouter()
//   const { typePath } = useCheckPathInventory()
//   const { showDialog } = useDialog()
//   const [queryPage, setQueryPage] =
//     useState<RequestParams['GET']>(defaultValues)
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
//   const open = Boolean(anchorEl)
//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget)
//   }
//   const handleClose = () => {
//     setAnchorEl(null)
//   }

//   const methodForm = useForm<RequestParams['GET']>({
//     defaultValues,
//   })

//   const onSubmit = methodForm.handleSubmit(async (data) => {
//     setQueryPage({ ...queryPage, ...data })
//   })

//   const onReset = () => {
//     methodForm.reset()
//     setQueryPage(defaultValues)
//   }

//   const onChangePageSize = (val: any) => {
//     const { page, size } = val
//     setQueryPage({ ...queryPage, page: page, size })
//   }

//   const columns = useMemo(
//     () =>
//       [
//         {
//           header: 'SKU',
//           fieldName: 'sku',
//         },
//         {
//           header: 'Tên sản phẩm',
//           fieldName: 'name',
//         },
//         {
//           header: 'Tồn trong kho',
//           fieldName: 'quantity',
//         },
//         {
//           header: 'Tồn bán hàng',
//           fieldName: 'availableQuantity',
//         },
//         {
//           header: 'Tồn giữ hàng',
//           fieldName: 'reservedQuantity',
//         },
//         ...(typePath === 'DEPARTMENT'
//           ? [{ header: 'Giá trị tồn', fieldName: 'productPrice' }]
//           : []),
//         {
//           header: 'Hành động',
//           fieldName: 'action',
//         },
//       ] as ColumnProps[],
//     [typePath]
//   )

//   const { isLoading, data, refetch } = useQueryGetInventoryByVariants(queryPage)

//   const rowData = data
//     ? (data?.content ?? []).map((item) => {
//         return {
//           ...item,
//           availableQuantity: (
//             <>
//               <CurrencyFormatCustom
//                 amount={item?.availableQuantity}
//                 className='contents'
//               />{' '}
//               {item?.uomName ?? ''}
//             </>
//           ),
//           quantity: (
//             <>
//               <CurrencyFormatCustom
//                 amount={item?.quantity}
//                 className='contents'
//               />{' '}
//               {item?.uomName ?? ''}
//             </>
//           ),
//           reservedQuantity: (
//             <>
//               <CurrencyFormatCustom
//                 amount={item?.reservedQuantity}
//                 className='contents'
//               />{' '}
//               {item?.uomName ?? ''}
//             </>
//           ),
//           productPrice: (
//             <CurrencyFormatCustom
//               amount={item?.productTotalPrice}
//               showCurrencyName
//               color={RED}
//             />
//           ),
//           action: item?.sku && (
//             <Action
//               actionList={['watch']}
//               onWatchAction={() =>
//                 showDialog(
//                   <DialogViewGroupProductByLotsOrSerial
//                     title={item?.name}
//                     checkingType={queryPage.checkingType}
//                     productId={item?.productId}
//                   />
//                 )
//               }
//             />
//           ),
//         }
//       })
//     : []

//   return [
//     {
//       methodForm,
//       isLoading,
//       columns,
//       rowData,
//       data,
//       open,
//       anchorEl,
//       queryPage,
//       locationData: data?.content ?? [],
//     },
//     {
//       onSubmit,
//       onReset,
//       refetch,
//       onChangePageSize,
//       handleClick,
//       handleClose,
//       setQueryPage,
//     },
//   ] as const
// }

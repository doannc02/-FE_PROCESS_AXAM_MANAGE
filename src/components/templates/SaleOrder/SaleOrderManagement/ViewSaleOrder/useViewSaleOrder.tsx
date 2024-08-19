// import CoreInput from '@/components/atoms/CoreInput'
// import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
// import { useDialog } from '@/components/hooks/dialog/useDialog'

// import { Action } from '@/components/molecules/Action'
// import { MAX_VALUE } from '@/helper/contain'
// import { errorMsg, successMsg } from '@/helper/message'
// import { useFormCustom } from '@/lib/form'
// import { useAppSelector } from '@/redux/hook'
// import { MENU_URL } from '@/routes'
// import { useQueryGetAccountMoveList } from '@/service/accounting/accountMove/getList'
// import { useQueryGetListPaymentTerm } from '@/service/accounting/paymentTerm/list'
// import { useQueryGetListTax } from '@/service/accounting/tax/list'
// import { useQueryGetCompanyUserLogin } from '@/service/common/company/userLogin'
// import { useQueryGetPolicyPartner } from '@/service/product/priceList/getPolicyOfPartner'
// import { getPriceForProduct } from '@/service/product/priceList/getPriceForProduct'
// import { Product } from '@/service/salesOrder/salesOrder/getAllSaleProducts/type'
// import { postComputeTaxLines } from '@/service/salesOrder/computeTax/post'
// import { useQueryGetDetailCustomer } from '@/service/salesOrder/customer/details'
// import { useQueryCheckDebtConfigPartner } from '@/service/salesOrder/salesOrder/checkDebtConfigPartner'
// import { checkExceedDebtLimit } from '@/service/salesOrder/salesOrder/checkExceedDebtLimit'
// import { createSaleOrder } from '@/service/salesOrder/salesOrder/create'
// import {
//   RequestBody,
//   SaleOrderLines,
// } from '@/service/salesOrder/salesOrder/create/type'
// import { useQueryGetSalesOrderById } from '@/service/salesOrder/salesOrder/getDetail'
// import { sendEmailOrder } from '@/service/salesOrder/salesOrder/sendEmail'

// import { useQueryGetWarehouseList } from '@/service/warehouse/getList'
// import { InputAdornment } from '@mui/material'
// import Image from 'next/image'
// import { useRouter } from 'next/router'
// import { useEffect, useMemo, useState } from 'react'
// import { useFieldArray } from 'react-hook-form'

// import { ProductSelect } from './components/ProductSelect'
// import { SelectBoxCustomV2 } from '@/components/atoms/SelectBoxCustomV2'
// import { ColumnProps } from '@/components/organism/CoreTable'
// import { useQueryGetListCurrencyByCompany } from '@/service/common/currency/listCurrencyByCompany'
// import { useQueryGetCustomerList } from '@/service/common/customer/list'
// import { useQueryGetPriceListByCurrency } from '@/service/product/priceList/getPriceListByCurrency'
// import { useQueryGetDetailFeatureConfig } from '@/service/salesOrder/featureConfig/detail'
// import { getProductOfPriceList } from '@/service/salesOrder/salesOrder/getAllProductPriceList'
// import { getProductOfPriceListPolicy } from '@/service/salesOrder/salesOrder/getAllProductsPriceListPolicy'
// import { getAllSaleProducts } from '@/service/salesOrder/salesOrder/getAllSaleProducts'
// import { ConfirmDebtLimitDialog } from './dialog/ComfirmDebtLimitDialog'
// import ProductTooltip from './tooltip/productTooltip'
// import QuantityTooltip from './tooltip/quantityTooltip'
// import { useQueryGetSaleConfigController } from '@/service/salesOrder/salesConfigController/get'
// import moment from 'moment'
// import useCheckPath from '@/components/hooks/path/useCheckPath'

// export interface ProducFormat extends Product {
//   label: string
//   totalQuantity: number
// }

// type ParamsWarehouseLocation = {
//   page: number
//   size: number
//   warehouseId?: number
// }

// const defaultQueryAll = {
//   search: '',
//   page: 0,
//   size: 1000,
//   activated: true,
// }

// export const payments = [
//   {
//     label: 'Tiền mặt',
//     value: 'CASH',
//   },
//   {
//     label: 'Ngân hàng',
//     value: 'BANK_TRANSFER',
//   },
//   {
//     label: 'Thẻ tín dụng',
//     value: 'CREDIT',
//   },
//   {
//     label: 'Công nợ',
//     value: 'DEDUCTION_OF_LIABILITIES',
//   },
// ]

// const transactionMethod = [
//   {
//     label: 'Giao tại kho nhà máy',
//     value: 'TAKE_AWAY',
//   },
//   {
//     label: 'Giao cho khách-khách hàng chịu phí',
//     value: 'SHIP',
//   },
//   {
//     label: 'Giao cho khách (freeship)',
//     value: 'FREE_SHIP',
//   },
// ]

// export const scopeTypeSelect = [
//   {
//     label: 'Hóa đơn bán hàng trong nước',
//     value: 'DOMESTICALLY',
//   },
//   {
//     label: 'Hóa đơn bán hàng xuất khẩu',
//     value: 'EXPORTED',
//   },
// ]

// const shippingPolicy = [
//   {
//     label: 'Giao từng phần',
//     value: 'FASTER',
//   },
//   {
//     label: 'Giao hàng đầy đủ',
//     value: 'FULL_DELIVERY',
//   },
// ]

// let f: any = null

// type RequestGetPrice = {
//   productCategoryId: number
//   productTemplateId: number
//   productId: number
//   quantity: number
//   index: number
// }

// export const useCreateAndUpdateSaleOrder = () => {
//   let renderTime = new Date(Date.now()).getTime()

//   const router = useRouter()
//   const { id } = router.query
//   const isEdit = id !== 'new' ? true : false
//   const { type } = useCheckPath()
//   const { showDialog } = useDialog()

//   const [typeInput, setTypeInput] = useState<string>('')
//   const [titleValue, setTitleValue] = useState<string>('')

//  // just is flag to check click button submit
//   const [typeSubmit, setTypeSubmit] = useState<'SAVE' | 'CONFIRM'>('SAVE')

//   const { currency, floatRounding } = useAppSelector(
//     (state) => state.companyConfigData
//   )

//   const PATH_URL = MENU_URL.BILLS[type].SALE_ORDER

//   const {
//     register,
//     handleSubmit,
//     watch,
//     setError,
//     control,
//     formState,
//     trigger,
//     setValue,
//     reset,
//     getValues,
//   } = useFormCustom<RequestBody['POST']>({
//     defaultValues: {
//       code: '',
//       createAt: '',
//       quoteCreationDate: '',
//       holdDate: '',
//       state: 'DRAFT',
//       quotationDate: '',
//       orderDate: '',
//       validityDate: '',
//       pricelistId: undefined,
//       paymentTermId: null,
//       promotionIds: [],
//       paymentMethod: '',
//       salePersonIds: [],
//       saleUserIds: [],
//       deliveryType: '',
//       commitmentDate: '',
//       deliveryStatus: 'PENDING',
//       deliveryPolicy: '',
//       campaignId: 0,
//       expireHoldDate: moment().add(3, 'day').format(),
//       pickingIds: [],
//       discount: 0,
//       discountComputeType: '',
//       note: '',
//       titleValue: '',
//       saleOrderLines: [],
//       partnerId: undefined,
//       isOptionPrice: false,
//     },
//   })

//   const watchSaleOrderLineDeleteIds = watch('saleOrderLineDeleteIds')
//   const watchPartnerId = watch('partnerId')
//   const watchScopeType = watch('scopeType')
//   const watchCurrencyId = watch('currencyId')
//   const watchIsOptionPrice = watch('isOptionPrice')
//   const watchPriceListId = watch('pricelistId')
//   const watchWarehouseId = watch('warehouseId')

//  // Get the configuration of the current single type
//   const { data: dataConfigSaleOrder } = useQueryGetDetailFeatureConfig()

//  // Get pricelist by currency
//   const { data: listPriceList } = useQueryGetPriceListByCurrency(
//     {
//       currencyId: watchCurrencyId,
//     },
//     { enabled: !!watchCurrencyId && watchIsOptionPrice }
//   )

//  // Danh sách nhân viên
//   const { data: userList } = useQueryGetUserList({
//     page: 0,
//     size: MAX_VALUE,
//     isActive: true,
//   })

//  // get detail policy of partner
//   const { data: dataPolicyPartner } = useQueryGetPolicyPartner(
//     {
//       partnerId: watchPartnerId,
//     },
//     {
//       enabled: type === 'MERCHANT' && watchIsOptionPrice,
//     }
//   )

//  // Check to see if the customer has debt configured
//   const { data: dataDebtConfigPartner } = useQueryCheckDebtConfigPartner(
//     {
//       partnerId: watchPartnerId,
//     },
//     {
//       enabled: !!watchPartnerId,
//     }
//   )

//   const { data: listCustomer, refetch: refetchListCustomer } =
//     useQueryGetCustomerList({
//       page: defaultQueryAll.page,
//       size: defaultQueryAll.size,
//       ...(type === 'MERCHANT'
//         ? { merchantActivated: true, status: 'APPROVED' }
//         : {}),
//       ...(type === 'CLEARANCE' ? { isCustomer: true } : {}),
//     })

//   const transformedUserList = (userList?.content ?? []).map(
//     ({ firstName, lastName, ...rest }) => ({
//       ...rest,
//       name: `${lastName} ${firstName}`,
//     })
//   )

//  // List wareHouse
//   const { data: wareHouseList } = useQueryGetWarehouseList({
//     page: 0,
//     size: MAX_VALUE,
//   })

//   //Get list payment term
//   const { data: listPaymentTerm } = useQueryGetListPaymentTerm({
//     ...defaultQueryAll,
//     type: 'SALE',
//   })

//   //get all tax list
//   const { data: listTax } = useQueryGetListTax({
//     page: defaultQueryAll.page,
//     size: defaultQueryAll.size,
//     active: true,
//     type: 'SALE',
//     scopeType: watchScopeType,
//   })
//  // get Detail sale order
//   const {
//     isLoading: isLoadingSalesOrderDetails,
//     data: salesOrderDetails,
//     refetch,
//   } = useQueryGetSalesOrderById({ id, isEdit }, { enabled: isEdit })

//   const { data: companyUserLoginData } = useQueryGetCompanyUserLogin()

//   //Get list of currencies by company(token)
//   const { data: listCurrencyCompany } = useQueryGetListCurrencyByCompany({})

//   //get detail customer by id
//   const { data: dataCustomerDetails } = useQueryGetDetailCustomer({
//     id: watchPartnerId,
//   })

//  // saleconfig common
//   const { data: dataSaleConfig } = useQueryGetSaleConfigController({})

//   const {
//     isLoading: isLoadingInvoiceList,
//     data: invoiceList,
//     refetch: refetchInvoiceList,
//   } = useQueryGetAccountMoveList(
//     {
//       page: defaultQueryAll.page,
//       size: defaultQueryAll.size,
//       moveType: 'OUT_INVOICE',
//       saleId: Number(id),
//     },
//     {
//       enabled: isEdit,
//     }
//   )

//   const getDataProductByType = useMemo(() => {
//     // Get price according to price list + 'Merchant order' ==> Get products according to policy
//     // Get price according to price list + (B2B || B2C) ==> Get products according to pricelist
//     // Do not take prices from the price list ==> Get all product for sale
//     return watchIsOptionPrice && type === 'MERCHANT'
//       ? getProductOfPriceListPolicy
//       : watchIsOptionPrice
//       ? getProductOfPriceList
//       : getAllSaleProducts
//    // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [type, watchIsOptionPrice])

//   const paramsGetProduct = useMemo(() => {
//     return watchIsOptionPrice && type === 'MERCHANT'
//       ? {
//           priceListPolicyId: dataPolicyPartner?.id,
//           warehouseId: watchWarehouseId,
//         }
//       : watchIsOptionPrice
//       ? { priceListId: watchPriceListId, warehouseId: watchWarehouseId }
//       : {
//           warehouseId: watchWarehouseId,
//         }
//   }, [
//     type,
//     watchIsOptionPrice,
//     watchPriceListId,
//     dataPolicyPartner,
//     watchWarehouseId,
//   ])

//   const getProductPriceInPriceList = async (
//     requestGetPrice: RequestGetPrice
//   ) => {
//     const typePriceList =
//       type === 'MERCHANT'
//         ? type
//         : type === 'WHOLESALE'
//         ? 'B2B'
//         : type === 'RETAIL'
//         ? 'B2C'
//         : false
//     try {
//       if (!!watchPriceListId && !!typePriceList) {
//         const res = await getPriceForProduct(
//           {
//             ...requestGetPrice,
//             priceListId: watchPriceListId,
//           },
//           typePriceList
//         )
//         if (!!res.price) {
//           setValue(
//             `saleOrderLines.${requestGetPrice.index}.unitPrice`,
//             res.price
//           )
//         }
//         computeTax()
//       }
//     } catch (error) {
//       errorMsg(error)
//     }
//   }

//   const isCheckRemainingQuantityCanGenerateInvoice = (
//     lines: SaleOrderLines[]
//   ): boolean => {
//     const hasProduct = lines.some((item) => item.remainInvoiceQty > 0)
//     return !!hasProduct
//   }

//   const columns = useMemo(
//     () => [
//       {
//         header: 'SKU/Tên sản phẩm',
//         fieldName: 'productId',
//         styleCell: {
//           style: {
//             minWidth: '200px',
//             verticalAlign: 'top',
//           },
//         },
//       },
//       {
//         header: 'Số lượng đặt hàng',
//         fieldName: 'orderQty',
//         styleCell: {
//           style: {
//             minWidth: '160px',
//              verticalAlign: 'top'
//           },
//         },
//       },
//       {
//         header: 'Số lượng quy đổi',
//         fieldName: 'quantity',
//         styleCell: {
//           style: {
//             minWidth: '140px',
//             verticalAlign: 'top'
//           },
//         },
//       },
//       {
//         header: 'Tồn kho',
//         fieldName: 'quantityInventory',
//         styleCell: {
//           style: {
//             verticalAlign: 'top',
//             minWidth: '100px',
//           },
//         },
//       },
//       {
//         header: `Đơn giá (${currency})`,
//         fieldName: 'unitPrice',
//         styleCell: {
//           style: {
//             minWidth: '140px',
//             verticalAlign: 'top',
//           },
//         },
//       },
//       ...(!watchIsOptionPrice
//         ? [
//             {
//               header: 'Chiết khấu',
//               fieldName: 'discount',
//               styleCell: {
//                 alignItems: 'start',
//                 style: {
//                   verticalAlign: 'top',
//                   minWidth: '140px',
//                 },
//               },
//             },
//           ]
//         : []),
//       {
//         header: `Thành tiền (Chưa thuế)(${currency})`,
//         fieldName: 'amountUntaxed',
//         styleCell: {
//           style: {
//             verticalAlign: 'top',
//             minWidth: '140px',
//           },
//         },
//       },
//       {
//         header: 'Loại thuế',
//         fieldName: 'taxIds',
//         styleCell: {
//           style: {
//             minWidth: '200px',
//             verticalAlign: 'top',
//           },
//         },
//       },
//       {
//         header: `Tiền thuế(${currency})`,
//         fieldName: 'taxMoney',
//         styleCell: {
//           style: {
//             verticalAlign: 'top',
//             minWidth: '140px',
//           },
//         },
//       },
//       {
//         header: `Thành tiền(${currency})`,
//         fieldName: 'amountTotal',
//         styleCell: {
//           style: {
//             verticalAlign: 'top',
//             minWidth: '140px',
//           },
//         },
//       },
//       {
//         header: '',
//         fieldName: 'action',
//       },
//     ],
//    // eslint-disable-next-line react-hooks/exhaustive-deps
//     [watchIsOptionPrice]
//   )

//   const tables = useMemo(
//     () => [
//       {
//         header: 'SKU',
//         fieldName: 'sku',
//       },
//       {
//         header: 'Tên sản phẩm',
//         fieldName: 'name',
//         render: (val: any) => {
//           return <ProductTooltip value={val} />
//         },
//       },
//       {
//         header: 'Số lượng',
//         fieldName: 'quantity',
//         render: (val: any) => {
//           return <QuantityTooltip value={val} />
//         },
//       },
//       {
//         header: 'Tổng trọng lượng',
//         fieldName: 'sumOfWeight',
//       },
//     ],
//     []
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
//               maxWidth: '200px',
//               cursor: 'pointer',
//             },
//           },
//         },
//         ...(wareHouseList?.content ?? []).map((item) => ({
//           header: item.name,
//           fieldName: item.id,
//           styleCell: {
//             style: {
//               maxWidth: '100px',
//               cursor: 'pointer',
//             },
//           },
//         })),
//       ] as ColumnProps[],
//     [wareHouseList]
//   )

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'saleOrderLines',
//     keyName: 'key',
//   })

//   const listProductIdSort = useMemo(() => {
//     const productIds: number[] = []
//     watchApplicableProduct?.forEach((el: SaleOrderLines) => {
//       if (el.type === 'PRODUCT' && el.productId) {
//         productIds.push(el.productId)
//       }
//     })
//     return productIds.sort((a, b) => {
//       return a - b
//     })
//     // eslint-disable-next-line
//   }, [JSON.stringify(watchApplicableProduct)])

//   const computeTax = async () => {
//     let validate = true
//     renderTime = new Date(Date.now()).getTime()
//     const watchDataLines = watch('saleOrderLines')
//     try {
//       const data = watchDataLines.map((item) => {
//         if (item.quantity === null || item.unitPrice === null) {
//           validate = false
//         }
//         return {
//           quantity: item.quantity ?? 0,
//           unitPrice: item.unitPrice ?? 0,
//           discount: item.discount ?? 0,
//           taxIds: item.taxIds ?? [],
//         }
//       })
//       const res = await postComputeTaxLines(data)
//       setValue('computeTaxInfo', res)
//     } catch (error) {
//       errorMsg(error)
//     }
//   }

//   const onCheckTimeAction = (func: any, arg?: any) => {
//     const t = new Date(Date.now()).getTime() - renderTime
//     if (t < 1200 && f) {
//       clearTimeout(f)
//     }
//     renderTime = new Date(Date.now()).getTime()
//     f = setTimeout(() => {
//       func(arg)
//     }, 1200)
//   }

//   const dataGetListChosen = (watch('saleOrderLines') ?? []).map(
//     (item, index) => {
//       return {
//         ...item,
//         sku: item?.productInfo?.sku,
//         name: item?.productInfo?.name,
//         quantityStringName:
//           `${item?.quantity} ${item?.productInfo?.uomName}` ?? 0,
//         sumOfWeight: `${
//           (item?.productInfo?.baseProductPackingLine?.weight ?? 0) *
//           (item?.quantity ?? 0)
//         }kg`,
//       }
//     }
//   )

//   const dataTable = (watch('saleOrderLines') ?? []).map((item, index) => {
//     const watchQuantity = watch(`saleOrderLines.${index}.quantity`)

//     const computeTaxInfo = watch('computeTaxInfo')

//     const productInfo = item.productInfo

//     const listUnitsProduct = productInfo?.uomGroup?.uomGroupLineItems ?? []

//     const uomUnitInfo = (listUnitsProduct ?? []).find(
//       (el) => el.uomId === item.orderUomId
//     )

//     const suggestQuantity =
//       !!item.orderQty && !!uomUnitInfo
//         ? Number(
//             (item.orderQty * uomUnitInfo.conversionRate).toFixed(
//               uomUnitInfo.accuracy
//             )
//           )
//         : 0

//     return {
//       ...item,
//       id: fields[index].key,
//       icon: (
//         <Image
//           src={require('@/assets/svg/dragIndicatorIcon.svg')}
//           alt='eye'
//           width={16}
//           height={16}
//         />
//       ),
//       productId: (
//         <SelectBoxCustomV2
//           control={control}
//           name={`saleOrderLines.${index}.productInfo`}
//           columns={ProductColumns}
//           labelPath='name'
//           valuePath='id'
//           params={paramsGetProduct}
//           fetchDataFn={getDataProductByType}
//           typePath={type}

//           className='w-full'
//           label={'Sản phẩm'}
//           placeholder={'Chọn sản phẩm'}
//           onChangeValue={(val: Product) => {
//             const currentLine = { ...item }
//             currentLine.productId = val.id
//             currentLine.quantityInventory = val.quantityInventory
//             currentLine.uomId = val.uomId
//             setValue(`saleOrderLines.${index}`, currentLine)
//           }}
//         />
//       ),
//       orderQty: (
//         <CoreInput
//           control={control}
//           name={`saleOrderLines.${index}.orderQty`}
//           placeholder='SL'
//           type='number'
//           inputProps={{
//             maxLength: 10,
//           }}
//           rules={{
//             validate: {
//               min: (val: number) => {
//                 return val >= 1 || 'Không được phép nhỏ hơn 1'
//               },
//               max: (val: number) => {
//                 return (
//                   dataConfigSaleOrder?.data.isInventoryInsufficient ||
//                   val <= (item?.productInfo?.quantityInventory ?? 0) ||
//                   `Không được phép lớn hơn ${item.productInfo?.quantityInventory}`
//                 )
//               },
//             },
//           }}
//           InputProps={{
//             style: {
//               minHeight: '38px',
//               height: '38px',
//               paddingRight: 0,
//             },
//             endAdornment: (
//               <InputAdornment position='end'>
//                 <CoreAutocomplete
//                   control={control}
//                   name={`saleOrderLines.${index}.orderUomId`}
//                   returnValueType='enum'
//                   disableClearable
//                   InputProps={{
//                     style: {
//                       borderRadius: 0,
//                       minWidth: '60px',
//                       width: '60px',
//                       minHeight: '38px',
//                       height: '38px',
//                       padding: '2px 4px 7.5px 5px',
//                     },
//                   }}
//                   labelPath='uomName'
//                   valuePath='uomId'
//                   options={listUnitsProduct}
//                 />
//               </InputAdornment>
//             ),
//           }}
//           onAfterChangeValue={(value: number) => {
//             onCheckTimeAction(computeTax)
//           }}
//         />
//       ),
//       quantity: (
//         <>
//           <CoreInput
//             control={control}
//             name={`saleOrderLines.${index}.quantity`}
//             placeholder='SL'
//             type='number'
//             disableNegative
//             inputProps={{
//               maxLength: 10,
//             }}
//             InputProps={{
//               style: { paddingRight: 0 },
//               endAdornment: (
//                 <InputAdornment position='end'>
//                   <p className='w-[40px] truncate m-0'>
//                     {item.productId && item.productInfo?.uomName}
//                   </p>
//                 </InputAdornment>
//               ),
//             }}
//             rules={{
//               validate: {
//                 min: (val: number) => {
//                   return val >= 1 || 'Không được phép nhỏ hơn 1'
//                 },
//                 max: (val: number) => {
//                   return (
//                     dataConfigSaleOrder?.data.isInventoryInsufficient ||
//                     val <= (item?.productInfo?.quantityInventory ?? 0) ||
//                     `Không được phép lớn hơn ${item.productInfo?.quantityInventory}`
//                   )
//                 },
//               },
//             }}
//             isHasMessageError={false}
//             onAfterChangeValue={(val: number) => {
//               const orderQuantity = uomUnitInfo
//                 ? Number(
//                     (val / uomUnitInfo.conversionRate).toFixed(floatRounding)
//                   )
//                 : 0
//               setValue(`saleOrderLines.${index}.orderQty`, orderQuantity)
//               !!productInfo &&
//                // The liquidation order does not have a price list
//                 watchIsOptionPrice &&
//                 onCheckTimeAction(getProductPriceInPriceList, {
//                   productCategoryId:
//                     productInfo?.productTemplate.productCategoryId,
//                   productId: productInfo?.id,
//                   productTemplateId: productInfo?.productTemplate.id,
//                   quantity: item.quantity,
//                   index,
//                 })
//             }}

//           />
//           {suggestQuantity !== item.quantity && suggestQuantity !== 0 && (
//             <p className='m-2 text-[13px] text-[#747475]'>
//               {`~ ${suggestQuantity} ${item.productInfo?.uomName}`}
//             </p>
//           )}
//         </>
//       ),
//       unitPrice: watchIsOptionPrice ? (
//         <CurrencyFormatCustom amount={item.unitPrice ?? 0} />
//       ) : (
//         <CoreInput
//           control={control}
//           name={`saleOrderLines.${index}.unitPrice`}
//           placeholder='Đơn giá'
//           type='number'
//           disableNegative
//           inputProps={{
//             maxLength: 12,
//           }}
//           decimalScale={2}
//           rules={{
//             validate: {
//               min: (val: number) => {
//                 return val >= 1 || 'Không được phép nhỏ hơn 1'
//               },
//             },
//           }}
//           onAfterChangeValue={() => onCheckTimeAction(computeTax)}

//         />
//       ),
//       action: (
//         <Action
//           actionList={['delete']}
//           onDeleteAction={() => {
//             remove(index)
//             if (!!item?.id) {
//               watchSaleOrderLineDeleteIds.push(Number(item.id))
//               setValue('saleOrderLineDeleteIds', watchSaleOrderLineDeleteIds)
//             }
//           }}
//         />
//       ),
//       discount: watchIsOptionPrice ? (
//         <CurrencyFormatCustom
//           showCurrencyName={false}
//           amount={item.discount ?? 0}
//         />
//       ) : (
//         <CoreInput
//           control={control}
//           name={`saleOrderLines.${index}.discount`}
//           placeholder='Chiết khấu'
//           type='number'
//           disableNegative
//           inputProps={{
//             maxLength: 12,
//           }}
//           decimalScale={2}
//           readOnly={item.isPriceChange}
//           rules={{
//             validate: {
//               min: (val: number) => {
//                 return val >= 1 || 'Không được phép nhỏ hơn 1'
//               },
//             },
//           }}
//           onAfterChangeValue={() => onCheckTimeAction(computeTax)}

//         />
//       ),
//       taxMoney: (
//         <CurrencyFormatCustom
//           showCurrencyName={false}
//           amount={
//             computeTaxInfo?.taxLines?.[index]
//               ? computeTaxInfo?.taxLines[index].amount
//               : 0
//           }
//         />
//       ),
//       amountUntaxed: (
//         <CurrencyFormatCustom
//           showCurrencyName={false}
//           amount={
//             computeTaxInfo?.taxLines?.[index]
//               ? computeTaxInfo?.taxLines[index].untaxedAmount
//               : 0
//           }
//         />
//       ),
//       amountTotal: (
//         <CurrencyFormatCustom
//           showCurrencyName={false}
//           amount={
//             computeTaxInfo?.taxLines[index]
//               ? computeTaxInfo?.taxLines[index].untaxedAmount +
//                 computeTaxInfo?.taxLines[index].amount
//               : 0
//           }
//         />
//       ),
//       quantityInventory:
//         watchQuantity > item.quantityInventory ? (
//           <p style={{ color: '#FF4956' }}>{`${item.quantityInventory} ${
//             item.productInfo?.uomName ?? ''
//           }`}</p>
//         ) : (
//           <p>{`${item.quantityInventory} ${
//             item.productInfo?.uomName ?? ''
//           }`}</p>
//         ),
//       taxIds: (
//         <CoreAutocomplete
//           control={control}
//           name={`saleOrderLines.${index}.taxIds`}
//           options={listTax?.content ?? []}
//           placeholder='Thuế'
//           valuePath='id'
//           labelPath='name'
//           returnValueType='enum'
//           disableClearable
//           multiple
//           onAfterChangeValue={() => onCheckTimeAction(computeTax)}
//         />
//       ),
//     }
//   })

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       data.discountComputeType = 'PERCENT'
//       const totalAmount = !!data.computeTaxInfo
//         ? data.computeTaxInfo.taxLines?.reduce((total, val) => {
//             return total + val.untaxedAmount + val.amount
//           }, 0)
//         : 0
//       data.totalPrice = totalAmount

//       data.saleOrderLines.forEach((item) => {
//         if (item.type === 'PRODUCT') {
//           const totalPrice = item.quantity * item.unitPrice
//           item.amountUntaxed = totalPrice
//           item.amountTotal = totalPrice
//         }
//       })
//     //  Check whether the order exceeds the debt or not
//       if (
//         data.paymentMethod === 'DEDUCTION_OF_LIABILITIES' &&
//         typeSubmit === 'CONFIRM'
//       ) {
//         const res = await checkExceedDebtLimit(data, type)
//         if (res.isExceedDebtLimit) {
//           showDialog(<ConfirmDebtLimitDialog data={data} />)
//           return
//         }
//       }
//     //  check when use click confirm button change status
//       if (
//         (data.state === 'DRAFT' || data.state === 'SENT') &&
//         typeSubmit === 'CONFIRM'
//       ) {
//         data.state = 'SALE'
//       }
//       const res = await createSaleOrder(data, type)

//       successMsg('Thành công')
//       if (res && res.data.data.id)
//         router.push({
//           pathname: `${PATH_URL}/[id]`,
//           query: {
//             id: res.data.data.id,
//           },
//         })
//     } catch (error) {
//       errorMsg(error)
//     }
//   })

//   const handleCancel = async (data: RequestBody['POST']) => {
//     try {
//       await createSaleOrder(data, type)
//       successMsg('Thành công')
//       router.push(PATH_URL)
//     } catch (error) {
//       errorMsg(error)
//     }
//   }

//   const handleSendEmail = async () => {
//     try {
//       if (isEdit) {
//         await sendEmailOrder({ orderId: Number(id) }, {}, type)
//         router.push(PATH_URL)
//         successMsg('Gửi email thành công')
//       } else {
//         errorMsg('Bạn cần tạo đơn bán')
//       }
//     } catch (error) {
//       errorMsg(error)
//     }
//   }

//   const handleEditDataForm = async () => {
//     const dataDetails = {
//       saleOrderLineDeleteIds: [],
//       ...salesOrderDetails,
//     }
//     reset(dataDetails)
//   }

//   useEffect(() => {
//     if (!!id && isEdit) {
//       handleEditDataForm()
//     }
//    // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id, salesOrderDetails])

//   useEffect(() => {
//     if (dataPolicyPartner?.isHasPolicy) {
//       setValue('pricelistId', dataPolicyPartner.priceList.id)
//       setValue('currencyId', dataPolicyPartner.currency.id)
//       setValue('namePolicy', dataPolicyPartner.name)
//     }
//    // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [JSON.stringify(dataPolicyPartner)])

//   useEffect(() => {
//     if (!!dataConfigSaleOrder?.data && type !== 'CLEARANCE' && type !== 'OEM') {
//       setValue('isOptionPrice', !dataConfigSaleOrder.data.isOptionPrice)
//     }
//    // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [JSON.stringify(dataConfigSaleOrder?.data)])

//   useEffect(() => {
//     if (dataSaleConfig?.defaultWarehouseId) {
//       setValue('warehouseId', dataSaleConfig?.defaultWarehouseId)
//     }
//    // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [JSON.stringify(dataSaleConfig)])

//   return [
//     {
//       id: isEdit ? Number(id) : -1,
//       saleOrderName: salesOrderDetails ? salesOrderDetails.code : null,
//       errors: formState.errors,
//       control,
//       formState,
//       isEdit,
//       userList: transformedUserList,
//       listCustomer: listCustomer?.content ?? [],
//       wareHouseList,
//       columns,
//       tables,
//       fields,
//       dataTable,
//       dataGetListChosen,
//       dataFormDetails: salesOrderDetails,
//       typeInput,
//       titleValue,
//       payments: dataDebtConfigPartner?.hasDebtLimit
//         ? payments
//         : payments.filter((item) => item.value !== 'DEDUCTION_OF_LIABILITIES'),
//       transactionMethod,
//       shippingPolicy,
//       isLoading: isLoadingSalesOrderDetails,
//       dataCustomerDetails,
//       listPaymentTerm: listPaymentTerm?.content ?? [],
//       companyUserLoginData: companyUserLoginData ? companyUserLoginData : null,
//       invoiceList,
//       isRemainingQuantityCanGenerateInvoice:
//         isCheckRemainingQuantityCanGenerateInvoice(
//           salesOrderDetails?.saleOrderLines ?? []
//         ),
//       PATH_URL,
//       scopeTypeSelect,
//       watchPartnerId,
//       type,
//       listCurrencyCompany: listCurrencyCompany?.content ?? [],
//       listPriceList: listPriceList?.content ?? [],
//       dataConfigSaleOrder,
//       watchIsOptionPrice,
//       dataPolicyPartner,
//     },
//     {
//       register,
//       handleSubmit,
//       watch,
//       setError,
//       trigger,
//       setValue,
//       reset,
//       getValues,
//       append,
//       remove,
//       setTypeInput,
//       setTitleValue,
//       onSubmit,
//       setTypeSubmit,
//       handleCancel,
//       handleSendEmail,
//       refetchListCustomer,
//     },
//   ] as const
// }

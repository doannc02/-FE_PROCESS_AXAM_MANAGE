/* eslint-disable react-hooks/exhaustive-deps */
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/CoreTable'
import UomAutocomplete from '@/components/templates/Accounting/_component/UomAutocomplete'
import { capitalize } from '@/helper/capitalize'
import {
  checkTypeGetPriceList,
  checkTypeGetUnitPriceForPriceListProduct,
} from '@/helper/chkTypeInvPath'
import { MAX_VALUE } from '@/helper/contain'
import { errorMsg } from '@/helper/message'
import { useCheckPath } from '@/path'
import { useAppSelector } from '@/redux/hook'
import { TRANSLATE } from '@/routes'
import { AccountMoveDetail } from '@/service/accounting/accountMove/getDetail/type'
import { postGenerateMoveLines } from '@/service/accounting/accountMove/postGenerateLines'
import { getTaxList } from '@/service/accounting/tax/getList'
import { useQueryGetPolicyPartner } from '@/service/product/priceList/getPolicyOfPartner'
import { getPriceForProduct } from '@/service/product/priceList/getPriceForProduct'
import { getProductListFullType } from '@/service/product/productController/getListProForToolsAsset'
import { getProductTinyForPurchase } from '@/service/product/productController/getListTiny'
import { getUomBaseOfProduct } from '@/service/product/productController/getUomBase'
import { getUomProductList } from '@/service/product/productController/getUomGroup'
import { useQueryGetWarehouse } from '@/service/salesOrder/returnOrderController/createUpdate'
import { getProductOfPriceList } from '@/service/salesOrder/salesOrder/getAllProductPriceList'
import { getProductOfPriceListPolicy } from '@/service/salesOrder/salesOrder/getAllProductsPriceListPolicy'
import { getAllSaleProducts } from '@/service/salesOrder/salesOrder/getAllSaleProducts'
import _, { debounce } from 'lodash'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

let f: any = null

const useDetail = () => {
  const { t } = useTranslation(TRANSLATE.ACCOUNT_INVOICE)
  const { currency, currencyId } = useAppSelector(
    (state) => state.companyConfigData
  )

  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isUpdate = !!id
  const isView = actionType === 'VIEW'

  const { typeInvoice, invoiceCk, paymentType } = useCheckPath()

  const methodForm = useFormContext<AccountMoveDetail>()

  const [isLoading, setIsLoading] = useState(true)

  const { watch, control, setValue, getValues, setError } = methodForm

  const {
    fields,
    remove: removeInvoiceLines,
    append: appendInvoiceLines,
  } = useFieldArray({
    control,
    name: 'invoiceLines',
    keyName: 'key',
  })

  const typeCustomerOrProvider = useMemo(() => {
    if (
      watch('moveType') === 'IN_REFUND' ||
      watch('moveType') === 'IN_INVOICE'
    ) {
      return 'PROVIDER'
    } else return 'CUSTOMER'
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('moveType')])

  let renderTime = new Date(Date.now()).getTime()

  const computeTax = useCallback(async () => {
    try {
      const invoiceWatch = watch('invoiceLines') ?? []

      let validate = true

      if (invoiceWatch) {
        invoiceWatch.forEach((item, index) => {
          if (
            _.isNil(item.quantity) ||
            // _.isNil(item.importTax) ||
            // _.isNil(item.environmentalResourceTax) ||
            _.isNil(item.unitPrice) ||
            _.isNil(item.product?.id) ||
            _.isNil(item.uom?.id) ||
            item?.discount > 100 ||
            item?.discount < 0
          ) {
            validate = false

            // eslint-disable-next-line react-hooks/exhaustive-deps
            renderTime = new Date(Date.now()).getTime()
          }
          if (
            watch('scopeType') !== 'DOMESTIC_WAREHOUSE' &&
            watch('scopeType') !== 'DOMESTIC_WITHOUT_WAREHOUSE' &&
            watch('scopeType') !== 'DOMESTICALLY'
          ) {
            if (!item?.importTax) setValue(`invoiceLines.${index}.importTax`, 0)
            if (!item?.specialConsumptionTax)
              setValue(`invoiceLines.${index}.specialConsumptionTax`, 0)
          }
        })
      }
      if (!validate || watch('state') === 'POSTED') return

      const res = await postGenerateMoveLines({
        scopeType: watch('scopeType'),
        partnerName: watch('partner')?.name,
        type: 'EXTERNAL',
        moveType: watch('moveType') ?? '',
        accountJournalId: watch('accountJournal')?.id,
        data: invoiceWatch,
      })

      if (res.data) {
        setValue('computeTaxInfo', res.data)
      }

      if (res.data.moveLines) {
        setValue('moveLines', res.data.moveLines)
      }

      // unTax
      if (res.data.taxLines && res.data.taxLines.length > 0) {
        const amountUntaxed = (res.data.taxLines ?? [])
          .map((ele, index) => {
            setValue(`invoiceLines.${index}.amountUntaxed`, ele.untaxedAmount)
            return ele.untaxedAmount * 100
          })
          .reduce((a, b) => a + b, 0)

        setValue('amountUntaxed', amountUntaxed / 100)
      }

      //Tax
      if (res.data.taxLines && res.data.taxLines.length > 0) {
        const totalTax = (res.data.taxLines ?? [])
          .map((ele, index) => {
            setValue(`invoiceLines.${index}.lineTax`, ele.amount)
            return ele.amount * 100
          })
          .reduce((a, b) => a + b, 0)

        setValue('totalTax', totalTax / 100)
      }

      //Amount
      const amountTotal = (invoiceWatch ?? [])
        .map((item, index) => {
          setValue(
            `invoiceLines.${index}.amountTotal`,
            item.amountUntaxed + item.lineTax
          )
          return item.amountUntaxed * 100 + item.lineTax * 100
        })
        .reduce((a, b) => a + b, 0)
      setValue('amountTotal', amountTotal / 100)

      //discountAmount
      if (res.data.taxLines) {
        const discountAmount = (res?.data?.taxLines ?? [])
          .map((ele, index) => {
            setValue(`invoiceLines.${index}.discountAmount`, ele.discountAmount)
            return ele.discountAmount * 100
          })
          .reduce((a, b) => a + b, 0)

        setValue('discountAmount', discountAmount / 100)
      }
    } catch (err) {
      errorMsg(err)
    }
  }, [])

  // call generate move line khi laays detail o trang thai nhap
  useEffect(() => {
    if (!!id && watch('state') === 'DRAFT') {
      setIsLoading(true)
      computeTax()
      setIsLoading(false)
    }
  }, [isLoading, actionType])

  // handles params tax
  const handleParamTax = useMemo(() => {
    try {
      if (typeCustomerOrProvider === 'CUSTOMER') {
        return { isActive: true, scopeType: 'SALE', type: 'VAT_RATES' }
      } else return { isActive: true, scopeType: 'PURCHASE', type: 'VAT_RATES' }
    } catch (err) {
      errorMsg(err)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('scopeType')])

  // handles type mấy con bên sale đkm
  const type = useMemo(() => {
    return router.asPath.includes('/all')
      ? watch('saleType') === 'LIQUIDATION'
        ? 'CLEARANCE'
        : watch('saleType') ?? ''
      : typeInvoice === 'LIQUIDATION'
      ? 'CLEARANCE'
      : `${typeInvoice}`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath, typeInvoice, typeInvoice, watch('saleType')])

  // debounce call compute tax sau 2s
  const onAfterChangeValue = () => {
    const t = new Date(Date.now()).getTime() - renderTime
    if (t < 2000 && f) {
      clearTimeout(f)
      renderTime = new Date(Date.now()).getTime()
    }
    f = setTimeout(computeTax, 2000)
  }

  //
  const onCheckTimeAction = (func: any, arg?: any) => {
    const t = new Date(Date.now()).getTime() - renderTime
    if (t < 1200 && f) {
      clearTimeout(f)
    }
    renderTime = new Date(Date.now()).getTime()
    f = setTimeout(() => {
      func(arg)
    }, 1200)
  }

  // handle params khách hàng
  const paramsPartner = (typeInvoice: string) => {
    if (!typeInvoice) return {}
    if (typeInvoice === 'MERCHANT') {
      return {
        isMerchant: true,
        status: 'APPROVED',
        merchantActivated: true,
      }
    } else if (typeInvoice === 'LIQUIDATION') {
      return { isActivated: true }
    } else {
      const typeInv = typeInvoice.toLowerCase()
      const params: { [key: string]: any } = {
        [`is${capitalize(typeInv)}`]: true,
      }
      params[`${typeInvoice.toLowerCase()}Activated`] = true
      return params
    }
  }

  // call list warehouse
  const { data: wareHouseList } = useQueryGetWarehouse({
    page: 0,
    size: MAX_VALUE,
    warehouseType: watch('warehouseType'),
  })

  // invoice columns
  const invoiceColumns = useMemo(() => {
    return [
      {
        header: 'Sản phẩm',
        fieldName: 'product',
        styleCell: {
          style: {
            minWidth: 350,
          },
        },
      },
      {
        header: 'Số lượng',
        fieldName: 'quantity',
      },
      {
        header: 'Đơn giá' + ` (${currency})`,
        fieldName: 'unitPrice',
      },
      {
        header: 'Thành tiền' + ` (${currency})`,
        fieldName: 'amountTotal',
      },
      ...(typeCustomerOrProvider !== 'PROVIDER'
        ? [
            {
              header: 'Khuyến mãi  (%)',
              fieldName: 'discount',
            },
            {
              header: 'Thành tiền khuyến mãi' + ` (${currency})`,
              fieldName: 'discountAmount',
            },
          ]
        : []),
      ...(watch('scopeType') !== 'DOMESTIC_WAREHOUSE' &&
      watch('scopeType') !== 'DOMESTIC_WITHOUT_WAREHOUSE' &&
      watch('scopeType') !== 'DOMESTICALLY'
        ? [
            {
              header: `${
                watch('scopeType') === 'EXPORTED' ? 'Thuế XK' : 'Thuế NK'
              } (${currency})`,
              fieldName: 'importTax',
            },
            // {
            //   header: `Thuế TTĐB (${currency})`,
            //   fieldName: 'specialConsumptionTax',
            // },
          ]
        : []),
      {
        header: 'Trước thuế GTGT' + ` (${currency})`,
        fieldName: 'amountUntaxed',
        styleCell: {
          style: {
            minWidth: 250,
          },
        },
      },
      {
        header: 'Thuế GTGT (%)',
        fieldName: 'taxes',
      },
      {
        header: 'Tổng tiền thuế' + ` (${currency})`,
        fieldName: 'lineTax',
        styleCell: {
          style: {
            minWidth: 250,
          },
        },
      },

      {
        header: 'Sau thuế' + ` (${currency})`,
        fieldName: 'amount',
        styleCell: {
          style: {
            minWidth: 250,
          },
        },
      },
      ...(!isView
        ? [
            {
              header: '',
              fieldName: 'action',
            },
          ]
        : []),
    ] as ColumnProps[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('scopeType')])

  // bang chon product trong invoice lines
  const productColumns = useMemo(
    () =>
      [
        {
          header: 'SKU',
          fieldName: 'sku',
          styleCell: {
            style: {
              maxWidth: '140px',
              cursor: 'pointer',
            },
          },
        },
        {
          header: 'Tên sản phẩm',
          fieldName: 'name',
          styleCell: {
            style: {
              maxWidth: '300px',
              cursor: 'pointer',
            },
          },
        },
        ...(typeCustomerOrProvider === 'CUSTOMER'
          ? [
              {
                header: 'Tổng tồn',
                fieldName: 'totalInventory',
                styleCell: {
                  style: {
                    // maxWidth: '200px',
                    cursor: 'pointer',
                  },
                },
              },
            ]
          : []),
        ...(wareHouseList?.data?.content ?? []).map((item: any) => ({
          header: item.name,
          fieldName: item.id,
          styleCell: {
            style: {
              // maxWidth: '100px',
              cursor: 'pointer',
            },
          },
        })),
      ] as ColumnProps[],
    [wareHouseList]
  )

  // get detail policy of partner
  const { data: dataPolicyPartner } = useQueryGetPolicyPartner(
    {
      partnerId: watch('partner')?.id,
    },
    {
      enabled: typeInvoice === 'MERCHANT' && watch('isTakePricePolicy'),
    }
  )

  // handle api get product trong invoice lines
  const getDataProductByType = useMemo(() => {
    // Get price according to price list + 'Merchant order' ==> Get products according to policy
    // Get price according to price list + (B2B || B2C) ==> Get products according to pricelist
    // Do not take prices from the price list ==> Get all product for sale
    if (invoiceCk === 'INTERNAL') {
      return getProductListFullType
    }
    if (
      watch('isTakePricePolicy') &&
      !!checkTypeGetUnitPriceForPriceListProduct(type)
    ) {
      if (checkTypeGetUnitPriceForPriceListProduct(type) === 'MERCHANT') {
        return getProductOfPriceListPolicy
      }

      if (
        checkTypeGetUnitPriceForPriceListProduct(type) === 'B2B' ||
        checkTypeGetUnitPriceForPriceListProduct(type) === 'B2C'
      ) {
        return getProductOfPriceList
      }
    } else return getAllSaleProducts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeInvoice, type, watch('isTakePricePolicy')])

  // handle params
  const paramsGetProduct = useMemo(() => {
    return watch('isTakePricePolicy') && typeInvoice === 'MERCHANT'
      ? {
          priceListPolicyId: dataPolicyPartner?.data?.id,
          warehouseId: watch('warehouse')?.id,
        }
      : watch('isTakePricePolicy')
      ? {
          priceListId: watch('priceList')?.id,
          warehouseId: watch('warehouse')?.id,
        }
      : {
          warehouseId: watch('warehouse')?.id,
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    typeInvoice,
    watch('isTakePricePolicy'),
    watch('priceList'),
    dataPolicyPartner,
    watch('warehouse'),
  ])

  const getProductPriceInPriceList = async (requestGetPrice: any) => {
    const typePriceList = checkTypeGetUnitPriceForPriceListProduct(type)
    try {
      if (!!watch('priceList')?.id && !!typePriceList) {
        const res = await getPriceForProduct(
          {
            ...requestGetPrice,
            priceListId: watch('priceList')?.id,
          },
          typePriceList
        )

        if (!!res.price) {
          setValue(`invoiceLines.${requestGetPrice.index}.unitPrice`, res.price)
        }
        computeTax()
      }
    } catch (error) {
      errorMsg(error)
    }
  }

  const invoiceLinesTableData = (fields ?? []).map((item, index) => {
    const fieldsUnImport = {
      discountAmount: watch(`invoiceLines.${index}.discountAmount`) ? (
        <CurrencyFormatCustom
          amount={watch(`invoiceLines.${index}.discountAmount`)}
        />
      ) : (
        0
      ),
      product: (
        <SelectBoxCustom
          key={item.key}
          typePath={
            typeCustomerOrProvider === 'CUSTOMER'
              ? checkTypeGetPriceList(type)
              : ''
          }
          control={control}
          columns={productColumns}
          labelPath='name'
          valuePath='id'
          disabled={
            typeCustomerOrProvider === 'PROVIDER' && !watch('partner')
              ? true
              : typeCustomerOrProvider === 'CUSTOMER' &&
                !watch('saleType') &&
                !watch('partner')
              ? invoiceCk === 'INTERNAL'
                ? false
                : true
              : false
          }
          params={
            typeCustomerOrProvider === 'PROVIDER'
              ? {
                  purchaseOk: true,
                  vendorId: watch('partner')?.id,
                  typeForRender: watch('saleType'),
                }
              : { ...paramsGetProduct, typeForRender: watch('saleType') }
          }
          name={`invoiceLines.${index}.product`}
          label=''
          placeholder='Chọn sản phẩm'
          fetchDataFn={
            typeCustomerOrProvider === 'CUSTOMER'
              ? getDataProductByType
              : getProductTinyForPurchase
          }
          // rules={{
          //   required: t('common:validation.required'),
          // }}
          // isHasMessageError={false}
          onChangeValue={async (val) => {
            // setValue(`invoiceLines.${index}`, currentLine)
            if (val) {
              const res = await getUomBaseOfProduct({ productId: val?.id })
              if (res && res.data)
                setValue(`invoiceLines.${index}.uom`, res.data)
            } else {
              setValue(`invoiceLines.${index}.uom`, null)
            }
            onAfterChangeValue()
          }}
        />
      ),
      quantity: (
        <CoreInput
          label=''
          control={control}
          name={`invoiceLines.${index}.quantity`}
          placeholder='Số lượng'
          type='number'
          rules={{
            required: t('common:validation.required'),
            validate: (val: number) => {
              if (val <= 0) {
                return 'Giá trị không hợp lệ!'
              }
              if (
                val <
                  Number(watch(`invoiceLines.${index}.product`)?.minQuantity) &&
                watch('isTakePricePolicy')
              ) {
                return (
                  `Số lượng tối thiểu theo bảng giá ${watch(
                    `priceList.name`
                  )} là` +
                  ` ${Number(
                    watch(`invoiceLines.${index}.product`)?.minQuantity
                  )}`
                )
              }
            },
          }}
          isHasMessageError={!watch('isTakePricePolicy') ? false : true}
          InputProps={{
            endAdornment: (
              <div className='w-90'>
                <UomAutocomplete
                  key={item.key}
                  control={control}
                  name={`invoiceLines.${index}.uom`}
                  label=''
                  placeholder='Đơn vị'
                  fetchDataFn={getUomProductList}
                  params={{
                    id: watch(`invoiceLines.${index}.product.id`),
                  }}
                  isHasMessageError={false}
                  onChangeValue={debounce(() => {
                    computeTax()
                  }, 2000)}
                />
              </div>
            ),
          }}
          onChangeValue={(val) => {
            if (
              val < Number(watch(`invoiceLines.${index}.product`)?.minQuantity)
            ) {
              setValue(`invoiceLines.${index}.unitPrice`, 0)
            }
            if (val > 0) {
              onAfterChangeValue()
            }
          }}
          onAfterChangeValue={(val: number) => {
            !!watch(`invoiceLines.${index}.product`)?.id &&
              // The liquidation order does not have a price list
              watch('isTakePricePolicy') &&
              onCheckTimeAction(getProductPriceInPriceList, {
                productCategoryId: watch(`invoiceLines.${index}.product`)
                  ?.productTemplate.productCategoryId,
                productId: watch(`invoiceLines.${index}.product`)?.id,

                productTemplateId: watch(`invoiceLines.${index}.product`)
                  ?.productTemplate.id,
                quantity: watch(`invoiceLines.${index}.quantity`),
                index,
              })
          }}
        />
      ),
      unitPrice: (
        <CoreInput
          label=''
          control={control}
          name={`invoiceLines.${index}.unitPrice`}
          type='number'
          rules={{
            required: t('common:validation.required'),
            validate: (val: number) => {
              if (val <= 0) {
                return 'Giá trị không hợp lệ!'
              }
            },
          }}
          isViewProp={
            watch('isTakePricePolicy') && typeCustomerOrProvider === 'CUSTOMER'
          }
          isHasMessageError={false}
          placeholder='Nhập đơn giá'
          onChangeValue={(val: number) => {
            if (val > 0) {
              onAfterChangeValue()
            }
          }}
        />
      ),
      taxes: (
        <CoreAutoCompleteAPI
          key={item.key}
          multiple
          control={control}
          label=''
          params={handleParamTax}
          name={`invoiceLines.${index}.taxes`}
          placeholder='Chọn thuế GTGT'
          fetchDataFn={getTaxList}
          rules={{
            validate: {
              valid: (v: any) => {
                if (v?.length > 1) {
                  return 'Chỉ được chọn 1 thuế'
                }
              },
            },
          }}
          onChangeValue={(val) => {
            if (val?.length > 1) {
              // setError(`invoiceLines.${index}.taxes`, {
              //   message: 'Chỉ được chọn 1 thuế',
              // })
            } else onAfterChangeValue()
          }}
        />
      ),
      discount: (
        <CoreInput
          // key={item.key}
          label=''
          control={control}
          name={`invoiceLines.${index}.discount`}
          type='number'
          rules={{
            validate: (val: number) => {
              if (val < 0 || val > 100) {
                return 'Giá trị không hợp lệ!'
              }
            },
          }}
          isHasMessageError={false}
          placeholder='Nhập khuyến mại'
          onChangeValue={onAfterChangeValue}
        />
      ),
      amountUntaxed: getValues(`invoiceLines.${index}.amountUntaxed`) ? (
        <CurrencyFormatCustom
          variant='body2'
          amount={getValues(`invoiceLines.${index}.amountUntaxed`)}
        />
      ) : (
        0
      ),
      lineTax: getValues(`invoiceLines.${index}.lineTax`) ? (
        <CurrencyFormatCustom
          variant='body2'
          amount={getValues(`invoiceLines.${index}.lineTax`)}
        />
      ) : (
        0
      ),
      amountTotal:
        watch(`invoiceLines.${index}.quantity`) &&
        watch(`invoiceLines.${index}.unitPrice`) ? (
          <CurrencyFormatCustom
            variant='body2'
            amount={Number(
              watch(`invoiceLines.${index}.quantity`) *
                watch(`invoiceLines.${index}.unitPrice`)
            )}
          />
        ) : (
          0
        ),
      amount: getValues(`invoiceLines.${index}.amountTotal`) ? (
        <CurrencyFormatCustom
          variant='body2'
          amount={getValues(`invoiceLines.${index}.amountTotal`)}
        />
      ) : (
        0
      ),

      action:
        index === 0 && fields.length === 1 ? null : watch('state') ===
          'POSTED' ? null : (
          <Action
            actionList={['delete']}
            onDeleteAction={() => {
              removeInvoiceLines(index)
              computeTax()
            }}
          />
        ),
    }

    if (actionType === 'VIEW')
      return {
        specialConsumptionTax: item?.specialConsumptionTax ? (
          <CurrencyFormatCustom
            variant='body2'
            amount={Number(item?.specialConsumptionTax)}
          />
        ) : (
          0
        ),
        environmentalResourceTax: item?.specialConsumptionTax ? (
          <CurrencyFormatCustom
            variant='body2'
            amount={Number(item?.environmentalResourceTax)}
          />
        ) : (
          0
        ),

        product: item?.product?.name,
        quantity: item?.quantity
          ? item?.quantity + ' - ' + watch(`invoiceLines.${index}.uom.name`)
          : 0,
        unitPrice: (
          <CurrencyFormatCustom variant='body1' amount={item?.unitPrice} />
        ),
        taxes:
          item?.taxes?.length === 0
            ? '0'
            : (item?.taxes ?? []).map((item) => item?.name).join(', '),
        discount: item.discount ? item.discount : 0,
        discountAmount: item?.discountAmount ? (
          <CurrencyFormatCustom variant='body1' amount={item.discountAmount} />
        ) : (
          0
        ),
        amountUntaxed: item?.amountUntaxed ? (
          <CurrencyFormatCustom variant='body1' amount={item.amountUntaxed} />
        ) : (
          0
        ),
        amount: item?.amountTotal ? (
          <CurrencyFormatCustom variant='body2' amount={item?.amountTotal} />
        ) : (
          0
        ),
        importTax: item?.importTax,
        lineTax: <CurrencyFormatCustom variant='body1' amount={item.lineTax} />,
        amountTotal:
          item.quantity && item.unitPrice ? (
            <CurrencyFormatCustom
              variant='body1'
              amount={item.quantity * item.unitPrice}
            />
          ) : (
            0
          ),
      }
    else {
      if (
        watch('scopeType') !== 'DOMESTIC_WAREHOUSE' &&
        watch('scopeType') !== 'DOMESTIC_WITHOUT_WAREHOUSE' &&
        watch('scopeType') !== 'DOMESTICALLY'
      ) {
        return {
          importTax: (
            <CoreInput
              isHasMessageError={false}
              type='number'
              label=''
              control={control}
              name={`invoiceLines.${index}.importTax`}
              rules={{
                validate: (val: number) => {
                  if (val < 0) {
                    return 'Giá trị không hợp lệ!'
                  }
                },
              }}
              onChangeValue={debounce((val: number) => {
                if (val > 0) {
                  onAfterChangeValue()
                }
              }, 2000)}
            />
          ),
          specialConsumptionTax: (
            <CoreInput
              isHasMessageError={false}
              label=''
              type='number'
              control={control}
              name={`invoiceLines.${index}.specialConsumptionTax`}
              rules={{
                validate: (val: number) => {
                  if (val < 0) {
                    return 'Giá trị không hợp lệ!'
                  }
                },
              }}
              onChangeValue={debounce((val: number) => {
                if (val > 0) {
                  onAfterChangeValue()
                }
              }, 2000)}
            />
          ),
          environmentalResourceTax: (
            <CoreInput
              isHasMessageError={false}
              label=''
              type='number'
              control={control}
              name={`invoiceLines.${index}.environmentalResourceTax`}
              rules={{
                validate: (val: number) => {
                  if (val <= 0) {
                    return 'Giá trị không hợp lệ!'
                  }
                },
              }}
              onChangeValue={debounce((val: number) => {
                if (val > 0) {
                  onAfterChangeValue()
                }
              }, 2000)}
            />
          ),
          ...fieldsUnImport,
        }
      } else return fieldsUnImport
    }
  })

  const incomeExpenseColumns = useMemo(
    () =>
      [
        {
          header: 'Mã đối tượng',
          fieldName: 'code',
        },
        {
          header: 'Tên đối tượng',
          fieldName: 'name',
        },
        {
          header: 'Mô tả',
          fieldName: 'description',
        },
      ] as ColumnProps[],
    []
  )

  const {
    fields: fieldLedgerRefs,
    append: appendLedgerRefs,
    remove: removeLedgerRefs,
  } = useFieldArray({
    control,
    name: 'ledgerRefs',
  })

  return [
    {
      fields,
      incomeExpenseColumns,
      isUpdate,
      isView,
      actionType,
      fieldLedgerRefs,
      control,
      invoiceLinesTableData,
      invoiceColumns,
      typeCustomerOrProvider,
      currencyId,
      typeInvoice,
      methodForm,
      paymentType,
      type,
    },
    {
      t,
      router,
      onAfterChangeValue,
      setValue,
      getValues,
      watch,
      appendInvoiceLines,
      removeInvoiceLines,
      appendLedgerRefs,
      removeLedgerRefs,
      paramsPartner,
    },
  ] as const
}

export default useDetail

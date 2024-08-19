import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { ColumnProps } from '@/components/organism/CoreTable'
import { MAX_VALUE } from '@/helper/contain'
import { errorMsg } from '@/helper/message'
import { useAppSelector } from '@/redux/hook'
import { AccountMoveDetail } from '@/service/accounting/accountMove/getDetail/type'
import { postGenerateMoveLines } from '@/service/accounting/accountMove/postGenerateLines'
import { useQueryGetTaxList } from '@/service/accounting/tax/getList'
import { useQueryGetWarehouseList } from '@/service/warehouse/getList'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
let f: any = null

const useInvoice = () => {
  const { t } = useTranslation('accounting/provider-refund')

  const router = useRouter()

  const { currency } = useAppSelector((state) => state.companyConfigData)

  let renderTime = new Date(Date.now()).getTime()

  const { actionType } = router.query

  const id = Number(router.query?.id)

  const isUpdate = !!id

  const { data: wareHouseList } = useQueryGetWarehouseList({
    page: 0,
    size: MAX_VALUE,
  })

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
        ...(wareHouseList?.data?.content ?? []).map((item) => ({
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

  const { watch, control, setValue, handleSubmit, getValues } =
    useFormContext<AccountMoveDetail>()

  const computeTax = useCallback(async () => {
    try {
      const invoiceWatch = watch('invoiceLines') ?? []
      let validate = true
      if (invoiceWatch) {
        invoiceWatch.forEach((item) => {
          if (
            _.isNil(item.quantity) ||
            _.isNil(item.unitPrice) ||
            _.isNil(item.product?.id) ||
            _.isNil(item.uom?.id)
          ) {
            validate = false
            // eslint-disable-next-line react-hooks/exhaustive-deps
            renderTime = new Date(Date.now()).getTime()
          }
        })
      }
      if (!validate || watch('state') === 'POSTED') return

      const res = await postGenerateMoveLines({
        moveType: 'IN_REFUND',
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
        const amountUntaxed = res.data.taxLines
          .map((ele, index) => {
            setValue(`invoiceLines.${index}.amountUntaxed`, ele.untaxedAmount)
            return ele.untaxedAmount * 100
          })
          .reduce((a, b) => a + b, 0)

        setValue('amountUntaxed', amountUntaxed / 100)
      }

      //Tax
      if (res.data.taxLines && res.data.taxLines.length > 0) {
        const totalTax = res.data.taxLines
          .map((ele, index) => {
            setValue(`invoiceLines.${index}.lineTax`, ele.amount)
            return ele.amount * 100
          })
          .reduce((a, b) => a + b, 0)

        setValue('totalTax', totalTax / 100)
      }

      //Amount
      const amountTotal = invoiceWatch
        .map((item, index) => {
          setValue(
            `invoiceLines.${index}.amountTotal`,
            item.amountUntaxed + item.lineTax
          )
          return item.amountUntaxed * 100 + item.lineTax * 100
        })
        .reduce((a, b) => a + b, 0)
      setValue('amountTotal', amountTotal / 100)
    } catch (err) {
      errorMsg(err)
    }
  }, [])

  const onAfterChangeValue = () => {
    const t = new Date(Date.now()).getTime() - renderTime
    if (t < 2000 && f) {
      clearTimeout(f)
      renderTime = new Date(Date.now()).getTime()
    }
    f = setTimeout(computeTax, 2000)
  }

  const { isLoading: isLoadingTax, data: taxSelect } = useQueryGetTaxList({
    page: 0,
    size: MAX_VALUE,
    type: 'VAT_RATES',
    isActive: true,
  })

  const invoiceColumns = useMemo(() => {
    if (
      watch('scopeType') === 'IMPORTED_WAREHOUSE' ||
      watch('scopeType') === 'IMPORTED_WITHOUT_WAREHOUSE'
    ) {
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
          header: 'Thành tiền',
          fieldName: 'amountTotal',
        },
        {
          header: 'Thuế',
          fieldName: 'taxIds',
        },
        {
          header: 'Thành tiền chưa thuế' + ` (${currency})`,
          fieldName: 'amountUntaxed',
          styleCell: {
            style: {
              minWidth: 250,
            },
          },
        },
        {
          header: 'Khuyến mãi  (%)',
          fieldName: 'discount',
        },
        {
          header: 'Thành tiền sau thuế' + ` (${currency})`,
          fieldName: 'amountTotal',
          styleCell: {
            style: {
              minWidth: 250,
            },
          },
        },
      ] as ColumnProps[]
    } else {
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
          header: 'Thành tiền',
          fieldName: 'amountTotal',
        },
        {
          header: 'Thuế',
          fieldName: 'taxIds',
        },
        {
          header: 'Thành tiền chưa thuế' + ` (${currency})`,
          fieldName: 'amountUntaxed',
          styleCell: {
            style: {
              minWidth: 250,
            },
          },
        },
        {
          header: 'Khuyến mãi  (%)',
          fieldName: 'discount',
        },
        {
          header: 'Thành tiền sau thuế' + ` (${currency})`,
          fieldName: 'amountTotal',
          styleCell: {
            style: {
              minWidth: 250,
            },
          },
        },
      ] as ColumnProps[]
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, watch('scopeType')])

  const {
    fields,
    append: appendInvoiceLines,
    remove: removeInvoiceLines,
  } = useFieldArray({
    control,
    name: 'invoiceLines',
    keyName: 'key',
  })

  const invoiceLinesTableData = (fields ?? []).map((item, index) => {
    if (
      watch('scopeType') === 'IMPORTED_WAREHOUSE' ||
      watch('scopeType') === 'IMPORTED_WITHOUT_WAREHOUSE'
    ) {
      return {
        id: item?.key,
        product: item?.product?.name,
        quantity: item?.quantity ?? 0 + ' - ' + item?.uom?.name,
        unitPrice: item.unitPrice ? (
          <CurrencyFormatCustom variant='body1' amount={item.unitPrice} />
        ) : (
          <></>
        ),
        taxIds: item.taxIds
          .map((ele) => {
            if (taxSelect) {
              return taxSelect.data.content.find((tax) => tax.id === ele)
            }
          })
          .map((item) => item?.name)
          .join(', '),
        discount: item.discount,
        amountUntaxed: item.amountUntaxed ? (
          <CurrencyFormatCustom variant='body1' amount={item.amountUntaxed} />
        ) : (
          <></>
        ),
        lineTax: item.lineTax && (
          <CurrencyFormatCustom variant='body1' amount={item.lineTax} />
        ),
        amountTotal: item.amountTotal && (
          <CurrencyFormatCustom variant='body1' amount={item.amountTotal} />
        ),
      }
    } else {
      return {
        id: item?.key,
        product: item?.product?.name,
        quantity: item?.quantity ?? 0 + ' - ' + item?.uom?.name,
        unitPrice: item.unitPrice ? (
          <CurrencyFormatCustom variant='body1' amount={item.unitPrice} />
        ) : (
          <></>
        ),
        taxIds: item.taxIds
          .map((ele) => {
            if (taxSelect) {
              return taxSelect.data.content.find((tax) => tax.id === ele)
            }
          })
          .map((item) => item?.name)
          .join(', '),
        discount: item.discount,
        amountUntaxed: item.amountUntaxed ? (
          <CurrencyFormatCustom variant='body1' amount={item.amountUntaxed} />
        ) : (
          <></>
        ),
        lineTax: item.lineTax && (
          <CurrencyFormatCustom variant='body1' amount={item.lineTax} />
        ),
        amountTotal: item.amountTotal && (
          <CurrencyFormatCustom variant='body1' amount={item.amountTotal} />
        ),
      }
    }
  })

  return [
    {
      actionType,
      invoiceLinesTableData,
      control,
      isUpdate,
      invoiceColumns,
    },
    {
      setValue,
      watch,
    },
  ] as const
}

export default useInvoice

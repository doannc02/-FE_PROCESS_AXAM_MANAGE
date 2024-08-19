import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useAppSelector } from '@/redux/hook'
import { AccountMoveDetail } from '@/service/accounting/accountMove/getDetail/type'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
let f: any = null

const useInvoiceTab = () => {
  const router = useRouter()
  const { currency } = useAppSelector((state) => state.companyConfigData)
  const { actionType, id } = router.query

  const isUpdate = !!id

  const { watch, getValues, control, setValue } =
    useFormContext<AccountMoveDetail>()

  const typeCustomerOrProvider = useMemo(() => {
    if (
      watch('moveType') === 'IN_REFUND' ||
      watch('moveType') === 'IN_INVOICE'
    ) {
      return 'PROVIDER'
    } else return 'CUSTOMER'
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('moveType')])

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
    ] as ColumnProps[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('scopeType')])

  const { fields } = useFieldArray({
    control,
    name: 'invoiceLines',
    keyName: 'key',
  })

  const invoiceLinesTableData = (fields ?? []).map((item, index) => {
    return {
      id: item.key,
      product: watch(`invoiceLines.${index}.product`)?.name,
      quantity: watch(`invoiceLines.${index}.quantity`) && (
        <Typography>
          {watch(`invoiceLines.${index}.quantity`) +
            ' - ' +
            watch(`invoiceLines.${index}.uom`)?.name}
        </Typography>
      ),
      unitPrice: item?.unitPrice && (
        <CurrencyFormatCustom variant='body1' amount={item?.unitPrice} />
      ),
      taxes: (item?.taxes ?? []).map((item) => item?.name).join(', '),
      discount: item.discount,
      discountAmount: item?.discountAmount ? (
        <CurrencyFormatCustom amount={Number(item?.discountAmount)} />
      ) : (
        0
      ),
      amountUntaxed: (
        <CurrencyFormatCustom variant='body1' amount={item.amountUntaxed} />
      ),
      lineTax: <CurrencyFormatCustom variant='body1' amount={item.lineTax} />,
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
      amount: (
        <CurrencyFormatCustom
          variant='body2'
          amount={getValues(`invoiceLines.${index}.amountTotal`)}
        />
      ),
      importTax: item?.importTax ? (
        <CurrencyFormatCustom
          variant='body2'
          amount={Number(item?.importTax)}
        />
      ) : (
        0
      ),
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

export default useInvoiceTab

import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import { useCheckPath } from '@/path'
import { AccountMoveDetail } from '@/service/accounting/accountMove/getDetail/type'
import { getDateNow } from '@/utils/date/date'
import { Grid } from '@mui/material'
import { memo } from 'react'
import { useFormContext } from 'react-hook-form'

const GroupCheckBox = () => {
  const { typeInvoice } = useCheckPath()
  const { watch, control, setValue, getValues } =
    useFormContext<AccountMoveDetail>()

  if (watch('moveType') === 'IN_INVOICE' || watch('moveType') === 'IN_REFUND') {
    return (
      <Grid item xs={12}>
        <CoreCheckbox
          control={control}
          name='isWithInvoice'
          label='Kèm hóa đơn'
        ></CoreCheckbox>
      </Grid>
    )
  }

  return (
    <Grid item xs={12}>
      <CoreCheckbox
        control={control}
        name='isWithDeliveryNote'
        label='Kèm phiếu xuất kho'
        onChange={() => {
          setValue('pickingSales', [])
        }}
      />
      <CoreCheckbox
        control={control}
        name='isWithInvoice'
        label='Kèm hóa đơn'
      />
      {!(watch('saleType') === 'OEM') &&
        typeInvoice !== 'INTERNAL' &&
        !(typeInvoice === 'OEM') &&
        !(typeInvoice === 'LIQUIDATION') && (
          <CoreCheckbox
            control={control}
            name='isTakePricePolicy'
            label='Đơn giá theo bảng giá'
            onChangeValue={() => {
              setValue('invoiceLines', [
                {
                  unitPrice: 0,
                  uom: null,
                  product: null,
                  discount: 0,
                  quantity: 0,
                  discountAmount: 0,
                  amountTotal: 0,
                  amountUntaxed: 0,
                  lineTax: 0,
                  importTax: 0,
                  specialConsumptionTax: 0,
                  environmentalResourceTax: 0,
                  vat: 0,
                } as any,
              ])
              setValue(`invoiceLines.${0}.amountUntaxed`, 0)
              setValue(`invoiceLines.${0}.quantity`, 0)
              setValue(`invoiceLines.${0}.unitPrice`, 0)
              setValue(`invoiceLines.${0}.taxes`, [])
              setValue('moveLines', [])
            }}
          />
        )}
    </Grid>
  )
}

export default memo(GroupCheckBox)

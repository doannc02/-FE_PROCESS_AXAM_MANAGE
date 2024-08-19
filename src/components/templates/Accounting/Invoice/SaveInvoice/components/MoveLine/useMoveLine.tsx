import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useAppSelector } from '@/redux/hook'
import { getAccountNames } from '@/service/accounting/account/getNames'
import { AccountMoveDetail } from '@/service/accounting/accountMove/getDetail/type'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { v4 as uuidV4 } from 'uuid'
export const useMoveLine = () => {
  const { t } = useTranslation()

  const { currency } = useAppSelector((state) => state.companyConfigData)
  const methods = useFormContext<AccountMoveDetail>()

  const { control, watch } = methods

  const router = useRouter()
  const { actionType } = router.query

  const moveLinesColumns = useMemo(
    () =>
      [
        {
          header: 'Tài khoản',
          fieldName: 'account',
          styleCell: {
            style: {
              minWidth: 300,
            },
          },
        },
        {
          header: 'Nội dung',
          fieldName: 'label',
          styleCell: {
            style: {
              minWidth: 300,
            },
          },
        },
        {
          header: 'Nợ' + ` (${currency})`,
          fieldName: 'debit',
          styleCell: {
            style: {
              minWidth: 300,
            },
          },
        },
        {
          header: 'Có' + ` (${currency})`,
          fieldName: 'credit',
          styleCell: {
            style: {
              minWidth: 300,
            },
          },
        },
      ] as ColumnProps[],
    [currency]
  )

  const { fields: fieldMoveLines } = useFieldArray({
    control,
    name: 'moveLines',
    keyName: 'key',
  })

  const moveLinesTableData = (watch('moveLines') ?? []).map((item, index) => {
    if (actionType === 'VIEW') {
      return {
        account: item.account?.code + ' - ' + item.account?.name,
        label: item.label ?? '-',
        debit: <CurrencyFormatCustom amount={item.debit} />,
        credit: <CurrencyFormatCustom amount={item.credit} />,
      }
    }

    return {
      account: (
        <CoreAutoCompleteAPI
          key={uuidV4()}
          control={control}
          name={`moveLines.${index}.account`}
          label=''
          labelPath2='code'
          placeholder='Chọn account'
          required
          rules={{
            required: t('common:validation.required'),
          }}
          fetchDataFn={getAccountNames}
          isHasMessageError={false}
        />
      ),
      label: item.label ?? '-',
      debit: (
        <CoreInput
          key={uuidV4()}
          label=''
          control={control}
          name={`moveLines.${index}.debit`}
          type='number'
        />
      ),
      credit: (
        <CoreInput
          key={uuidV4()}
          label=''
          control={control}
          name={`moveLines.${index}.credit`}
          type='number'
        />
      ),
    }
  })

  return [{ moveLinesColumns, moveLinesTableData }, {}] as const
}

import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useAppSelector } from '@/redux/hook'
import { getAccountList } from '@/service/accounting/account/getList'
import {
  AccountingLine,
  DetailDecreaseAsset,
} from '@/service/accounting/fixedAsset/getDetail/getDetailDescAsset/type'
import { IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReturn,
} from 'react-hook-form'

const useTableRowCustomAccLines = (props: {
  index: number
  methodForm: UseFormReturn<DetailDecreaseAsset['decreaseAsset'], object>
  indexDetailDecreaseAsset: number
  fields: FieldArrayWithId<
    DetailDecreaseAsset['decreaseAsset'],
    `lines.${number}.accountingLines`,
    'id'
  >[]
  accountingLine: AccountingLine
  append: UseFieldArrayAppend<
    DetailDecreaseAsset['decreaseAsset'],
    `lines.${number}.accountingLines`
  >
  remove: UseFieldArrayRemove
}) => {
  const { index, methodForm, indexDetailDecreaseAsset, remove } = props

  const { control, watch } = methodForm
  const router = useRouter()

  const currency = useAppSelector((state) => state.companyConfigData.currency)
  const { actionType } = router.query

  const columnAccLines = useMemo(
    () =>
      [
        {
          header: 'Nội dung',
          fieldName: 'label',
        },
        {
          header: 'Tài khoản nợ',
          fieldName: 'accountDebit',
        },
        {
          header: 'Tài khoản có',
          fieldName: 'accountCredit',
        },
        {
          header: 'Số tiền',
          fieldName: 'amount',
        },
        {
          header: ' ',
          fieldName: 'remove',
          styleCell: {
            styleCell: { style: { width: 10 } },
          },
        },
      ] as ColumnProps[],
    []
  )

  const tableDataAccLines = (watch(`lines.${index}.accountingLines`) ?? []).map(
    (item: any, index: number) => {
      if (actionType === 'VIEW') {
        return {
          label:
            item?.label === 'ACCUMULATED_DEPRECIATION'
              ? 'Giá trị hao mòn lũy kế'
              : 'Xử lý giá trị còn lại',
          accountCredit: item?.accountCredit?.name ?? '',
          accountDebit: item?.accountDebit?.name ?? '',
          amount: item?.amount ? (
            <CurrencyFormatCustom amount={item?.amount} showCurrencyName />
          ) : (
            ''
          ),
        }
      }
      return {
        label: item?.label ? (
          item?.label === 'ACCUMULATED_DEPRECIATION' ? (
            'Giá trị hao mòn lũy kế'
          ) : (
            'Xử lý giá trị còn lại'
          )
        ) : (
          <CoreInput
            control={control}
            name={`lines.${indexDetailDecreaseAsset}.accountingLines.${index}.label`}
          />
        ),
        accountCredit: (
          <CoreAutoCompleteAPI
            placeholder='Chọn tài khoản'
            label=''
            labelPath='name'
            labelPath2='code'
            params={{}}
            control={control}
            name={`lines.${indexDetailDecreaseAsset}.accountingLines.${index}.accountCredit`}
            fetchDataFn={getAccountList}
          />
        ),
        accountDebit: (
          <CoreAutoCompleteAPI
            placeholder='Chọn tài khoản'
            label=''
            labelPath='name'
            labelPath2='code'
            params={{}}
            control={control}
            name={`lines.${indexDetailDecreaseAsset}.accountingLines.${index}.accountDebit`}
            fetchDataFn={getAccountList}
          />
        ),
        amount: item?.amount ? (
          <CurrencyFormatCustom
            className='w-full'
            amount={Number(item?.amount)}
            showCurrencyName
          />
        ) : (
          <CoreInput
            control={control}
            type='number'
            name={`lines.${indexDetailDecreaseAsset}.accountingLines.${index}.amount`}
            InputProps={{
              endAdornment: <Typography>{currency}</Typography>,
            }}
          />
        ),
        remove:
          index > 1
            ? actionType !== 'VIEW' && (
                <IconButton onClick={() => remove(index)}>
                  <Image
                    alt=''
                    width={15}
                    height={15}
                    src={require('@/assets/svg/action/delete.svg')}
                  />
                </IconButton>
              )
            : '',
      }
    }
  )

  return [{ columnAccLines, dataTable: tableDataAccLines }, {}] as const
}

export default useTableRowCustomAccLines

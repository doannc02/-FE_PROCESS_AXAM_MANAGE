import { CoreButton } from '@/components/atoms/CoreButton'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import TooltipIcon from '@/components/icons/TooltipIcon'
import { PRIMARY, RED } from '@/helper/colors'
import { ColumnProps } from '@/components/organism/CoreTable'
import DialogWriteOffEntry from '@/components/templates/Accounting/Dialog/DialogWriteOffEntry'
import { MAX_VALUE } from '@/helper/contain'
import { convertToDate } from '@/utils/date/convertToDate'
import { errorMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { useQueryGetAccountMoveLineList } from '@/service/accounting/accountMoveLine/getList'
import { RequestBody } from '@/service/accounting/accountMoveLine/getList/type'
import { postAccountMoveLineMatching } from '@/service/accounting/accountMoveLineMatching/post'
import { useQueryGetPartnerList } from '@/service/common/partner/getListTiny'
import { ButtonBase, Checkbox, Tooltip, Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'
import { useMutation } from 'react-query'

const defaultValues = {
  isMatching: false,
  search: '',
  page: 0,
  size: 20,
}

const useEntryList = () => {
  const { t } = useTranslation('accounting/entry-list')

  const { currency } = useAppSelector((state) => state.companyConfigData)
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })
  const { id } = useAppSelector((state) => state.ledgerRefData)
  const { showDialog } = useDialog()

  const methodFormTable = useFormCustom<{
    accountMoveLine: number[]
  }>({
    defaultValues: {
      accountMoveLine: [],
    },
  })

  const columns = useMemo(
    () =>
      [
        {
          header: '',
          fieldName: 'checkBox',
        },
        {
          header: t('table.partnerName'),
          fieldName: 'partnerName',
          styleCell: {
            style: {
              minWidth: 250,
            },
          },
        },
        {
          header: t('table.createdAt'),
          fieldName: 'createdAt',
        },
        {
          header: t('table.codeInvoice'),
          fieldName: 'codeInvoice',
        },
        {
          header: t('table.accountName'),
          fieldName: 'accountName',
          styleCell: {
            style: {
              minWidth: 250,
            },
          },
        },
        {
          header: t('table.label'),
          fieldName: 'label',
        },
        {
          header: t('table.debit') + ` (${currency})`,
          fieldName: 'debit',
        },
        {
          header: t('table.credit') + ` (${currency})`,
          fieldName: 'credit',
        },
        {
          header: 'Khớp #',
          fieldName: 'mapping',
          styleCell: {
            style: {
              color: PRIMARY,
            },
          },
        },
      ] as ColumnProps[],
    [currency, t]
  )

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }
    setQueryPage(input)
  }

  const onReset = () => {
    methodFormTable.setValue('accountMoveLine', [])
    methodForm.reset(defaultValues)
    const input = _.omitBy(defaultValues, (v) => _.isNil(v))
    setQueryPage(input)
  }

  const onSubmit = methodForm.handleSubmit(async (input) => {
    setQueryPage(input)
  })

  const { isLoading, data, refetch } = useQueryGetAccountMoveLineList({
    ...queryPage,
    accountLedgerId: id,
  })

  const tableData = (data?.data?.content ?? []).map((item, index) => ({
    ...item,
    checkBox: (
      <Checkbox
        checked={!!methodFormTable.watch('accountMoveLine').includes(item.id)}
        onChange={(e, checked) => {
          const curValue = methodFormTable.getValues('accountMoveLine')
          if (checked)
            methodFormTable.setValue('accountMoveLine', [...curValue, item.id])
          else if (curValue.includes(item.id)) {
            methodFormTable.setValue(
              'accountMoveLine',
              curValue.filter((ele) => ele !== item.id)
            )
          }
        }}
      />
    ),
    codeInvoice: (
      <div className='flex gap-3'>
        <Typography>{item.codeInvoice}</Typography>
        <div>
          <Tooltip
            title={
              <div className='bg-[#fff] flex gap-2'>
                <Typography
                  key={index}
                  variant='body2'
                  style={{
                    margin: 4,
                  }}
                >
                  Số tiền còn lại:
                </Typography>
                <CurrencyFormatCustom
                  variant='body2'
                  amount={item.remainingAmount}
                  showCurrencyName
                  color={RED}
                />
              </div>
            }
          >
            <div className='h-8 w-8'>
              <TooltipIcon />
            </div>
          </Tooltip>
        </div>
      </div>
    ),
    debit: <CurrencyFormatCustom amount={item.debit} color={RED} />,
    credit: <CurrencyFormatCustom amount={item.credit} color={RED} />,
    label: item.label === 'deduct' ? 'Khấu trừ' : item.label,
    createdAt: convertToDate(item.createdAt),
    mapping:
      item.matchingNumber === 'NO_MATCHING' ? (
        ''
      ) : item.stateReconciliation === 'APART_RECONCILIATION' ||
        (item.matchingNumber === null &&
          item.stateReconciliation === 'RECONCILIATION') ? (
        <Typography variant='subtitle1' color='primary'>
          P
        </Typography>
      ) : item.matchingNumber === null &&
        item.stateReconciliation === 'NO_RECONCILIATION' ? (
        <CoreButton
          theme='submit'
          width={60}
          onClick={() => {
            methodForm.setValue('isMatching', true)
            methodForm.setValue('partnerId', item.partnerId)
            onSubmit()
          }}
        >
          Khớp
        </CoreButton>
      ) : (
        <div
          onClick={() => {
            methodForm.reset({
              ...methodForm.getValues(),
              search: item.matchingNumber,
            })
            onSubmit()
          }}
        >
          <Typography variant='subtitle1' color='primary'>
            {item.matchingNumber}
          </Typography>
        </div>
      ),
  }))

  const { mutate, isLoading: isLoadingReconcile } = useMutation(
    postAccountMoveLineMatching,
    {
      onSuccess: (res) => {
        if (res && res.data) {
          const { isMatching, moneyMatching, partnerId, accountMoveLineIds } =
            res.data
          if (isMatching) {
            refetch()
          } else
            showDialog(
              <DialogWriteOffEntry
                moneyMatching={moneyMatching}
                partnerId={partnerId}
                accountMoveLineIds={accountMoveLineIds}
                onAfterWriteOff={() => {
                  refetch()
                  methodFormTable.setValue('accountMoveLine', [])
                }}
              />
            )
        }
      },
      onError: (error) => {
        errorMsg(error)
        methodFormTable.setValue('accountMoveLine', [])
      },
    }
  )

  const onReconcile = () => {
    const input = methodFormTable.watch('accountMoveLine')
    if (input && input.length > 0) {
      mutate({
        accountMoveLine: input.map((id) => ({ id })),
      })
    }
  }

  return [
    {
      methodForm,
      methodFormTable,
      columns,
      isLoading,
      tableData,
      isLoadingReconcile,
      page: data?.data?.page,
      size: data?.data?.size,
      totalPages: data?.data?.totalPages,
    },
    { onSubmit, onReset, onChangePageSize, onReconcile, refetch },
  ] as const
}

export default useEntryList

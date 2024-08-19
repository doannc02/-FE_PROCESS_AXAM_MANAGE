import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { CoreTable } from '@/components/organism/CoreTable'
import styles from '@/components/organism/CoreTable/styles.module.css'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
import { RED, WHITE } from '@/helper/colors'
import { useAppSelector } from '@/redux/hook'
import { getAccountList } from '@/service/accounting/account/getList'
import {
  AccountLedger,
  AccountingLine,
  DetailDecreaseAsset,
  Line,
} from '@/service/accounting/fixedAsset/getDetail/getDetailDescAsset/type'
import { getIncreaseAssetListForDecrease } from '@/service/accounting/fixedAsset/getList/getDecreaseAsset'
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { Fragment, useState } from 'react'
import {
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReturn,
  useFieldArray,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import useTableRowCustomAccLines from './useTableRowCustomAccLines'
import { useRouter } from 'next/router'
import { isArray } from 'lodash'

export type Props = {
  methodForm: UseFormReturn<DetailDecreaseAsset['decreaseAsset'], object>
  accountingLine: AccountingLine
  index: number
  openRowIndex: number | null
  setOpenRowIndex: (index: number | null) => void
  removeLines?: UseFieldArrayRemove | any
  appendLines?: UseFieldArrayAppend<
    {
      id: number
      code: string
      accountingDate: string
      reason: string
      accountLedger: AccountLedger
      increaseRecordDate: string
      lines: Line[]
    },
    'lines'
  >
}

const TableRowCustomAccLines = (props: Props) => {
  const router = useRouter()
  const { actionType } = router.query
  const {
    accountingLine,
    index,
    methodForm,
    setOpenRowIndex,
    removeLines,
    openRowIndex,
  } = props
  const { t } = useTranslation('')

  const { control, watch, setValue, getValues, formState } = methodForm
  const { fields, append, remove } = useFieldArray({
    control,
    name: `lines.${index}.accountingLines`,
  })

  const accountLedgerId = useAppSelector((state) => state.ledgerRefData.id)

  const [accountingLines, setAccountingLines] = useState<number>()

  const propsRow = {
    index,
    methodForm,
    indexDetailDecreaseAsset: index,
    fields,
    accountingLine,
    append,
    remove,
  } as any

  const [values, handles] = useTableRowCustomAccLines(propsRow)

  const { columnAccLines, dataTable } = values

  return (
    <Fragment>
      <TableRow
        data-type={index % 2 === 1}
        className={styles.tableRow}
        sx={{
          height: '60px',
        }}
      >
        <TableCell align='center'>
          <div className='px-8'>
            <CoreAutoCompleteAPI
              name={`lines.${index}`}
              valuePath='product.id'
              labelPath='product.sku'
              //labelPath2='product.name'
              label=''
              isViewProp={!watch('increaseRecordDate')}
              placeholder='Chọn mã tài sản'
              params={{
                accountLedgerId: accountLedgerId,
                decreaseDate: watch('increaseRecordDate'),
              }}
              isHasMessageError={false}
              control={control}
              fetchDataFn={getIncreaseAssetListForDecrease}
              onChangeValue={(val) => {
                if (val) {
                  setValue(`lines.${index}.recordedValue`, val?.recordedValue)
                  setValue(
                    `lines.${index}.periodicAllocation`,
                    val?.periodicAllocation
                  )
                  setValue(
                    `lines.${index}.isTrackDepreciation`,
                    val?.isTrackDepreciation
                  )
                  setValue(
                    `lines.${index}.accumulatedDepreciation`,
                    val?.accumulatedDepreciation
                  )
                  setValue(`lines.${index}.remainAmount`, val?.remainAmount)
                  setValue(
                    `lines.${index}.originalPriceAccount.name`,
                    val?.originalPriceAccount?.name
                  )
                  setValue(
                    `lines.${index}.originalPriceAccount`,
                    val?.originalPriceAccount
                  )
                  setValue(`lines.${index}.product.name`, val?.product?.name)
                  //  setValue(`lines.${index}.accountingLines`, [])
                } else {
                  setValue(`lines.${index}.recordedValue`, 0)
                  setValue(`lines.${index}.periodicAllocation`, 0)
                  setValue(`lines.${index}.accumulatedDepreciation`, 0)
                  setValue(`lines.${index}.remainAmount`, null)
                  setValue(`lines.${index}.originalPriceAccount.name`, null)
                  setValue(`lines.${index}.originalPriceAccount`, null)
                  setValue(`lines.${index}.product.name`, null)
                  setValue(
                    `lines.${index}.accountRecordsTheRemainingValue`,
                    null
                  )
                }
              }}
            />
          </div>
        </TableCell>
        <TableCell align='center' className='w-[150px]'>
          <Typography>{watch(`lines.${index}.product`)?.name}</Typography>
        </TableCell>
        <TableCell align='center'>
          {watch(`lines.${index}.recordedValue`) ? (
            <CurrencyFormatCustom
              amount={Number(watch(`lines.${index}.recordedValue`))}
            ></CurrencyFormatCustom>
          ) : (
            ''
          )}
        </TableCell>
        <TableCell align='center'>
          {watch(`lines.${index}.periodicAllocation`) ? (
            <CurrencyFormatCustom
              amount={Number(watch(`lines.${index}.periodicAllocation`))}
            ></CurrencyFormatCustom>
          ) : (
            ''
          )}
        </TableCell>
        <TableCell align='center'>
          {watch(`lines.${index}.accumulatedDepreciation`) ? (
            <CurrencyFormatCustom
              amount={Number(watch(`lines.${index}.accumulatedDepreciation`))}
            ></CurrencyFormatCustom>
          ) : (
            ''
          )}
        </TableCell>
        <TableCell align='center'>
          {watch(`lines.${index}.remainAmount`) ? (
            <CurrencyFormatCustom
              amount={Number(watch(`lines.${index}.remainAmount`))}
            ></CurrencyFormatCustom>
          ) : (
            ''
          )}
        </TableCell>
        <TableCell align='center'>
          {watch(`lines.${index}.originalPriceAccount.name`)}
        </TableCell>
        <TableCell align='center'>
          <CoreAutoCompleteAPI
            control={control}
            name={`lines.${index}.accountRecordsTheRemainingValue`}
            labelPath='name'
            labelPath2='code'
            label=''
            placeholder='Chọn tài khoản'
            isViewProp={!watch('increaseRecordDate')}
            fetchDataFn={getAccountList}
            required
            rules={{
              required: t('common:validation.required'),
            }}
            isHasMessageError={false}
          />
        </TableCell>
        <TableCell align='center'>
          <CoreButton
            disabled={
              watch(`lines.${index}.accountingLines`)?.length === 0 ||
              !watch('increaseRecordDate')
            }
            width={40}
            sx={{
              backgroundColor: openRowIndex === index ? '#0078D4' : WHITE,
              color: openRowIndex === index ? WHITE : '#0078D4',
            }}
            onClick={() => {
              setOpenRowIndex(openRowIndex === index ? null : index)
              console.log(
                isArray(watch(`lines.${index}.accountingLines`)),
                'll'
              )
              if (accountingLines === 0) {
                console.log('value')

                if (watch(`lines.${index}.isTrackDepreciation`)) {
                  setValue(
                    `lines.${index}.accountingLines.${1}.label`,
                    'ACCUMULATED_DEPRECIATION'
                  )
                  setValue(
                    `lines.${index}.accountingLines.${1}.amount`,
                    Number(watch(`lines.${index}.accumulatedDepreciation`))
                  )
                }
                setValue(
                  `lines.${index}.accountingLines.${0}.label`,
                  'PROCESS_THE_REMAINING_VALUE'
                )
                setValue(
                  `lines.${index}.accountingLines.${0}.amount`,
                  Number(watch(`lines.${index}.periodicAllocation`))
                )

                setAccountingLines(2)
              } else {
                console.log('unde')
                setAccountingLines(0)

                setValue(`lines.${index}.accountingLines`, undefined)
              }
              console.log(watch(`lines.${index}.accountingLines`), 'acclines')
            }}
          >
            Hạch toán
          </CoreButton>
        </TableCell>
        <TableCell align='center'>
          {index === 0 ? null : (
            <IconButton onClick={() => removeLines(index)}>
              <Image
                alt=''
                src={require('@/assets/svg/action/delete.svg')}
                width={15}
                height={15}
              />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          align='center'
          style={{
            padding: `${openRowIndex ? 0 : 0}px 0px ${
              openRowIndex ? 0 : 0
            }px 0px`,
          }}
          colSpan={10}
        >
          <Collapse in={openRowIndex === index}>
            <Box
              className='flex items-center justify-center mt-5 ml-10'
              sx={{
                height: '30px',
                width: '90px',
                borderRadius: '4px 4px 0px 0px',
                backgroundColor: '#0078D4',
                color: WHITE,
              }}
            >
              Hạch toán
            </Box>
            <Divider color={'#0078D4'} sx={{ height: '3px' }} />
            <form className='p-10 w-full'>
              <Box className='flex flex-wrap'>
                <CoreTable
                  showInfoText={false}
                  paginationHidden
                  tableName='tableDivPro'
                  isLoading={false}
                  className='w-full'
                  columns={columnAccLines}
                  data={dataTable}
                  actionTable={
                    actionType === 'VIEW' && !watch('increaseRecordDate') ? (
                      <ActionTable
                        action='Thêm dòng'
                        columns={columnAccLines}
                        defaultValueLine={{ ratio: '' }}
                        append={append}
                      />
                    ) : null
                  }
                />
              </Box>

              {formState.errors?.root?.message && (
                <Typography color={RED}>
                  {formState.errors?.root?.message}
                </Typography>
              )}
            </form>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default TableRowCustomAccLines

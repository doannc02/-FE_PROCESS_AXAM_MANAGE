import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import CoreLoading from '@/components/molecules/CoreLoading'
import { TopAction } from '@/components/molecules/TopAction'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { TableHeadCommon } from '@/components/organism/CoreTable'
import DialogDeleteAssetDesc from '@/components/templates/Accounting/Dialog/DialogDeleteAssetDesc'
import DialogDeleteToolDesc from '@/components/templates/Accounting/Dialog/DialogDeleteToolDesc'
import { PRIMARY } from '@/helper/colors'
import { MENU_URL } from '@/routes'
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableProps,
  TableRow,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import TableRowCustomAccLines from './Components/TableCustomAsset'
import useSaveDescAsset from './useSaveDescAsset'
import { optionReason } from '@/enum'

const CustomTable = styled(Table)<TableProps>(() => ({
  border: '1px solid #DFE0EB',

  '& td': {
    padding: '5px',
    '&.font-bold': {
      fontWeight: 500,
    },
  },
  '& th': {
    padding: '5px',
    fontWeight: 600,
  },
}))

const SaveDescAsset = () => {
  const { t } = useTranslation('accounting/decrease-tools')

  const [values, handles] = useSaveDescAsset()

  const {
    isUpdate,
    actionType,
    accountLedger,
    methodForm,
    id,
    isLoadingSubmit,
    fields,
    isLoadingQueryDescAsset,
    currency,
  } = values

  const { onCancel, onSubmit, refetch, rmLinesSaveTool, apLinesTool } = handles
  const { control, getValues, watch, setValue } = methodForm
  const [openRowIndex, setOpenRowIndex] = useState<number | null>(null)
  const { showDialog } = useDialog()

  const router = useRouter()

  return (
    <PageWithDetail
      title={
        <div className='flex justify-between items-center'>
          <div className='flex'>
            <CoreBreadcrumbs
              isShowDashboard
              breadcrumbs={[
                {
                  title: 'Ghi giảm TSCD',
                  pathname: `${MENU_URL.ASSET.DESC}`,
                },
                {
                  title: isUpdate
                    ? actionType === 'VIEW'
                      ? 'Chi tiết'
                      : 'Chỉnh sửa'
                    : t('common:btn.add'),
                },
              ]}
            />
          </div>
        </div>
      }
      topAction={
        <div className='bg-white flex justify-between w-full items-center'>
          <div></div>
          {!router.asPath.includes('/addNew') ? (
            actionType === 'VIEW' ? (
              <TopAction
                actionList={['edit', 'delete']}
                onEditAction={() => {
                  router.replace({
                    pathname: `${MENU_URL.ASSET.DESC}/[id]`,
                    query: {
                      id,
                    },
                  })
                }}
                onDeleteAction={() => {
                  showDialog(
                    <DialogDeleteAssetDesc
                      id={id}
                      refetch={() => {
                        router.push({
                          pathname: MENU_URL.ASSET.DESC,
                        })
                      }}
                    />
                  )
                }}
              />
            ) : (
              <TopAction
                actionList={['delete']}
                onDeleteAction={() => {
                  showDialog(
                    <DialogDeleteToolDesc
                      id={id}
                      refetch={() => {
                        router.push({
                          pathname: MENU_URL.ASSET.DESC,
                        })
                      }}
                    />
                  )
                }}
              />
            )
          ) : (
            <></>
          )}
        </div>
      }
    >
      <div className='w-full flex flex-col'>
        <form className='bg-[#ffffff] ' onSubmit={onSubmit}>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name='code'
                label='Mã ghi giảm'
                placeholder='Nhập mã ghi giảm'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='reason'
                valuePath='value'
                options={optionReason}
                label='Lý do ghi giảm'
                placeholder='Chọn lý do ghi giảm'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='accountingDate'
                title='Ngày hạch toán'
                placeholder='Chọn ngày hạch toán'
                format='YYYY-MM-DD'
                required
                rules={{
                  required: t('common:validation.required'),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='increaseRecordDate'
                title='Ngày ghi giảm'
                placeholder='Chọn ngày ghi giảm'
                format='YYYY-MM-DD'
                required
                rules={{
                  required: t('common:validation.required'),
                }}
              />
            </Grid>

            <div className='w-full h-15'></div>
            <Grid
              style={{
                overflowX: 'auto',
                display: 'flex',
                justifyContent: 'center',
              }}
              item
            >
              <div className='w-[105%]'>
                <CustomTable>
                  <TableHeadCommon
                    sx={{
                      height: '50px',
                      width: '100px',
                    }}
                  >
                    <TableRow className='bg-[#F6F7F9]  min-h-[60px]'>
                      <TableCell
                        className='min-w-[150px] py-8'
                        variant='body'
                        align='center'
                      >
                        Mã tài sản
                      </TableCell>
                      <TableCell
                        className='min-w-[150px] py-8'
                        variant='body'
                        align='center'
                      >
                        Tên tài sản
                      </TableCell>
                      <TableCell
                        className='min-w-[150px] py-8'
                        variant='body'
                        align='center'
                      >
                        Nguyên giá ({currency})
                      </TableCell>
                      <TableCell
                        className='min-w-[150px] py-8'
                        variant='body'
                        align='center'
                      >
                        Giá trị khấu hao ({currency})
                      </TableCell>
                      <TableCell
                        className='min-w-[150px] py-8'
                        variant='body'
                        align='center'
                      >
                        Hao mòn lũy kế ({currency})
                      </TableCell>
                      <TableCell
                        className='min-w-[150px] py-8'
                        variant='body'
                        align='center'
                      >
                        Giá trị còn lại ({currency})
                      </TableCell>
                      <TableCell
                        className='min-w-[150px] py-8'
                        variant='body'
                        align='center'
                      >
                        TK nguyên giá
                      </TableCell>
                      <TableCell
                        className='min-w-[150px] py-8'
                        variant='body'
                        align='center'
                      >
                        TK ghi nhận GT còn lại
                      </TableCell>

                      <TableCell
                        className='min-w-[150px] py-8'
                        variant='body'
                        align='center'
                      ></TableCell>
                      <TableCell
                        className='min-w-[150px] py-8'
                        variant='body'
                        align='center'
                      ></TableCell>
                    </TableRow>
                  </TableHeadCommon>
                  <TableBody>
                    {isLoadingQueryDescAsset ? (
                      <TableRow>
                        <TableCell colSpan={10} variant='body'>
                          <div className='flex justify-center min-h-[60px]'>
                            <CoreLoading />
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      (fields ?? [])?.map((item: any, index: any) => {
                        return (
                          <TableRowCustomAccLines
                            key={item.key}
                            accountingLine={item}
                            index={index}
                            methodForm={methodForm}
                            openRowIndex={openRowIndex}
                            setOpenRowIndex={setOpenRowIndex}
                            removeLines={rmLinesSaveTool}
                          />
                        )
                      })
                    )}
                  </TableBody>
                  {actionType !== 'VIEW' && (
                    <TableRow>
                      <TableCell colSpan={10}>
                        <div className='flex items-center gap-10 h-15 px-2'>
                          <Typography
                            variant='body1'
                            style={{
                              color: PRIMARY,
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              apLinesTool({
                                accountingLines: [],
                              })
                            }}
                          >
                            Thêm dòng
                          </Typography>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </CustomTable>
              </div>
            </Grid>
          </Grid>

          {actionType !== 'VIEW' && (
            <div className='space-x-12 text-center my-10'>
              <CoreButton theme='cancel' onClick={onCancel}>
                {t('common:btn.cancel')}
              </CoreButton>

              <CoreButton
                theme='submit'
                type='submit'
                loading={isLoadingSubmit}
              >
                {isUpdate ? t('common:btn.save_change') : t('common:btn.add')}
              </CoreButton>
            </div>
          )}
        </form>
      </div>
    </PageWithDetail>
  )
}

export default SaveDescAsset

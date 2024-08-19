import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import { CoreTable } from '@/components/organism/CoreTable'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
import DialogDeleteToolDesc from '@/components/templates/Accounting/Dialog/DialogDeleteToolDesc'
import DialogDeleteToolEscHM from '@/components/templates/Accounting/Dialog/DialogDeleteToolEscHandMade'
import { MENU_URL } from '@/routes'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import useSaveDescTools from './useSaveTools'

const optionReason = [
  { value: 'SALES_LIQUIDATION', label: 'Xuất bán, thanh lý' },
  { value: 'DAMAGE_LOSS', label: 'Hỏng hóc, mất mát' },
]

const SaveDescTools = () => {
  const { t } = useTranslation('accounting/decrease-tools')

  const [values, handles] = useSaveDescTools()

  const {
    isUpdate,
    actionType,
    methodForm,
    id,
    isLoadingSubmit,
    currencyId,
    fields,
    tableData,
    currency,
    columns,
    typeAddNewRouter,
    pathRedirect,
  } = values

  const { onCancel, onSubmit, refetch, rmLinesSaveTool, apLinesTool } = handles
  const { control, watch, setValue } = methodForm

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
                  title: <Typography>Ghi giảm CCDC</Typography>,
                  pathname: `${MENU_URL.TOOL.DESC}`,
                },
                {
                  title: (
                    <Typography>
                      {isUpdate
                        ? actionType === 'VIEW'
                          ? 'Chi tiết'
                          : 'Chỉnh sửa'
                        : t('common:btn.add')}
                    </Typography>
                  ),
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
                    pathname: `${MENU_URL.TOOL.DESC}/[id]`,
                    query: {
                      id,
                      typeAddNew: typeAddNewRouter,
                    },
                  })
                }}
                onDeleteAction={() => {
                  showDialog(
                    <DialogDeleteToolEscHM
                      id={id}
                      refetch={() => {
                        router.push({
                          pathname: MENU_URL.TOOL.DESC,
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
                          pathname: MENU_URL.TOOL.DESC,
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
              <CoreAutocomplete
                control={control}
                name='reason'
                options={optionReason}
                label='Lý do ghi giảm'
                placeholder='Chọn lý do ghi giảm'
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

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name='code'
                label='Mã ghi giảm'
                placeholder='Nhập mã ghi giảm'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <CoreTable
                columns={columns}
                data={tableData}
                isShowColumnStt
                paginationHidden
                showInfoText={false}
                actionTable={
                  !(actionType === 'VIEW') ? (
                    <ActionTable
                      action='Thêm dòng'
                      columns={columns}
                      defaultValueLine={{}}
                      append={apLinesTool}
                    />
                  ) : null
                }
              />
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

export default SaveDescTools

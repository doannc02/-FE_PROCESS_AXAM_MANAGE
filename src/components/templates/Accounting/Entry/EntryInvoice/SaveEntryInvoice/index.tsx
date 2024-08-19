import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { TableCustomDnd } from '@/components/organism/TableCustomDnd'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
import DialogConfirmDraft from '@/components/templates/Accounting/Dialog/DialogConfirmDraft'
import { state } from '@/enum'
import { PRIMARY } from '@/helper/colors'
import { MENU_URL } from '@/routes'
import { getAccountJournalList } from '@/service/accounting/accountJournal/getList'
import { getPartnerList } from '@/service/common/partner/getListTiny'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import useEntryInvoice from './useEntryInvoice'

const SaveEntryInvoice = () => {
  const { t } = useTranslation('accounting/entry-invoice')

  const [values, handles] = useEntryInvoice()
  const {
    id,
    invoiceName,
    control,
    isUpdate,
    isLoadingSubmit,
    methodForm,
    isView,
    moveLinesColumns,
    moveLinesTableData,
  } = values

  const { showDialog } = useDialog()
  const { watch, setValue } = methodForm
  const { onSubmit, onDraftSubmit, onCancel, appendMoveLines, refetch } =
    handles
  const router = useRouter()
  const { actionType } = router.query

  return (
    <PageWithDetail
      title={
        <div className='flex justify-between w-full'>
          <CoreBreadcrumbs
            isShowDashboard
            breadcrumbs={[
              {
                title: t('title'),
                pathname: MENU_URL.ENTRY.ENTRY_INVOICE,
              },
              {
                title: isUpdate
                  ? actionType === 'VIEW'
                    ? t('common:detail')
                    : t('common:btn.edit')
                  : t('common:btn.add'),
              },
            ]}
          />

          <CoreBreadcrumbs
            breadcrumbs={state.map((ele, index) => ({
              title: (
                <Typography
                  sx={{
                    color: watch('state') === ele.value ? PRIMARY : undefined,
                  }}
                >
                  {`${index + 1}. ${ele.label}`}
                </Typography>
              ),
            }))}
          />
        </div>
      }
      topAction={
        <div className='bg-white flex justify-between w-full items-center'>
          <div></div>
          <TopAction
            actionList={
              [
                ...(watch('accountPaymentId') === null &&
                watch('state') === 'DRAFT'
                  ? ['edit']
                  : []),
                ...(watch('state') === 'POSTED' &&
                watch('accountPaymentId') === null
                  ? ['draft']
                  : []),
              ] as any
            }
            onDraftAction={() => {
              showDialog(
                <DialogConfirmDraft id={id} type='INVOICE' refetch={refetch} />
              )
            }}
            onEditAction={() => {
              router.replace({
                pathname: `${MENU_URL.ENTRY.ENTRY_INVOICE}/[id]`,
                query: {
                  id,
                },
              })
            }}
          />
        </div>
      }
    >
      <div className='w-full flex flex-col'>
        <form onSubmit={onSubmit}>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            {isUpdate && (
              <Grid
                item
                xs={12}
                style={{
                  marginBottom: '15px',
                }}
              >
                <Typography variant='h6'>{invoiceName}</Typography>
              </Grid>
            )}

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name='code'
                label='Mã tham chiếu'
                placeholder='Nhập mã tham chiếu'
                readOnly={watch('state') === 'POSTED'}
                inputProps={{ maxLength: 50 }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='accountingDate'
                title='Ngày vào sổ'
                placeholder='Chọn ngày vào sổ'
                required
                format='YYYY-MM-DD'
                rules={{
                  required: t('common:validation.required'),
                }}
                readOnly={watch('state') === 'POSTED'}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='partnerType'
                label='Loại đối tác'
                required
                options={[
                  {
                    label: 'Khách hàng',
                    value: 'CUSTOMER',
                  },
                  {
                    label: 'Nhà cung cấp',
                    value: 'VENDOR',
                  },
                ]}
                rules={{
                  required: t('common:validation.required'),
                }}
                readOnly={watch('state') === 'POSTED'}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name='partner'
                label={
                  watch('partnerType') === 'CUSTOMER'
                    ? 'Khách hàng'
                    : 'Nhà cung cấp'
                }
                placeholder={
                  watch('partnerType') === 'CUSTOMER'
                    ? 'Chọn khách hàng'
                    : 'Chọn nhà cung cấp'
                }
                required
                valuePath='id'
                labelPath='name'
                labelPath2='code'
                fetchDataFn={getPartnerList}
                params={{
                  vendorActivated:
                    watch('partnerType') === 'VENDOR' ? true : null,
                  isVendor: watch('partnerType') === 'VENDOR' ? true : null,
                  isCustomer: watch('partnerType') === 'CUSTOMER' ? true : null,
                  activated: watch('partnerType') === 'CUSTOMER' ? true : null,
                }}
                rules={{
                  required: t('common:validation.required'),
                }}
                readOnly={watch('state') === 'POSTED'}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name='accountJournal'
                label='Sổ kế toán'
                placeholder='Chọn sổ kế toán'
                params={{
                  type:
                    watch('partnerType') === 'CUSTOMER' ? 'SALE' : 'PURCHASE',
                }}
                required
                fetchDataFn={getAccountJournalList}
                readOnly={watch('state') === 'POSTED'}
                rules={{ required: t('common:validation.required') }}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <div className='flex gap-1 items-center mt-5'>
                <Typography variant='h6'>Đối soát bút toán</Typography>
              </div>
            </Grid>

            <Grid item xs={12}>
              <TableCustomDnd
                setValue={setValue}
                watch={watch}
                fieldsName='moveLines'
                columns={moveLinesColumns}
                data={moveLinesTableData}
                actionTable={
                  watch('state') === 'DRAFT' && actionType !== 'VIEW' ? (
                    <ActionTable
                      action='Thêm bút toán'
                      columns={moveLinesColumns}
                      append={appendMoveLines}
                      defaultValueLine={{
                        accountTagIds: [],
                      }}
                    />
                  ) : null
                }
              />
            </Grid>
          </Grid>

          {watch('state') === 'DRAFT' && !isView && (
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

export default SaveEntryInvoice

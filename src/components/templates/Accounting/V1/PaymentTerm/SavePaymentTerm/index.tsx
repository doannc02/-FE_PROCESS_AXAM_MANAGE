import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { CustomTable } from '@/components/organism/TableCustom'
import { useCheckPath } from '@/path'
import { MENU_URL } from '@/routes'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import DialogDeletePaymentTerm from '../DialogDeletePaymentTerm'
import usePaymentTerm from './usePaymentTerm'

const SavePaymentTerm = () => {
  const { t } = useTranslation('accounting/payment-term')
  const router = useRouter()
  const { actionType } = router.query
  const [values, handles] = usePaymentTerm()
  const { showDialog } = useDialog()
  const {
    id,
    isUpdate,
    isLoadingSubmit,
    methodForm,
    columns,
    tableData,
    dateExample,
  } = values

  const { typePath } = useCheckPath()

  const { watch, control } = methodForm
  const { onSubmit, onCancel, onAddLine, updateDes } = handles

  return (
    <PageWithDetail
      title={
        <div className='flex justify-between w-full'>
          <CoreBreadcrumbs
            isShowDashboard
            breadcrumbs={[
              {
                title: t('title'),
                pathname: MENU_URL.PROVIDER.REFUND,
              },
              {
                title: (
                  <Typography>
                    {isUpdate
                      ? actionType === 'VIEW'
                        ? t('common:detail')
                        : t('common:btn.edit')
                      : t('common:btn.add')}
                  </Typography>
                ),
              },
            ]}
          />
        </div>
      }
      topAction={
        !router.asPath.includes('/addNew') && (
          <TopAction
            actionList={['edit', 'delete']}
            onEditAction={() => {
              router.replace({
                pathname: `${MENU_URL[typePath].PAYMENT_TERM}/[id]`,
                query: {
                  id,
                },
              })
            }}
            onDeleteAction={() =>
              showDialog(
                <DialogDeletePaymentTerm id={id} refetch={router.back} />
              )
            }
          />
        )
      }
    >
      <form
        className='block bg-[#ffffff] mt-15 rounded-xl mx-auto'
        onSubmit={onSubmit}
      >
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <CoreInput
              control={control}
              name='name'
              required
              label='Điều khoản thanh toán'
              placeholder='Nhập điều khoản'
              inputProps={{
                maxLength: 250,
              }}
              rules={{ required: t('common:validation.required') }}
            />
          </Grid>
          <Grid item xs={12}>
            <CoreCheckbox
              name='hasEarlyDiscount'
              control={control}
              label='Giảm giá nếu thanh toán sớm'
              onAfterChange={() => updateDes()}
            />
          </Grid>

          {watch('hasEarlyDiscount') && (
            <>
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <CoreInput
                  control={control}
                  name='discountAmount'
                  type='number'
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3}>
                <CoreAutocomplete
                  fullWidth
                  control={control}
                  name='discountComputeType'
                  placeholder='Reduced tax'
                  disableClearable
                  InputProps={{ style: { width: '210px' } }}
                  onChangeValue={updateDes}
                  options={[
                    {
                      label: 'Giá cố định',
                      value: 'FIXED',
                    },
                    {
                      label: 'Phần trăm',
                      value: 'PERCENT',
                    },
                  ]}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={2.4} lg={2.4}>
                <div className='flex flex-col h-full justify-center'>
                  <Typography variant='body1'>nếu thanh toán trong</Typography>
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={2} lg={2}>
                <CoreInput
                  control={control}
                  name='withinDays'
                  type='number'
                  onChangeValue={updateDes}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={1} lg={1}>
                <div className='flex flex-col h-full justify-center'>
                  <Typography variant='body1'>ngày.</Typography>
                </div>
              </Grid>
            </>
          )}

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ marginTop: '15px' }}
          >
            <Typography variant='h5'>Thời hạn</Typography>
            <CustomTable
              className='mt-10'
              columns={actionType ? columns.slice(0, -1) : columns}
              data={tableData}
              paginationHidden={true}
              showInfoText={false}
            />

            {actionType !== 'VIEW' && (
              <div
                className='flex items-center text-[#213660] px-10 py-8'
                style={{
                  borderBottom: '1px solid #DFE0EB',
                  borderLeft: '1px solid #DFE0EB',
                  borderRight: '1px solid #DFE0EB',
                }}
              >
                <div className='cursor-pointer' onClick={onAddLine}>
                  <Typography variant='body1'>Thêm dòng</Typography>
                </div>
              </div>
            )}
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ marginTop: '20px' }}
          >
            <Typography variant='subtitle1'>{`Ví dụ: Hóa đơn 1,000đ và ngày tạo chứng từ là ${dateExample}`}</Typography>

            {watch('description')
              .split('--')
              .map((item, index) => (
                <Typography
                  key={index}
                  variant='subtitle1'
                  style={{
                    marginTop: '20px',
                  }}
                >
                  {item}
                </Typography>
              ))}
          </Grid>
        </Grid>

        {actionType !== 'VIEW' && (
          <div className='space-x-12 text-center mt-10'>
            <CoreButton theme='cancel' onClick={onCancel}>
              {t('common:btn.cancel')}
            </CoreButton>
            <CoreButton theme='submit' type='submit' loading={isLoadingSubmit}>
              {isUpdate ? t('common:btn.save_change') : t('common:btn.add')}
            </CoreButton>
          </div>
        )}
      </form>
    </PageWithDetail>
  )
}

export default SavePaymentTerm

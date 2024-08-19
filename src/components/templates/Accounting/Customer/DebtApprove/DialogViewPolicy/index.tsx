import { CoreButton } from '@/components/atoms/CoreButton'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { timeType } from '@/enum'
import { Box, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import useDialogViewPolicy from './useDialogViewPolicy'

const DialogViewPolicy = ({ id, refetch }: { id: number; refetch: any }) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()
  const [values, handles] = useDialogViewPolicy({ id, refetch })
  const {
    isLoading,
    currency,
    isLoadingSubmit,
    methodForm,
    isLoadingPartners,
    partnerSelect,
    fields,
  } = values

  const { control, watch } = methodForm
  const { onSubmit, onReject, remove, append } = handles

  return (
    <DialogCustom
      title='PHÊ DUYỆT'
      onClose={hideDialog}
      width={945}
      formProps={{ className: 'p-15', onSubmit }}
    >
      <Box className='flex p-5'>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              control={control}
              name='name'
              label='Tên chính sách'
              placeholder='Nhập tên chính sách'
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              control={control}
              name='maximumDebtAmount'
              label='Hạn mức nợ'
              placeholder='Nhập hạn mức nợ'
              type='number'
              InputProps={{
                endAdornment: (
                  <Typography variant='body2'>{currency}</Typography>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              control={control}
              name='timeRepayDebt'
              label='Thời gian miễn phạt'
              placeholder='Nhập thời gian miễn phạt'
              type='number'
              InputProps={{
                endAdornment: (
                  <Typography variant='body2'>
                    {
                      timeType.find((item) => item.value === watch('timeType'))
                        ?.label
                    }
                  </Typography>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreDatePicker
              control={control}
              name='timeApplyPolicy'
              title='Thời gian bắt đầu chính sách'
              placeholder='Chọn ngày'
              format='YYYY-MM-DD'
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreAutocomplete
              multiple
              control={control}
              name='partnerIds'
              label='Khách hàng áp dụng'
              placeholder='Chọn dánh sách khách hàng áp dụng'
              loading={isLoadingPartners}
              labelPath='name'
              valuePath='id'
              options={partnerSelect}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='subtitle1'>Phạt trả chậm</Typography>
          </Grid>
        </Grid>
      </Box>

      {fields.map((field, index) => {
        return (
          <Box className='p-5' key={field.key}>
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} sm={12} md={5.5} lg={5.5}>
                <CoreInput
                  control={control}
                  name={`policyLines.${index}.deferredPaymentPeriod`}
                  label='Thời gian trả chậm'
                  placeholder='Nhập thời gian'
                  type='number'
                  required
                  rules={{
                    required: t('common:validation.required'),
                  }}
                  InputProps={{
                    endAdornment: (
                      <Typography variant='body2'>
                        {
                          timeType.find(
                            (item) =>
                              item.value ===
                              watch(
                                `policyLines.${index}.timeTypeDeferredPaymentPeriod`
                              )
                          )?.label
                        }
                      </Typography>
                    ),
                  }}
                  readOnly={watch('status') !== 'DRAFT'}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={5.5} lg={5.5}>
                <CoreInput
                  control={control}
                  name={`policyLines.${index}.punish`}
                  label='Phạt'
                  type='number'
                  placeholder='Nhập phần trăm phạt'
                  InputProps={{
                    endAdornment: <Typography variant='body2'>%</Typography>,
                  }}
                  required
                  rules={{
                    required: t('common:validation.required'),
                  }}
                  readOnly={watch('status') !== 'DRAFT'}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={1} lg={1}>
                <div className='flex items-center h-full'>
                  {index > 0 ? (
                    <Action
                      actionList={['append', 'remove']}
                      onAppendAction={() => {
                        append({
                          deferredPaymentPeriod: 0,
                          punish: 0,
                          timeTypeDeferredPaymentPeriod: 'DAYS',
                        })
                      }}
                      onRemoveAction={() => {
                        remove(index)
                      }}
                    />
                  ) : (
                    <Action
                      actionList={['append']}
                      onAppendAction={() => {
                        append({
                          deferredPaymentPeriod: 0,
                          punish: 0,
                          timeTypeDeferredPaymentPeriod: 'DAYS',
                        })
                      }}
                    />
                  )}
                </div>
              </Grid>
            </Grid>
          </Box>
        )
      })}

      <div className='flex justify-center gap-10 py-17'>
        <CoreButton
          theme='cancel'
          onClick={() => {
            hideDialog()
          }}
        >
          {t('common:btn.cancel')}
        </CoreButton>

        <CoreButton theme='reset' onClick={onReject} loading={isLoadingSubmit}>
          Từ chối
        </CoreButton>
        <CoreButton theme='submit' onClick={onSubmit} loading={isLoadingSubmit}>
          Phê duyệt
        </CoreButton>
      </div>
    </DialogCustom>
  )
}

export default DialogViewPolicy

import { CoreButton } from '@/components/atoms/CoreButton'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { useAppSelector } from '@/redux/hook'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import useDialogWriteOffEntry from './useDialogWriteOffEntry'

export type WriteOffProp = {
  moneyMatching: number
  partnerId: number | null
  accountMoveLineIds: number[]
  onAfterWriteOff: any
}

const DialogWriteOffEntry = ({
  moneyMatching,
  partnerId,
  accountMoveLineIds,
  onAfterWriteOff,
}: WriteOffProp) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()

  const [values, handles] = useDialogWriteOffEntry({
    moneyMatching,
    partnerId,
    accountMoveLineIds,
    onAfterWriteOff,
  })

  const {
    methodForm,
    isLoadingAccountJournal,
    isLoadingAccountSelect,
    accountJournalSelect,
    accountSelect,
  } = values
  const { control, watch } = methodForm

  const { currency } = useAppSelector((state) => state.companyConfigData)

  const { onSubmit } = handles

  return (
    <DialogCustom
      title='Xóa bỏ bút toán'
      onClose={hideDialog}
      width={940}
      formProps={{
        className: 'p-20',
        onSubmit,
      }}
    >
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <CoreCheckbox
            name='isAllowPartials'
            control={control}
            label='Cho phép đối soát 1 phần'
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={{ xs: 1, sm: 2, md: 3 }}
        style={{
          display: watch('isAllowPartials') ? 'none' : '',
          marginTop: 4,
        }}
      >
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <CoreAutocomplete
            control={control}
            name='accountJournalId'
            label='Sổ kế toán'
            placeholder='Chọn sổ kế toán'
            valuePath='id'
            labelPath='name'
            loading={isLoadingAccountJournal}
            options={accountJournalSelect}
            required
            rules={{ required: t('common:validation.required') }}
            isViewProp={false}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <CoreAutocomplete
            control={control}
            name='accountId'
            label='Tài khoản'
            placeholder='Chọn tài khoản'
            valuePath='id'
            labelPath='name'
            loading={isLoadingAccountSelect}
            options={accountSelect}
            required
            rules={{ required: t('common:validation.required') }}
            isViewProp={false}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <CoreInput
            control={control}
            name='moneyMatching'
            label='Số tiền'
            placeholder='Nhập số tiền'
            type='number'
            disabled
            InputProps={{
              endAdornment: <Typography variant='body2'>{currency}</Typography>,
            }}
            required
            rules={{ required: t('common:validation.required') }}
            isViewProp={false}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <CoreDatePicker
            control={control}
            name='dayReconcile'
            title='Ngày'
            placeholder='Chọn ngày'
            format='YYYY-MM-DD'
            isViewProp={false}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <CoreInput
            control={control}
            name='label'
            label='Nhãn'
            placeholder='Nhập nhãn'
            isViewProp={false}
          />
        </Grid>
      </Grid>

      <div className='space-x-12 text-center mt-15'>
        <CoreButton theme='cancel' onClick={hideDialog}>
          {t('common:btn.cancel')}
        </CoreButton>

        <CoreButton theme='submit' type='submit'>
          Đối soát
        </CoreButton>
      </div>
    </DialogCustom>
  )
}

export default DialogWriteOffEntry

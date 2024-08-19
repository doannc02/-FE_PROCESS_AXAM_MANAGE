import { CoreButton } from '@/components/atoms/CoreButton'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { REGEX } from '@/helper/regex'
import { Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useDialogAddSTKBank } from './useDialogAddSTKBank'

export type Props = {
  refetch: any
  onCloseDialog: () => void
  setValue: any
  name: string
}

export const DialogAddSTKBank = (props: Props) => {
  const { t } = useTranslation()

  const { onCloseDialog } = props

  const [values, handles] = useDialogAddSTKBank(props)

  const {
    methodForm,
    isLoadingBank,
    listBankSelect,
    isLoadingBranch,
    branchSelect,
  } = values

  const { control, setValue } = methodForm
  const { onSubmit } = handles

  return (
    <DialogCustom
      title='Thêm mới STK'
      onClose={onCloseDialog}
      width={1000}
      formProps={{
        className: 'p-20',
      }}
    >
      <div className='p-5'>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreAutocomplete
              isViewProp={false}
              name='bankId'
              control={control}
              label='Ngân hàng'
              placeholder='Chọn ngân hàng'
              loading={isLoadingBank}
              options={listBankSelect}
              labelPath='name'
              valuePath='id'
              onChangeValue={(val) => {
                if (!val) setValue(`bankBranchId`, null)
              }}
              required
              rules={{
                required: t('common:validation.required'),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              isViewProp={false}
              name='accountNumber'
              control={control}
              label='STK ngân hàng'
              placeholder='Nhập STK'
              required
              inputProps={{ maxLength: 20 }}
              rules={{
                required: t('common:validation.required'),
                validate: {
                  isNumber: (v: any) =>
                    REGEX.NUMBER.test(v) || 'Số tài khỏan không hợp lệ.',
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              isViewProp={false}
              name='accountHolder'
              control={control}
              label='Tên chủ tài khoản'
              placeholder='Nhập tên chủ tài khoản'
              required
              rules={{
                required: t('common:validation.required'),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreAutocomplete
              isViewProp={false}
              name='bankBranchId'
              control={control}
              label='Chi nhánh'
              placeholder='Chọn ngân hàng'
              labelPath='code'
              valuePath='id'
              loading={isLoadingBranch}
              options={branchSelect}
            />
          </Grid>

          <Grid item xs={12} className='flex items-center justify-center'>
            <CoreButton
              style={{ marginRight: 20 }}
              theme='cancel'
              onClick={onCloseDialog}
            >
              {t('common:btn.cancel')}
            </CoreButton>
            <CoreButton type='button' theme='submit' onClick={() => onSubmit()}>
              Thêm mới
            </CoreButton>
          </Grid>
        </Grid>
      </div>
    </DialogCustom>
  )
}

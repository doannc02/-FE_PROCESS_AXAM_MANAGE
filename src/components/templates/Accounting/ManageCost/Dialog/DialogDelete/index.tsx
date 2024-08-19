import { CoreButton } from '@/components/atoms/CoreButton'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { REGEX } from '@/helper/regex'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useDialogDelete } from './useDialogDelete'
import { useDialog } from '@/components/hooks/dialog/useDialog'

export type Props = {
  refetch: any
  title?: string
  id: number
  type: 'BCM' | 'LCM' | 'MMC'
  onCloseDialog?: any
}

export const DialogDelete = (props: Props) => {
  const { t } = useTranslation()

  const { title } = props
  const [values, handles] = useDialogDelete(props)
  const { hideDialog } = useDialog()
  const { isLoadingSubmit } = values
  const { onSubmit } = handles

  return (
    <DialogCustom
      title='Xác nhận xóa'
      onClose={hideDialog}
      width={700}
      formProps={{
        className: 'p-20',
      }}
    >
      <div className='p-5'>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12}>
            <Typography>
              {' '}
              Bạn có chắc chắn muốn xóa {title} này không?
            </Typography>
          </Grid>
          <Grid item xs={12} className='flex items-center justify-center'>
            <CoreButton
              style={{ marginRight: 20 }}
              theme='cancel'
              onClick={hideDialog}
            >
              {t('common:btn.cancel')}
            </CoreButton>
            <CoreButton
              loading={isLoadingSubmit}
              type='button'
              theme='submit'
              onClick={() => {
                onSubmit()
              }}
            >
              Đồng ý
            </CoreButton>
          </Grid>
        </Grid>
      </div>
    </DialogCustom>
  )
}

import { CoreButton } from '@/components/atoms/CoreButton'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { REGEX } from '@/helper/regex'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useDialog } from '@/components/hooks/dialog/useDialog'

export type Props = {
  refetch: any

  onSubmitEdit: () => void
  title: string
}

export const DialogAcceptEdit = (props: Props) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()
  const { title, onSubmitEdit } = props

  return (
    <DialogCustom
      title='Xác nhận chỉnh sửa'
      onClose={hideDialog}
      width={750}
      formProps={{
        className: 'p-20',
      }}
    >
      <div className='p-5'>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12}>
            <Typography>
              {title} được chỉnh sửa thì đơn giá định mức của thành phẩm sẽ được
              thay đổi theo. Bạn có muốn sửa không?
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
              type='button'
              theme='submit'
              onClick={() => onSubmitEdit()}
            >
              Đồng ý
            </CoreButton>
          </Grid>
        </Grid>
      </div>
    </DialogCustom>
  )
}

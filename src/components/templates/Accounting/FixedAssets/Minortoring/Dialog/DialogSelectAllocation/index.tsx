import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreButton } from '@/components/atoms/CoreButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Grid } from '@mui/material'
import useDialogSelectAllocation from './useDialogSelectAllocation'

type Props = {
  title: string
  type?: 'PURCHASE' | 'ASSET'
}
const DialogSelectAllocation = (props: Props) => {
  const { title, type } = props
  const { hideDialog } = useDialog()
  const [values, handles] = useDialogSelectAllocation()
  const { methodForm } = values
  const { onSubmit, onChangePageSize, onReset } = handles
  const { control, setValue, watch } = methodForm
  const arrMonth = []
  for (let i = 1; i <= 12; i++) {
    arrMonth.push({ value: i, label: ' ' + 'Tháng' + ' ' + i.toString() })
  }

  return (
    <DialogCustom
      title={title}
      onClose={hideDialog}
      width={1000}
      formProps={{
        className: 'm-20',
      }}
    >
      <div className='flex justify-center w-[97%]'>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreAutocomplete
              options={arrMonth}
              control={control}
              name='start'
              placeholder='Chọn năm tài chính'
              label='Năm tài chính'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreAutocomplete
              options={arrMonth}
              control={control}
              name='start'
              placeholder='Chọn tháng'
              label='Tháng'
            />
          </Grid>
        </Grid>
      </div>

      <div className='flex justify-center gap-10 py-17'>
        <CoreButton
          theme='cancel'
          onClick={() => {
            hideDialog()
          }}
        >
          Hủy
        </CoreButton>
        <CoreButton theme='submit' loading={false}>
          Đồng ý
        </CoreButton>
      </div>
    </DialogCustom>
  )
}

export default DialogSelectAllocation

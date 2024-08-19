import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { SaveTaxReturn } from '@/service/accounting/taxReturn/taxReturn/put/type'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'

export const TaxInfo = () => {
  const router = useRouter()
  const { id, actionType } = router.query

  const isView = actionType === 'VIEW'

  const { watch, setValue, control, trigger } = useFormContext<SaveTaxReturn>()

  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <CoreInput
          control={control}
          name='taxStaffName'
          label={'Họ và tên'}
          placeholder={'Nhập họ và tên'}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={4} lg={4}>
        <CoreInput
          control={control}
          name='signerName'
          label={'Người ký'}
          placeholder={'Nhập người ký'}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={4} lg={4}>
        <CoreInput
          control={control}
          name='numberCertificate'
          label={'Chứng chỉ hành nghề số'}
          placeholder={'Nhập mã chứng chỉ'}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={4} lg={4}>
        <CoreDatePicker
          control={control}
          name='signDate'
          title={'Ngày ký'}
          placeholder={'Chọn ngày ký'}
          trigger={trigger}
        />
      </Grid>
    </Grid>
  )
}

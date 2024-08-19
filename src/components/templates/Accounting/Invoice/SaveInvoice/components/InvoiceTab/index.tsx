import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import { InvoiceNumberFormType, paymentMethodSelect } from '@/enum'
import { AccountMoveDetail } from '@/service/accounting/accountMove/getDetail/type'
import { getPartnerList } from '@/service/common/partner/getListTiny'
import { BaseResponse } from '@/service/type'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query'
import InvoicePaymentInfo from '../InvoicePaymentInfo'
import useInvoiceTab from './useInvoiceTab'

const InvoiceTab = ({
  refetch,
  data,
}: {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<BaseResponse<AccountMoveDetail>, unknown>>
  data: BaseResponse<AccountMoveDetail> | undefined
}) => {
  const { t } = useTranslation('')

  const [values, handles] = useInvoiceTab()
  const {
    actionType,
    invoiceLinesTableData,
    control,
    isUpdate,
    invoiceColumns,
  } = values
  const { watch, setValue } = handles

  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <CoreInput
          control={control}
          name='codeInvoice'
          label='Số hóa đơn'
          placeholder='Nhập số hóa đơn'
          readOnly={watch('state') === 'POSTED'}
          inputProps={{ maxLength: 50 }}
          disabled={isUpdate}
          // required
          // rules={{
          //   required: t('common:validation.required'),
          // }}
        />
      </Grid>

      {/* <Grid item xs={12} sm={12} md={4} lg={4}>
        <CoreAutocomplete
          isViewProp={true}
          control={control}
          name='invoiceFormNumber'
          label='Mẫu số HĐ'
          inputProps={{ maxLength: 50 }}
          options={InvoiceNumberFormType}
          required
          rules={{
            required: t('common:validation.required'),
          }}
        />
      </Grid> */}

      <Grid item xs={12} sm={12} md={4} lg={4}>
        <CoreInput
          control={control}
          name='symbol'
          label='Ký hiệu'
          inputProps={{ maxLength: 50 }}
          required
          rules={{
            required: t('common:validation.required'),
          }}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={4} lg={4}>
        <CoreDatePicker
          control={control}
          name='invoiceDate'
          title='Ngày lập hóa đơn'
          placeholder='Chọn ngày'
          required
          format='YYYY-MM-DD'
          rules={{
            required: t('common:validation.required'),
          }}
          readOnly={watch('state') === 'POSTED'}
        />
      </Grid>

      {watch('moveType') === 'IN_INVOICE' ||
      watch('moveType') === 'IN_REFUND' ? (
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <CoreAutoCompleteAPI 
            isViewProp={true}
            control={control}
            name='partner'
            label='Nhà cung cấp'
            labelPath2='code'
            placeholder='Chọn nhà cung cấp'
            required
            fetchDataFn={getPartnerList}
            params={{
              isVendor: true,
              vendorActivated: true,
            }}
            rules={{
              required: t('common:validation.required'),
            }}
            readOnly={watch('state') === 'POSTED'}
          />
        </Grid>
      ) : (
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <CoreAutocomplete
            control={control}
            label='Hình thức thanh toán'
            placeholder='Chọn hình thức thanh toán'
            isViewProp={true}
            name='paymentMethod'
            options={paymentMethodSelect}
          />
        </Grid>
      )}

      <Grid item xs={12}>
        <div className='flex gap-1 items-center mt-5'>
          <Typography variant='h6'>Thông tin hàng hóa/dịch vụ</Typography>
        </div>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          marginBottom: '15px',
        }}
      >
        <CoreTable
          paginationHidden
          columns={invoiceColumns}
          data={invoiceLinesTableData}
          isShowColumnStt
        />
      </Grid>

      <InvoicePaymentInfo isUpdate={isUpdate} refetch={refetch} data={data} />
    </Grid>
  )
}

export default InvoiceTab

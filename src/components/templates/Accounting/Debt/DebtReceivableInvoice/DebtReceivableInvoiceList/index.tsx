import { CoreButton } from '@/components/atoms/CoreButton'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import PageContainer from '@/components/organism/PageContainer'
import { CustomTable } from '@/components/organism/TableCustom'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import useDebtReceivableInvoiceList from './useDebtReceivableInvoiceList'

const DebtReceivableInvoiceList = () => {
  const { t } = useTranslation('accounting/debt-receivable-invoice')
  const [values, handles] = useDebtReceivableInvoiceList()

  const {
    methodForm,
    columns,
    tableData,
    totalPages,
    size,
    page,
    isLoadingTable,
    isLoadingPartners,
    partnerSelect,
  } = values
  const { control } = methodForm

  const { onSubmit, onChangePageSize, onReset } = handles
  return (
    <PageContainer
      title={
        <div className='flex justify-between w-full'>
          <div className='flex flex-col justify-center'>
            <Typography variant='subtitle1'>{t('title')}</Typography>
          </div>
          <div></div>
        </div>
      }
    >
      <div className='flex flex-col'>
        <form onSubmit={onSubmit} className='flex flex-col mb-15'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name='search'
                label={t('common:form.search.label')}
                placeholder={t('common:form.search.placeholder')}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='start'
                title='Ngày lập chứng từ (từ)'
                placeholder='Chọn ngày'
                // format='YYYY-MM-DD'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='end'
                title='Ngày lập chứng từ (đến)'
                placeholder='Chọn ngày'
                //format='YYYY-MM-DD'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='account'
                label='Tài khoản'
                placeholder='Chọn tài khoản'
                //loading={isLoadingPartners}
                options={[
                  {
                    label: '331 - Tài khoản trả',
                    value: 'PAYABLE',
                  },
                  {
                    label: '131 - Tài khoản thu',
                    value: 'RECEIVE',
                  },
                ]}
              />
            </Grid>
          </Grid>

          <div className='flex justify-center mt-15'>
            <div className='m-5'>
              <CoreButton onClick={onReset} theme='reset'>
                Reset
              </CoreButton>
            </div>
            <div className='m-5'>
              <CoreButton theme='submit' type='submit'>
                {t('common:Search')}
              </CoreButton>
            </div>
          </div>
        </form>

        <CustomTable
          columns={columns}
          data={tableData}
          onChangePageSize={onChangePageSize}
          paginationHidden={tableData.length < 1}
          totalPages={totalPages}
          page={page}
          size={size}
          isLoading={isLoadingTable}
          isShowColumnStt
        />
      </div>
    </PageContainer>
  )
}

export default DebtReceivableInvoiceList

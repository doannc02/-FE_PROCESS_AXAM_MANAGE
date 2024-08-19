import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import PageContainer from '@/components/organism/PageContainer'
import { GREEN } from '@/helper/colors'
import { Grid, Typography } from '@mui/material'
import { BankReportTable } from './BankReportTable'
import useBankReport from './useBankReport'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { getBankOfCompanyList } from '@/service/common/company/getListBank'

const BankReport = () => {
  const [values, handles] = useBankReport()

  const {
    methodForm,
    columns,
    tableData,
    isLoadingListTable,
    isLoadingTotalTable,
    bankReportTotalData,
  } = values
  const { control } = methodForm

  const { t, onSubmit, onChangePageSize, onReset } = handles

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: 'Báo cáo quỹ ngân hàng',
            },
          ]}
        />
      }
    >
      <div className='flex flex-col'>
        <form onSubmit={onSubmit} className='flex flex-col py-10 px-5'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='start'
                title='Từ ngày'
                placeholder='Chọn ngày'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='end'
                title='Đến ngày'
                placeholder='Chọn ngày'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name='bankAccount'
                labelPath='accountNumber'
                labelPath2='bank'
                fetchDataFn={getBankOfCompanyList}
                placeholder='Chọn ngân hàng'
                label={'Số tài khoản ngân hàng'}
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

        {bankReportTotalData?.data && (
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <div className='flex items-center gap-3'>
                <Typography variant='subtitle1'>{t('openAmount')}:</Typography>
                <CurrencyFormatCustom
                  variant='subtitle1'
                  color={GREEN}
                  amount={bankReportTotalData?.data.openAmount}
                  showCurrencyName
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <div className='flex items-center gap-3'>
                <Typography variant='subtitle1'>{t('ariseAmount')}:</Typography>
                <CurrencyFormatCustom
                  variant='subtitle1'
                  color={GREEN}
                  amount={bankReportTotalData?.data.ariseAmount}
                  showCurrencyName
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <div className='flex items-center gap-3'>
                <Typography variant='subtitle1'>{t('finalAmount')}:</Typography>
                <CurrencyFormatCustom
                  variant='subtitle1'
                  color={GREEN}
                  amount={bankReportTotalData?.data?.finalAmount ?? 0}
                  showCurrencyName
                />
              </div>
            </Grid>
          </Grid>
        )}

        <BankReportTable
          className='mt-10'
          columns={columns}
          data={tableData}
          onChangePageSize={onChangePageSize}
          paginationHidden={tableData.length < 1}
          isLoading={isLoadingTotalTable || isLoadingListTable}
          totalReport={tableData.length > 0 ? bankReportTotalData?.data : null}
        />
      </div>
    </PageContainer>
  )
}

export default BankReport

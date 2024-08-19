import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { TableDebt } from './TableDebt'
import useDebtPayableDetail from './useDebtPayableDetail'

const DebtPayableDetail = () => {
  const { t } = useTranslation('accounting/debt-payable')
  const [values, handles] = useDebtPayableDetail()

  const {
    id,
    partner,
    methodForm,
    columns,
    tableData,
    totalPages,
    size,
    page,
    isLoadingTable,
    isLoadingGetTotalDebt,
    totalDebt,
  } = values
  const { control } = methodForm

  const { onSubmit, onChangePageSize, onReset } = handles
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: t('title'),
              pathname: MENU_URL.DEBT.PAYABLE,
            },
            {
              title: partner ?? 'Chi Tiết Công Nợ Phải Thu',
            },
          ]}
        />
      }
    >
      {id && (
        <div className='flex flex-col' key='detail'>
          <form onSubmit={onSubmit} className='flex flex-col py-10 px-5'>
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <CoreDatePicker
                  control={control}
                  name='start'
                  title='Từ ngày'
                  placeholder='Chọn ngày'
                  format='YYYY-MM-DD'
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <CoreDatePicker
                  control={control}
                  name='end'
                  title='Đến ngày'
                  placeholder='Chọn ngày'
                  format='YYYY-MM-DD'
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

          <TableDebt
            columns={columns}
            data={tableData}
            onChangePageSize={onChangePageSize}
            paginationHidden={tableData.length < 1}
            totalPages={totalPages}
            page={page}
            size={size}
            isLoading={isLoadingTable}
            isShowColumnStt
            totalDebt={totalDebt}
          />
        </div>
      )}
    </PageContainer>
  )
}

export default DebtPayableDetail

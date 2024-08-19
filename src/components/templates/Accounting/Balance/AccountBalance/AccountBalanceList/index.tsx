import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { getAccountList } from '@/service/accounting/account/getList'
import { getCurrencyOfCompany } from '@/service/common/company/getListCurrency'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { BalanceTotal } from './BalanceTotal'
import useAccountBalance from './useAccountBalance'

const AccountBalance = () => {
  const { t } = useTranslation('accounting/account-balance')

  const [values, handles] = useAccountBalance()

  const {
    queryPage,
    methodForm,
    columns,
    tableData,
    totalPages,
    size,
    page,
    isLoadingTable,
    totalData,
  } = values
  const { control } = methodForm
  const router = useRouter()

  const { onSubmit, onChangePageSize, onReset } = handles
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: t('title'),
            },
          ]}
        />
      }
    >
      <div className='flex flex-col'>
        <form onSubmit={onSubmit} className='flex flex-col py-10 px-5'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreAutoCompleteAPI
                control={control}
                name='account'
                label='Số tài khoản'
                labelPath2='code'
                placeholder='Chọn số tài khoản'
                fetchDataFn={getAccountList}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreAutoCompleteAPI
                control={control}
                name='currency'
                label='Tiền tệ'
                placeholder='Chọn tiền tệ'
                fetchDataFn={getCurrencyOfCompany}
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

        <div className='py-4 flex justify-end gap-4 items-center'>
          <CoreButton
            onClick={() => {
              router.push(`${MENU_URL.BALANCE.ACCOUNT_BALANCE}/addNew`)
            }}
            theme='submit'
          >
            {t('common:btn.add')}
          </CoreButton>
        </div>

        <CoreTable
          tableName='accBalanceLst'
          className='mt-5'
          columns={columns}
          data={tableData}
          onChangePageSize={onChangePageSize}
          paginationHidden={tableData.length < 1}
          totalPages={totalPages}
          page={page}
          size={size}
          isLoading={isLoadingTable}
          isShowColumnStt
          actionTable={
            totalData && tableData.length > 0 ? (
              <BalanceTotal
                isFlag={!!queryPage?.currency}
                creditTotal={totalData.totalCredit}
                debitTotal={totalData.totalDebit}
                totalSourceDebit={totalData.totalSourceDebit}
                totalSourceCredit={totalData.totalSourceCredit}
              />
            ) : null
          }
        />
      </div>
    </PageContainer>
  )
}

export default AccountBalance

import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { GREEN, ORANGE } from '@/helper/colors'
import { MENU_URL } from '@/routes'
import { getAccountList } from '@/service/accounting/account/getList'
import { exportBankBalanceFile } from '@/service/accounting/accountMoveLine/importFile/exportBankBalanceFile'
import { importBankBalanceFile } from '@/service/accounting/accountMoveLine/importFile/importBankBalanceFile'
import { getCurrencyOfCompany } from '@/service/common/company/getListCurrency'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { DialogImportFile } from '../../../Dialog/DialogImportFile'
import { DialogImportHistoryBankBalance } from '../../DialogImportHistoryBankBalance'
import { BalanceTotal } from './BalanceTotal'
import useBankBalanceList from './useBankBalanceList'

const BankBalanceList = () => {
  const { t } = useTranslation('accounting/bank-balance')

  const [values, handles] = useBankBalanceList()

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
  const { showDialog } = useDialog()

  const { onSubmit, onChangePageSize, onReset, refetch } = handles
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
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name='searchBankAccount'
                label='Tìm kiếm theo STK'
                placeholder={t('common:form.search.placeholder')}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name='account'
                label='Số tài khoản'
                placeholder='Chọn số tài khoản'
                params={{}}
                labelPath2='code'
                fetchDataFn={getAccountList}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
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

        <div className='flex justify-between items-center'>
          <div></div>
          <div className='flex  mt-10 gap-8'>
            <div
              className='flex items-center cursor-pointer'
              onClick={() => showDialog(<DialogImportHistoryBankBalance />)}
            >
              <Action actionList={['history']} />
              <Typography
                variant='body1'
                style={{
                  color: ORANGE,
                }}
              >
                Lịch sử import
              </Typography>
            </div>

            <div
              className='flex items-center cursor-pointer'
              onClick={() =>
                showDialog(
                  <DialogImportFile
                    fetchDataExport={exportBankBalanceFile}
                    fetchDataImport={importBankBalanceFile}
                    refetch={refetch}
                    label='Update danh sách số dư tài khoản ngân hàng'
                  />
                )
              }
            >
              <Action actionList={['export']} />
              <Typography
                variant='body1'
                style={{
                  color: GREEN,
                }}
              >
                Nhập file excel
              </Typography>
            </div>
            <div className='py-4 flex justify-end gap-4 items-center'>
              <CoreButton
                onClick={() => {
                  router.push(`${MENU_URL.BALANCE.BANK_BALANCE}/addNew`)
                }}
                theme='submit'
              >
                {t('common:btn.add')}
              </CoreButton>
            </div>
          </div>
        </div>

        <CoreTable
          tableName='bankBalanceLst'
          columns={columns}
          data={tableData}
          onChangePageSize={onChangePageSize}
          paginationHidden={tableData.length < 1}
          totalPages={totalPages}
          page={page}
          size={size}
          isLoading={isLoadingTable}
          isShowColumnStt
          onRowClick={(id: number) => {
            router.push({
              pathname: `${MENU_URL.BALANCE.BANK_BALANCE}/[id]`,
              query: {
                id,
                actionType: 'VIEW',
              },
            })
          }}
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

export default BankBalanceList

import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { GREEN, ORANGE } from '@/helper/colors'
import { useCheckPath } from '@/path'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { getExCusDeclareBalanceDetail } from '@/service/accounting/accountMoveLineCusImport/getExCusDeclareBalDetail'
import { importDeclareBalanceApi } from '@/service/accounting/accountMoveLineCusImport/saveImpDeclareBalance'
import { getExVenDeclareBalanceDetail } from '@/service/accounting/accountMoveLineVenderImport/getVendorBalanceExport'
import { importVendorDeclareBalanceApi } from '@/service/accounting/accountMoveLineVenderImport/saveVendorBalanceImport'
import { getBranchList } from '@/service/common/branch/getList'
import { getCurrencyOfCompany } from '@/service/common/company/getListCurrency'
import { getPartnerList } from '@/service/common/partner/getListTiny'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { DialogImportFile } from '../../../Dialog/DialogImportFile'
import DialogViewHisImport from '../../../Dialog/DialogViewHistoryImport'
import { BalanceTotal } from './BalanceTotal'
import useCustomerDebtBalanceList from './useCOPBalanceList'
import { balanceType } from '@/enum'

const COPBalanceList = () => {
  const { t } = useTranslation('accounting/cop-balance')

  const { showDialog } = useDialog()

  const [values, handles] = useCustomerDebtBalanceList()

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
  const { control, watch, setValue } = methodForm
  const router = useRouter()
  const { balanceTypePath } = useCheckPath()
  const idBranch = useAppSelector((state) => state.branchData.id)
  const { id: companyId } = useAppSelector((state) => state.companyConfigData)
  const { onSubmit, onChangePageSize, onReset, refetch } = handles

  const getPartnerByType = (type?: string | null) => {
    return type === 'INTERNAL' ? getBranchList : getPartnerList
  }

  const type = watch('type')
  const paramPartner = () => {
    return type === 'INTERNAL'
      ? {
          activated: true,
          isDefaultCompany: true,
          page: 0,
          size: 20,
          branchNowId: idBranch ?? companyId,
        }
      : balanceTypePath === 'CUSTOMER'
      ? { isCustomer: true }
      : {
          isVendor: true,
        }
  }

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title:
                balanceTypePath === 'CUSTOMER'
                  ? t('title_customer')
                  : t('title_provider'),
            },
          ]}
        />
      }
    >
      <div className='flex flex-col'>
        <form onSubmit={onSubmit} className='flex flex-col py-10 px-5'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='type'
                label='Loại đối tác'
                options={balanceType}
                onChangeValue={(val) => setValue('partner', null)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name='partner'
                label={'Đối tác'}
                placeholder='Chọn đối tác'
                fetchDataFn={getPartnerByType(type)}
                params={{
                  ...paramPartner(),
                }}
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

          <div className='flex justify-center mt-10'>
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

        <div className='flex justify-between items-center mt-5'>
          <div></div>
          <div className='flex  mt-10 gap-8'>
            <div
              className='flex items-center cursor-pointer'
              onClick={() => {
                showDialog(
                  <DialogViewHisImport
                    isCustomer={balanceTypePath === 'CUSTOMER' ? true : false}
                  />
                )
              }}
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
            {/* <div
              className='flex items-center cursor-pointer'
              onClick={() => {}}
            >
              <Action actionList={['export']} />
              <Typography
                variant='body1'
                style={{
                  color: GREEN,
                }}
              >
                Xuất file excel
              </Typography>
            </div> */}
            <div
              className='flex items-center cursor-pointer'
              onClick={() => {
                balanceTypePath === 'CUSTOMER'
                  ? showDialog(
                      <DialogImportFile
                        fetchDataExport={getExCusDeclareBalanceDetail}
                        fetchDataImport={importDeclareBalanceApi}
                        refetch={refetch}
                        label='Update danh sách số công nợ khách hàng'
                      />
                    )
                  : showDialog(
                      <DialogImportFile
                        fetchDataExport={getExVenDeclareBalanceDetail}
                        fetchDataImport={importVendorDeclareBalanceApi}
                        refetch={refetch}
                        label='Update danh sách số công nợ nhà cung cấp'
                      />
                    )
              }}
            >
              <Action actionList={['import']} />
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
                  router.push(`${MENU_URL.BALANCE[balanceTypePath]}/addNew`)
                }}
                theme='submit'
              >
                {t('common:btn.add')}
              </CoreButton>
            </div>
          </div>
        </div>

        <CoreTable
          tableName='COPBalanceLst'
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
              pathname: `${MENU_URL.BALANCE[balanceTypePath]}/[id]`,
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

export default COPBalanceList

import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import CoreInput from '@/components/atoms/CoreInput'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { commonCostAllocationMethod, methodCalculatingCost } from '@/enum'
import { getAccountList } from '@/service/accounting/account/getList'
import { getAccountJournalList } from '@/service/accounting/accountJournal/getList'
import { getTaxList } from '@/service/accounting/tax/getList'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { v4 as uuidV4 } from 'uuid'
import MyCollapse from './MyCollapse'
import useAccountConfig from './useAccountConfig'
import { TopAction } from '@/components/molecules/TopAction'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogHistoryAccConfig } from './HistoryFiscalYear/DilogHisFiscalYear'
import { MENU_URL } from '@/routes'
import CoreLoading from '@/components/molecules/CoreLoading'
import { getAccountTypeList } from '@/service/accounting/accountType/getList'

const AccountConfig = () => {
  const { t } = useTranslation('accounting/account-config')
  const [values, handles] = useAccountConfig()
  const { showDialog } = useDialog()
  const {
    id_history,
    isLoadingHisFiscal,
    numberOfHis,
    methodForm,
    isLoadingSubmit,
  } = values
  const { control } = methodForm
  const { onSubmit, onCancel, setValue, watch } = handles
  console.log(!!id_history, id_history, 'id_his')
  return (
    <PageWithDetail
      title={
        <div className='flex justify-between w-full'>
          <CoreBreadcrumbs
            isShowDashboard
            breadcrumbs={[
              {
                title: <Typography>{t('title')}</Typography>,
                pathname: MENU_URL.CONFIG.ACCOUNT_CONFIG,
              },
              ...(!!id_history
                ? [
                    {
                      title: 'Lịch sử năm tài chính' + ` ${numberOfHis}`,
                    },
                  ]
                : []),
            ]}
          />
        </div>
      }
      topAction={
        <TopAction
          actionList={[...(!!id_history ? [] : ['history'])] as any}
          onHistoryAction={() => {
            showDialog(<DialogHistoryAccConfig />)
          }}
        />
      }
    >
      {!!id_history && isLoadingHisFiscal ? (
        <CoreLoading />
      ) : (
        <form onSubmit={onSubmit} className='flex flex-col'>
          <MyCollapse title='Sổ kế toán'>
            <Grid
              container
              spacing={{ xs: 1, sm: 2, md: 3 }}
              style={{
                padding: '30px',
              }}
            >
              <Grid item xs={12}>
                <Typography variant='subtitle1'>
                  Sổ kế toán mặc định:
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  name='saleDefaultJournal'
                  placeholder='Chọn sổ'
                  label='Sổ kế toán bán hàng'
                  fetchDataFn={getAccountJournalList}
                  params={{
                    type: 'SALE',
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  name='purchaseDefaultJournal'
                  placeholder='Chọn sổ'
                  label='Sổ kế toán mua hàng'
                  fetchDataFn={getAccountJournalList}
                  params={{
                    type: 'PURCHASE',
                  }}
                />
              </Grid>
            </Grid>
          </MyCollapse>

          <MyCollapse title='Các tài khoản mặc định'>
            <Grid
              container
              spacing={{ xs: 1, sm: 2, md: 3 }}
              style={{
                padding: '30px',
              }}
            >
              <Grid item xs={12}>
                <Typography variant='subtitle1'>Gửi giảm giá trong:</Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  name='discountLossAccount'
                  label='Giảm giá tiền mặt lỗ'
                  placeholder='Chọn tài khoản'
                  labelPath2='code'
                  fetchDataFn={getAccountList}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='subtitle1'>
                  Tài khoản phải thu chi
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  name='receivableAccount'
                  label='Tài khoản ghi nhận doanh thu bán hàng'
                  placeholder='Chọn tài khoản ghi nhận doanh thu bán hàng'
                  labelPath2='code'
                  fetchDataFn={getAccountList}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  name='payableAccount'
                  label='Tài khoản ghi nhận chi phí mua hàng'
                  placeholder='Chọn tài khoản'
                  labelPath2='code'
                  fetchDataFn={getAccountList}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='subtitle1'>
                  Tài khoản phải thu chi cho nội bộ
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  name='receivableInternalAccount'
                  label='Tài khoản ghi nhận doanh thu bán hàng nội bộ'
                  placeholder='Chọn tài khoản'
                  labelPath2='code'
                  params={{
                    type: 'INTERNAL',
                  }}
                  fetchDataFn={getAccountList}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  name='payableInternalAccount'
                  label='Tài khoản ghi nhận chi phí mua hàng nội bộ'
                  placeholder='Chọn tài khoản'
                  labelPath2='code'
                  params={{
                    type: 'INTERNAL',
                  }}
                  fetchDataFn={getAccountList}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='subtitle1'>
                  Tài khoản theo dõi công nợ khách hàng
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  multiple
                  name='customerDebtAccountTypes'
                  label='Loại tài khoản theo dõi công nợ khách hàng'
                  placeholder='Chọn tài khoản'
                  labelPath2='code'
                  params={{}}
                  fetchDataFn={getAccountTypeList}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='subtitle1'>
                  Tài khoản theo dõi công nợ nhà cung cấp
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  multiple
                  name='vendorDebtAccountTypes'
                  label='Loại tài khoản theo dõi công nợ nhà cung cấp'
                  placeholder='Chọn tài khoản'
                  labelPath2='code'
                  params={{}}
                  fetchDataFn={getAccountTypeList}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='subtitle1'>
                  Tài khoản theo dõi công nợ nội bộ
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  multiple
                  name='internalReceiveAccountTypes'
                  label='Loại tài khoản theo dõi công nợ phải thu nội bộ'
                  placeholder='Chọn tài khoản'
                  labelPath2='code'
                  params={{}}
                  fetchDataFn={getAccountTypeList}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  multiple
                  name='internalPayableDebtAccountTypes'
                  label='Loại tài khoản theo dõi công nợ phải trả nội bộ'
                  placeholder='Chọn tài khoản'
                  labelPath2='code'
                  params={{}}
                  fetchDataFn={getAccountTypeList}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='subtitle1'>
                  Tài khoản theo dõi công nợ nhân viên
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  multiple
                  name='staffReceiveAccountTypes'
                  label='Loại tài khoản theo dõi công nợ phải thu nhân viên'
                  placeholder='Chọn loại tài khoản'
                  labelPath2='code'
                  params={{}}
                  fetchDataFn={getAccountTypeList}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  multiple
                  name='staffPayableAccountTypes'
                  label='Loại tài khoản theo dõi công nợ phải trả nhân viên'
                  placeholder='Chọn loại tài khoản'
                  labelPath2='code'
                  params={{}}
                  fetchDataFn={getAccountTypeList}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='subtitle1'>
                  Tài khoản ghi nhận chi phí
                </Typography>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  multiple
                  name='recordAllocatedCostAccountTypes'
                  label='Loại tài khoản ghi nhận chi phí phân bổ'
                  placeholder='Chọn loại tài khoản'
                  labelPath2='code'
                  params={{}}
                  fetchDataFn={getAccountTypeList}
                />
              </Grid> */}
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  multiple
                  name='recordGeneralExpensesAccountTypes'
                  label='Loại tài khoản ghi nhận chi phí chung'
                  placeholder='Chọn loại tài khoản'
                  labelPath2='code'
                  params={{}}
                  fetchDataFn={getAccountTypeList}
                />
              </Grid>
            </Grid>
          </MyCollapse>

          <MyCollapse title='Chi phí'>
            {/* <Grid item xs={12}>
              <Typography variant='subtitle1'>Chi phí chung</Typography>
            </Grid> */}

            <Grid
              container
              spacing={{ xs: 1, sm: 2, md: 3 }}
              style={{
                padding: '30px',
              }}
            >
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  multiple
                  name='materialCostAccountTypes'
                  label='Chi phí NVL'
                  placeholder='Chọn loại tài khoản'
                  labelPath2='code'
                  params={{}}
                  fetchDataFn={getAccountTypeList}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  multiple
                  name='salaryCostAccountTypes'
                  label='Chi phí lương'
                  placeholder='Chọn loại tài khoản'
                  labelPath2='code'
                  params={{}}
                  fetchDataFn={getAccountTypeList}
                />
              </Grid>
            </Grid>
          </MyCollapse>

          <MyCollapse title='Tài sản cố định'>
            <Grid
              container
              spacing={{ xs: 1, sm: 2, md: 3 }}
              style={{
                padding: '30px',
              }}
            >
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  name='depreciationExpensesAccount'
                  label='Tài khoản ghi nhận chi phí khấu hao'
                  placeholder='Chọn tài khoản'
                  labelPath2='code'
                  fetchDataFn={getAccountList}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  name='incomeDecreaseAssetAccount'
                  label='Tài khoản ghi nhận thu thập khi ghi giảm TSCD'
                  placeholder='Chọn tài khoản'
                  labelPath2='code'
                  fetchDataFn={getAccountList}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  name='expenseDecreaseAssetAccount'
                  label='Tài khoản ghi nhận chi phí khi ghi giảm TSCĐ'
                  placeholder='Chọn tài khoản'
                  labelPath2='code'
                  fetchDataFn={getAccountList}
                />
              </Grid>
            </Grid>
          </MyCollapse>

          <MyCollapse title='Công cụ dụng cụ'>
            <Grid
              container
              spacing={{ xs: 1, sm: 2, md: 3 }}
              style={{
                padding: '30px',
              }}
            >
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  name='waitingAllocation'
                  label='Tài khoản chờ phân bổ'
                  placeholder='Chọn tài kho ản'
                  labelPath2='code'
                  fetchDataFn={getAccountList}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  name='recordAllocatedCostAccountTypes'
                  label='Tài khoản ghi nhận chi phí phân bổ'
                  placeholder='Chọn tài khoản'
                  labelPath2='code'
                  params={{}}
                  multiple
                  fetchDataFn={getAccountTypeList}
                />
              </Grid>
            </Grid>
          </MyCollapse>

          <MyCollapse title='Kế toán thuế'>
            <Grid
              container
              spacing={{ xs: 1, sm: 2, md: 3 }}
              style={{
                padding: '30px',
              }}
            >
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  multiple
                  control={control}
                  name='vatTaxes'
                  label='Thuế GTGT sử dụng trong tờ khai thuế'
                  placeholder='Chọn thuế'
                  // labelPath2='code'
                  fetchDataFn={getTaxList}
                  params={{
                    type: 'VAT_RATES',
                  }}
                />
              </Grid>
            </Grid>
          </MyCollapse>

          <MyCollapse title='Hình thức hạch toán cho chi nhánh'>
            <Grid
              container
              spacing={{ xs: 1, sm: 2, md: 3 }}
              style={{
                padding: '30px',
              }}
            >
              {(watch('branchAccounting') ?? []).length > 0 ? (
                (watch('branchAccounting') ?? []).map((item, index) => {
                  return (
                    <Grid
                      key={uuidV4()}
                      container
                      spacing={{ xs: 1, sm: 2, md: 3 }}
                      style={{
                        padding: '30px',
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        style={{
                          marginTop: '12px',
                        }}
                      >
                        <CoreInput
                          control={control}
                          name={`branchAccounting.${index}.branch.name`}
                          label='Tên chi nhánh'
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        style={{
                          marginTop: '12px',
                        }}
                      >
                        <CoreAutocomplete
                          label='Hình thức hạch toán'
                          control={control}
                          name={`branchAccounting.${index}.accountingForm`}
                          options={[
                            { label: 'Phụ thuộc', value: 'DEPENDENCE' },
                            { label: 'Độc lập', value: 'INDEPENDENCE' },
                          ]}
                        />
                      </Grid>
                    </Grid>
                  )
                })
              ) : (
                <>Chưa có chi nhánh nào</>
              )}
            </Grid>
          </MyCollapse>

          <MyCollapse title='Giá thành sản xuất'>
            <Grid
              container
              spacing={{ xs: 1, sm: 2, md: 3 }}
              style={{
                padding: '30px',
              }}
            >
              <Grid item xs={12}>
                <Typography variant='subtitle1'>
                  Các phương pháp tính giá thành có thể áp dụng trong 1 kỳ tính
                  giá:
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={2}>
                <CoreCheckbox
                  control={control}
                  label='Sản xuất giản đơn'
                  name='isSimpleProduction'
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={2}>
                <CoreCheckbox
                  control={control}
                  label='Sản xuất theo hệ số, tỷ lệ'
                  name='isCoefficientsRatiosProduction'
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={2}>
                <CoreCheckbox
                  control={control}
                  label='Sản xuất phân bước'
                  name='isStepStoolProduction'
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={2}>
                <CoreCheckbox
                  control={control}
                  label='Đơn hàng'
                  name='isSaleOrder'
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={2}>
                <CoreCheckbox
                  control={control}
                  label='Hợp đồng'
                  name='isContract'
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='subtitle1'>
                  Phương pháp phân bổ chi phí chung:
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutocomplete
                  control={control}
                  name='commonCostAllocationMethod'
                  label='Phương pháp phân bổ chi phí chung'
                  placeholder='Chọn phương pháp'
                  options={commonCostAllocationMethod}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}></Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}></Grid>

              <Grid item xs={12}>
                <Typography variant='subtitle1'>
                  Phương pháp tính tỷ lệ phân bổ giá thành:
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutocomplete
                  control={control}
                  name='methodCalculatingCost'
                  label='Phương pháp tính tỉ lệ phân bổ giá thành'
                  placeholder='Chọn phương pháp'
                  options={methodCalculatingCost}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}></Grid>
            </Grid>
          </MyCollapse>

          {!id_history && (
            <div className='space-x-12 text-center mt-10'>
              <CoreButton theme='cancel' onClick={onCancel}>
                {t('common:btn.cancel')}
              </CoreButton>
              <CoreButton
                theme='submit'
                type='submit'
                loading={isLoadingSubmit}
              >
                {t('common:btn.save_change')}
              </CoreButton>
            </div>
          )}
        </form>
      )}
    </PageWithDetail>
  )
}

export default AccountConfig

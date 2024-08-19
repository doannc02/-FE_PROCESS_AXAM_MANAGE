import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { balanceType, typeDebtReceivable } from '@/enum'
import { useAppSelector } from '@/redux/hook'
import { getBranchList } from '@/service/common/branch/getList'
import { getEmployeeList } from '@/service/common/employee/getList'
import { getPartnerList } from '@/service/common/partner/getListTiny'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { TableDebt } from './TableDebt'
import useDebtReceivableList from './useDebtReceivableList'
import { getAccountList } from '@/service/accounting/account/getList'

const typeDebtHash = [
  { type: 'EXTERNAL' },
  { type: 'BANK' },
  { type: 'STAFF' },
  { type: 'INTERNAL' },
] as { type: 'EXTERNAL' | 'EXTERNAL' | 'BANK' | 'STAFF' }[]

const DebtReceivableList = () => {
  const { t } = useTranslation('accounting/debt-receivable')
  const [values, handles] = useDebtReceivableList()
  const router = useRouter()

  const {
    typeDebt,
    dataExternal,
    dataNormal,
    queryPage,
    methodForm,
    columns,
    idLedger,
    tableData,
    totalPages,
    size,
    page,
    isLoadingTable,
    isLoadingGetTotalDebt,
    totalDebt,
  } = values
  const { control } = methodForm
  const { onSubmit, onChangePageSize, onReset, watch, setValue, setQueryPage } =
    handles
  const fnCkQueryPartner = watch('type')
  const { id: idBranch } = useAppSelector((state) => state.branchData)
  const { id: companyId } = useAppSelector((state) => state.companyConfigData)

  const [tabNumber, onSetTabNumber] = useState(0)

  const setTabNumber = useCallback(
    (tabNumb: number) => {
      console.log('loga', tabNumb)

      const type2 = {
        0: 'EXTERNAL',
        1: 'BANK',
        2: 'STAFF',
        3: 'INTERNAL',
      }
      setValue('typeQueryTab', type2[tabNumber as 0 | 1 | 2 | 3])
      setQueryPage({
        ...queryPage,
        tabNumber: tabNumb,
        type:
          watch('typeQueryTab') === 'EXTERNAL'
            ? null
            : type2[tabNumber as 0 | 1 | 2 | 3] === 'BANK'
            ? 'EXTERNAL'
            : type2[tabNumber as 0 | 1 | 2 | 3],
        typeQueryTab: type2[tabNumber as 0 | 1 | 2 | 3],
      })
    },
    [queryPage, setQueryPage, setValue, tabNumber, watch]
  )

  const breadcrumbs = useMemo(() => {
    return typeDebtHash.map((item, index) => {
      return {
        checkChangeToTabFn: () => {
          setValue('typeQueryTab', item.type)
          setQueryPage({
            ...queryPage,
            tabNumber: index,
            type:
              watch('typeQueryTab') === 'EXTERNAL'
                ? null
                : item.type === 'BANK'
                ? 'EXTERNAL'
                : item.type,
            typeQueryTab: item.type,
          })
        },
        tabNumber: queryPage.tabNumber,
        title: typeDebtReceivable[item.type],
        content: (
          <TableDebt
            setTabNumber={setTabNumber}
            index={index}
            columns={[
              ...(watch('typeQueryTab') === 'EXTERNAL'
                ? ([
                    {
                      fieldName: 'type',
                    },
                  ] as any)
                : []),
              ...(watch('typeQueryTab') !== 'EXTERNAL'
                ? ([
                    {
                      fieldName: 'staffName',
                    },
                    {
                      fieldName: 'staffCode',
                    },
                  ] as any)
                : []),
              ...columns,
            ]}
            data={
              queryPage?.tabNumber === 0
                ? dataExternal?.data?.content ?? []
                : dataNormal?.data?.content ?? []
            }
            onChangePageSize={onChangePageSize}
            paginationHidden={
              (queryPage?.tabNumber === 0
                ? dataExternal?.data?.content ?? []
                : dataNormal?.data?.content ?? []
              ).length < 1
            }
            totalPages={totalPages}
            page={page}
            size={size}
            isLoading={isLoadingTable}
            isShowColumnStt
            totalDebt={
              (
                queryPage?.tabNumber === 0
                  ? dataExternal?.data?.content ?? []
                  : dataNormal?.data?.content ?? []
              )
                ? totalDebt
                : null
            }
            paramsDetailDebts={{
              start: queryPage.start,
              end: queryPage.end,
              accountLedgerId: idLedger,
              type: queryPage.type,
            }}
          />
        ),
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    watch('type'),
    isLoadingTable,
    queryPage.typeQueryTab,
    isLoadingGetTotalDebt,
    dataExternal?.data?.content,
    dataNormal?.data?.content,
    tabNumber,
  ])

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title:
                typeDebt === 'PAYABLE'
                  ? 'Công nợ phải trả'
                  : 'Công nợ phải thu',
            },
          ]}
        />
      }
    >
      <div className='flex flex-col' key='list'>
        <FormProvider {...methodForm}>
          <form onSubmit={onSubmit} className='flex flex-col py-10 px-5'>
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                {queryPage.tabNumber === 0 ? (
                  <CoreAutocomplete
                    control={control}
                    name='type'
                    label='Loại đối tượng'
                    placeholder='Chọn loại đối tượng'
                    disableClearable
                    options={balanceType}
                    onChangeValue={(val) => {
                      if (val) {
                        setValue('partner', null)
                      }
                    }}
                  />
                ) : (
                  <CoreAutoCompleteAPI
                    control={control}
                    name='partner'
                    label={
                      queryPage.tabNumber === 1
                        ? 'Khách hàng'
                        : queryPage.tabNumber === 2
                        ? 'Nhân viên'
                        : 'TK nội bộ'
                    }
                    placeholder={
                      queryPage.tabNumber === 1
                        ? 'Chọn khách hàng'
                        : queryPage.tabNumber === 2
                        ? 'Chọn nhân viên'
                        : 'Chọn tài khoản nội bộ'
                    }
                    labelPath2='code'
                    fetchDataFn={
                      fnCkQueryPartner === 'EXTERNAL'
                        ? getPartnerList
                        : fnCkQueryPartner === 'STAFF'
                        ? getEmployeeList
                        : getBranchList
                    }
                    params={{
                      ...(watch('type') === 'EXTERNAL'
                        ? { isCustomer: true, activated: true }
                        : watch('type') === 'STAFF'
                        ? {
                            activated: true,
                          }
                        : {
                            isDefaultCompany: true,
                            activated: true,
                            branchNowId: idBranch ?? companyId,
                          }),
                    }}
                  />
                )}
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreDatePicker
                  control={control}
                  name='start'
                  title='Từ ngày'
                  placeholder='Chọn ngày'
                  format='YYYY-MM-DD'
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreDatePicker
                  control={control}
                  name='end'
                  title='Đến ngày'
                  placeholder='Chọn ngày'
                  format='YYYY-MM-DD'
                />
              </Grid>

              {tabNumber === 0 && (
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <CoreAutoCompleteAPI
                    control={control}
                    name='account'
                    label='TK công nợ'
                    labelPath2='code'
                    placeholder='Chọn TK công nợ'
                    params={{}}
                    fetchDataFn={getAccountList}
                  />
                </Grid>
              )}
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
          <CoreNavbar
            tabNumber={queryPage.tabNumber}
            isNotPaddingContent
            breadcrumbs={breadcrumbs}
          />
        </FormProvider>
      </div>
    </PageContainer>
  )
}

export default DebtReceivableList

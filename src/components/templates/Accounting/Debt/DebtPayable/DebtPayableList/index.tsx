import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { getPartnerList } from '@/service/common/partner/getListTiny'
import { Dashboard } from '@mui/icons-material'
import { Grid, IconButton, Typography } from '@mui/material'
import { UserIcon } from 'lucide-react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { TableDebt } from './TableDebt'
import useDebtPayableList from './useDebtPayableList'
import { balanceType } from '@/enum'

const DebtPayableList = () => {
  const { t } = useTranslation('accounting/debt-payable')
  const [values, handles] = useDebtPayableList()
  const router = useRouter()

  const {
    queryPage,
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
            },
          ]}
        />
      }
    >
      <div className='flex flex-col' key='list'>
        <form onSubmit={onSubmit} className='flex flex-col py-10 px-5'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                fullWidth
                control={control}
                name='type'
                label='Loại đối tượng'
                placeholder='Chọn loại đối tượng'
                disableClearable
                options={balanceType}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name='vendor'
                label='Nhà cung cấp'
                placeholder='Chọn nhà cung cấp'
                labelPath2='code'
                fetchDataFn={getPartnerList}
                params={{
                  isVendor: true,
                }}
              />
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
          totalDebt={tableData.length > 0 ? totalDebt : null}
          onRowClick={(id: number, row: any) => {
            router.push({
              pathname: `${MENU_URL.DEBT.PAYABLE}/[id]`,
              query: {
                id,
                start: queryPage?.start,
                end: queryPage?.end,
                partner: row.partner,
                type: row.type,
              },
            })
          }}
        />
      </div>
    </PageContainer>
  )
}

export default DebtPayableList

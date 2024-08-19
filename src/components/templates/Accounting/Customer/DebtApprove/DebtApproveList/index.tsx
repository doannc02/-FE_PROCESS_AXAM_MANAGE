import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { statusPolicyType } from '@/enum'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import DialogViewPolicy from '../DialogViewPolicy'
import useDebtPolicyList from './useDebtApproveList'

const DebtApproveList = () => {
  const { t } = useTranslation('accounting/debt-approve')
  const [values, handles] = useDebtPolicyList()

  const {
    methodForm,
    columns,
    tableData,
    totalPages,
    size,
    page,
    isLoadingTable,
  } = values
  const { control } = methodForm

  const { onSubmit, onChangePageSize, onReset, refetch } = handles
  const { showDialog } = useDialog()

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
                name='search'
                label={t('common:form.search.label')}
                placeholder={t('common:form.search.placeholder')}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='timeApplyPolicy'
                title='Thời gian bắt đầu chính sách'
                placeholder='Chọn ngày'
                format='YYYY-MM-DD'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='statusPolicy'
                label='Trạng thái'
                placeholder='Chọn trạng thái'
                options={statusPolicyType}
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

        <CoreTable
          tableName='debtApproveList'
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
            showDialog(<DialogViewPolicy id={id} refetch={refetch} />)
          }}
        />
      </div>
    </PageContainer>
  )
}

export default DebtApproveList

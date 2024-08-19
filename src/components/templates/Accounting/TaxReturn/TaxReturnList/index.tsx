import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTableWithCollapse } from '@/components/organism/CoreTableWithCollapse'
import PageContainer from '@/components/organism/PageContainer'
import { periodType } from '@/enum'
import { MENU_URL } from '@/routes'
import { getFiscalYear } from '@/service/common/fiscalYear/getList'
import { Grid, Typography } from '@mui/material'
import useTaxConfigList from './useTaxReturnList'

const TaxReturnList = () => {
  const [values, handles] = useTaxConfigList()

  const {
    router,
    queryPage,
    methodForm,
    columns,
    monthTableData,
    quarterlyTableData,
    yearTableData,
    isLoadingTable,
  } = values
  const { control, watch } = methodForm

  const { t, onSubmit, onReset } = handles
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
              <CoreAutocomplete
                control={control}
                name='period'
                label={'Kỳ kê khai'}
                placeholder={'Chọn kỳ kê khai'}
                options={periodType}
                disableClearable
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name='fiscalYear'
                label='Năm tài chính'
                placeholder='Chọn năm tài chính'
                labelPath2='startFiscalYear'
                labelPath='endFiscalYear'
                fetchDataFn={getFiscalYear}
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

        {queryPage?.period === 'MONTH' && (
          <div className='flex flex-col gap-5 mt-10'>
            <Typography variant='subtitle1'>Tờ khai theo tháng</Typography>
            <CoreTableWithCollapse
              titleField='codeAndName'
              subColumnName='taxReturns'
              columns={columns}
              data={monthTableData}
              paginationHidden={true}
              isLoading={isLoadingTable}
              isShowColumnStt
              onRowClick={(id: number) => {
                if (id) {
                  router.push({
                    pathname: `${MENU_URL.TAX_RETURN}/[id]`,
                    query: { id, actionType: 'VIEW' },
                  })
                }
              }}
            />
          </div>
        )}

        {queryPage?.period === 'QUARTERLY' && (
          <div className='flex flex-col gap-5 mt-20'>
            <Typography variant='subtitle1'>Tờ khai theo quý</Typography>

            <CoreTableWithCollapse
              titleField='codeAndName'
              subColumnName='taxReturns'
              columns={columns}
              data={quarterlyTableData}
              paginationHidden={true}
              isLoading={isLoadingTable}
              isShowColumnStt
              onRowClick={(id: number) => {
                if (id) {
                  router.push({
                    pathname: `${MENU_URL.TAX_RETURN}/[id]`,
                    query: { id, actionType: 'VIEW' },
                  })
                }
              }}
            />
          </div>
        )}

        {queryPage?.period === 'YEAR' && (
          <div className='flex flex-col gap-5 mt-20'>
            <Typography variant='subtitle1'>Tờ khai theo năm</Typography>

            <CoreTableWithCollapse
              titleField='codeAndName'
              subColumnName='taxReturns'
              columns={columns}
              data={yearTableData}
              paginationHidden={true}
              isLoading={isLoadingTable}
              isShowColumnStt
              onRowClick={(id: number) => {
                if (id) {
                  router.push({
                    pathname: `${MENU_URL.TAX_RETURN}/[id]`,
                    query: { id, actionType: 'VIEW' },
                  })
                }
              }}
            />
          </div>
        )}
      </div>
    </PageContainer>
  )
}

export default TaxReturnList

import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { activeType } from '@/enum'
import { Grid } from '@mui/material'
import useTaxReturnConfigList from './useTaxReturnConfig'
import { MENU_URL } from '@/routes'
import { useRouter } from 'next/router'

const TaxReturnConfigList = () => {
  const [values, handles] = useTaxReturnConfigList()
  const router = useRouter()

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

  const { t, onSubmit, onChangePageSize, onReset } = handles
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: t('title_config'),
            },
          ]}
        />
      }
    >
      <div className='flex flex-col'>
        <form onSubmit={onSubmit} className='flex flex-col py-10 px-5'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreInput
                control={control}
                name='search'
                label={t('common:form.search.label')}
                placeholder={t('common:form.search.placeholder')}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreAutocomplete
                control={control}
                name='isActive'
                label='Trạng thái'
                placeholder='Chọn trạng thái'
                options={activeType}
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
          tableName='tax-config'
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
              pathname: `${MENU_URL.TAX_RETURN_CONFIG}/[id]`,
              query: {
                id,
                actionType: 'VIEW',
              },
            })
          }}
        />
      </div>
    </PageContainer>
  )
}

export default TaxReturnConfigList

import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import DotThree from '@/components/icons/DotThree'
import { TopAction } from '@/components/molecules/TopAction'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { salaryMethodType, subjectType } from '@/enum'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import CoreInput from '@/components/atoms/CoreInput'
import useBCMList from './useBCMList'

const BCMList = () => {
  const [values, handles] = useBCMList()
  const {
    router,
    queryPage,
    methodForm,
    columns,
    tableData,
    isLoadingTable,
    page,
    size,
    totalPages,
  } = values
  const { control, watch } = methodForm
  const { t, onSubmit, onReset, onChangePageSize } = handles

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: 'Định mức chi phí chung',
            },
          ]}
        />
      }
    >
      <div className='flex flex-col'>
        <form onSubmit={onSubmit} className='flex flex-col py-10 px-5'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={4}>
              <CoreInput
                control={control}
                name='name'
                label='Tên NVL'
                placeholder='Tìm kiếm theo tên NVL'
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
          <TopAction actionList={['import', 'export']} />
          <DotThree className='mt-3' onClick={() => {}} />
          <CoreButton
            onClick={() =>
              router.push(
                `${MENU_URL.COST.BOM_COST_MANAGE.BOM_COST_GENERAL}/addNew`
              )
            }
          >
            {t('common:btn.add')}
          </CoreButton>
        </div>

        <CoreTable
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
              pathname: `${MENU_URL.COST.BOM_COST_MANAGE.BOM_COST_GENERAL}/[id]`,
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

export default BCMList

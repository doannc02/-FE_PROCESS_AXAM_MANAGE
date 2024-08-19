import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreTableWithCollapse } from '@/components/organism/CoreTableWithCollapse'
import PageContainer from '@/components/organism/PageContainer'
import { subjectType } from '@/enum'
import { Grid } from '@mui/material'
import { MENU_URL } from '@/routes'
import { TopAction } from '@/components/molecules/TopAction'
import DotThree from '@/components/icons/DotThree'
import useSaveConfigSubject from './useSaveConfigSubjectList'

const ConfigSubjectList = () => {
  const [values, handles] = useSaveConfigSubject()
  const { router, queryPage, methodForm, columns, tableData, isLoadingTable } =
    values
  const { control, watch } = methodForm
  const { t, onSubmit, onReset, getTitleFieldFn } = handles

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
            <Grid item xs={12}>
              <CoreAutocomplete
                control={control}
                name='subjectType'
                label={'Phương pháp tính giá'}
                options={subjectType}
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
            onClick={() => router.push(`${MENU_URL.COST.THCP}/addNew`)}
          >
            {t('common:btn.add')}
          </CoreButton>
        </div>

        <CoreTableWithCollapse
          titleField='subjectType'
          getTitleFieldFn={getTitleFieldFn}
          subColumnName='responses'
          columns={columns}
          data={tableData as any}
          paginationHidden={true}
          isLoading={isLoadingTable}
          isShowColumnStt
          onRowClick={(id: number) => {
            if (id) {
              router.push({
                pathname: `${MENU_URL.COST.BOM_COST_MANAGE.BOM_COST_GENERAL}/[id]`,
                query: { id, actionType: 'VIEW' },
              })
            }
          }}
        />
      </div>
    </PageContainer>
  )
}

export default ConfigSubjectList

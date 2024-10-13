import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import DotThree from '@/components/icons/DotThree'
import { TopAction } from '@/components/molecules/TopAction'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { Grid } from '@mui/material'
import { MENU_URL } from '@/routes'
import useListExamSets from './useListExamSets'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { getAcademicYears } from '@/service/academicYear'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { menuState } from '@/enum'
import { getListCourse } from '@/service/course'

const ListExamSets = () => {
  const [values, handles] = useListExamSets()

  const {
    methodForm,
    columns,
    tableData,
    totalPages,
    size,
    page,
    isLoadingTable,
    role,
    router,
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
              title: 'Danh sách bộ đề',
            },
          ]}
        />
      }
    >
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
              name='stateExamSet'
              label='Trạng thái'
              labelPath='name'
              placeholder='Chọn trạng thái'
              options={menuState}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreAutoCompleteAPI
              placeholder='Tìm kiếm theo học phần'
              labelPath2='code'
              fetchDataFn={getListCourse}
              params={{
                page: 1,
                size: 20,
              }}
              control={control}
              label='Học phần'
              name='course'
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

      {role !== 'Admin' && (
        <div className='py-4 flex justify-end gap-4 items-center'>
          <TopAction actionList={['import', 'export']} />
          <DotThree className='mt-3' onClick={() => {}} />
          <CoreButton
            onClick={() => {
              router.push({
                pathname: `${MENU_URL.EXAM_SET}/addNew`,
              })
            }}
          >
            {t('common:btn.add')}
          </CoreButton>
        </div>
      )}

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
            pathname: `${MENU_URL.EXAM_SET}/[id]`,
            query: {
              id,
              actionType: 'VIEW',
            },
          })
        }}
      />
    </PageContainer>
  )
}

export default ListExamSets

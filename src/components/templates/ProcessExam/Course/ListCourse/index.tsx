import { CoreTable } from '@/components/organism/CoreTable'

import { CoreButton } from '@/components/atoms/CoreButton'
import DotThree from '@/components/icons/DotThree'
import { TopAction } from '@/components/molecules/TopAction'
import { MENU_URL } from '@/routes'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import { Grid } from '@mui/material'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import PageContainer from '@/components/organism/PageContainer'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { menuStateView } from '@/enum'
import useListCourse from './useListCourse'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { getMajorList } from '@/service/major'

const ListCourse = () => {
  const { t } = useTranslation()
  const [values, handles] = useListCourse()
  const {
    columns,
    isLoadingTable,
    page,
    size,
    totalPages,
    methodForm,
    tableData,
  } = values
  const { control } = methodForm

  const { onSubmit, onChangePageSize, onReset } = handles
  const router = useRouter()

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: 'Danh sách học phần',
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
            <CoreAutoCompleteAPI
              params={{}}
              fetchDataFn={getMajorList}
              control={control}
              label='Chuyên ngành'
              placeholder='Tìm kiếm theo chuyên ngành'
              name='major'
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
          onClick={() => {
            router.push({
              pathname: `${MENU_URL.COURSE}/addNew`,
            })
          }}
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
            pathname: `${MENU_URL.COURSE}/[id]`,
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
export default ListCourse

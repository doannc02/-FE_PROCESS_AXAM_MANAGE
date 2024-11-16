import { CoreTable } from '@/components/organism/CoreTable'
import useListExams from './useListExams'
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

const ListExams = () => {
  const { t } = useTranslation()
  const [values, handles] = useListExams()
  const {
    columns,
    isLoadingTable,
    page,
    size,
    totalPages,
    methodForm,
    tableData,
    role,
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
              title: 'Đề xuất phê duyệt',
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
              name='status'
              label='Trạng thái'
              labelPath='name'
              placeholder='Chọn trạng thái'
              options={menuStateView}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreDatePicker
              control={control}
              name='month_upload'
              views={['month']}
              inputFormat='MM'
              format='MM'
              title='Tháng'
              placeholder='Chọn tháng'
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
        {role === 'Admin' ? null : (
          <CoreButton
            onClick={() => {
              router.push({
                pathname: `${MENU_URL.DETAIL_EXAM}/addNew`,
              })
            }}
          >
            {t('common:btn.add')}
          </CoreButton>
        )}
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
            pathname: `${MENU_URL.DETAIL_EXAM}/[id]`,
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
export default ListExams

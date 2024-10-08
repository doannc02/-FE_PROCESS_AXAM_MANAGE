import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import DotThree from '@/components/icons/DotThree'
import { TopAction } from '@/components/molecules/TopAction'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import useListProposals from './useListProposals'
import { MENU_URL } from '@/routes'

const ListProposals = () => {
  const [values, handles] = useListProposals()

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
            <CoreDatePicker
              control={control}
              name='startDate'
              title='Ngày lập chứng từ (từ)'
              placeholder='Chọn ngày'
              format='YYYY-MM-DD'
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreDatePicker
              control={control}
              name='endDate'
              title='Ngày lập chứng từ (đến)'
              placeholder='Chọn ngày'
              format='YYYY-MM-DD'
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreDatePicker
              control={control}
              name='startDueDate'
              title='Ngày đến hạn (từ)'
              placeholder='Chọn ngày'
              format='YYYY-MM-DD'
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreDatePicker
              control={control}
              name='endDueDate'
              title='Ngày hết hạn'
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

      <div className='py-4 flex justify-end gap-4 items-center'>
        <TopAction actionList={['import', 'export']} />
        <DotThree className='mt-3' onClick={() => {}} />
        <CoreButton
          onClick={() => {
            router.push({
              pathname: `${MENU_URL.APPROVE}/addNew`,
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
            pathname: `${MENU_URL.APPROVE}/[id]`,
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

export default ListProposals

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
import { menuStateView } from '@/enum'

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
    isProposal,
    isTracking,
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
              title: isProposal ? 'Danh sách đề xuất' : 'Danh sách phê duyệt',
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

          {!isTracking && (
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
          )}
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreAutocomplete
              control={control}
              className='w-full'
              placeholder='Chọn học kỳ'
              label='Học kỳ'
              name='semester'
              options={[
                { value: '1', label: 'Học kỳ 1' },
                { value: '2', label: 'Học kỳ 2' },
                { value: '3', label: 'Học kỳ 3' },
                { value: '4', label: 'Học kỳ 4' },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreDatePicker
              control={control}
              name='month_end'
              views={['month']}
              inputFormat='MM'
              format='MM'
              title={
                isTracking
                  ? 'Thời hạn đề xuất (Tháng)'
                  : 'Tháng phải hoàn thành'
              }
              placeholder='Tìm kiếm kế hoạch theo tháng phải hoàn thành'
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

      {isProposal ? (
        <div className='py-4 flex justify-end gap-4 items-center'>
          <TopAction actionList={['import', 'export']} />
          <DotThree className='mt-3' onClick={() => {}} />
          <CoreButton
            onClick={() => {
              let pathname = ''
              if (isProposal) {
                pathname = MENU_URL.PROPOSAL
              } else {
                pathname = MENU_URL.APPROVE
              }
              router.push({
                pathname: `${pathname}/addNew`,
              })
            }}
          >
            {t('common:btn.add')}
          </CoreButton>
        </div>
      ) : null}

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
          let pathname = ''
          if (isProposal) {
            pathname = MENU_URL.PROPOSAL
          } else {
            pathname = MENU_URL.TRACKING
          }
          router.push({
            pathname: `${pathname}/[id]`,
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

import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import DotThree from '@/components/icons/DotThree'
import { TopAction } from '@/components/molecules/TopAction'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import useBankAnhCashAccountList from './useOtherDocumentList'

const OtherDocumentList = () => {
  const [values, handles] = useBankAnhCashAccountList()

  const {
    methodForm,
    columns,
    tableData,
    totalPages,
    size,
    page,
    isLoadingTable,
    paymentMethod,
    paymentMethodURL,
    paymentType,
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
                name='startDate'
                title='Ngày chứng từ (từ)'
                placeholder='Chọn ngày'
                format='YYYY-MM-DD'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='endDate'
                title='Ngày chứng từ (đến)'
                placeholder='Chon ngày'
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
            onClick={() => router.push(`${MENU_URL.GENERAL_ACC.OTHER_DOC}/addNew`)}
          >
            {t('common:btn.add')}
          </CoreButton>
        </div>

        <CoreTable
          tableName='bankAccLst'
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
              pathname: `${MENU_URL.GENERAL_ACC.OTHER_DOC}/[id]`,
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

export default OtherDocumentList

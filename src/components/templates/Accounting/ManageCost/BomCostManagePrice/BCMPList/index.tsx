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
import useBCMPriceList from './useBCMPList'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { getProductListFullType } from '@/service/product/productController/getListProForToolsAsset'

const BCMPriceList = () => {
  const [values, handles] = useBCMPriceList()
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
              title: 'Định mức thành phẩm',
            },
          ]}
        />
      }
    >
      <div className='flex flex-col'>
        <form onSubmit={onSubmit} className='flex flex-col py-10 px-5'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={4}>
              <CoreAutoCompleteAPI
                placeholder='Chọn TP/BTP'
                control={control}
                name='name'
                valuePath='name'
                label={'Tên TP/BTP'}
                fetchDataFn={getProductListFullType}
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
          {/* <CoreButton
            onClick={() =>
              router.push(
                `${MENU_URL.COST.BOM_COST_MANAGE.GENERAL_PRICE_LIST}/addNew`
              )
            }
          >
            {t('common:btn.add')}
          </CoreButton> */}
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
          // onRowClick={(id: number) => {
          //   router.push({
          //     pathname: `${MENU_URL.COST.BOM_COST_MANAGE.GENERAL_PRICE_LIST}/[id]`,
          //     query: {
          //       id,
          //       actionType: 'VIEW',
          //     },
          //   })
          // }}
        />
      </div>
    </PageContainer>
  )
}

export default BCMPriceList

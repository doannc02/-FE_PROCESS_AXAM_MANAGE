import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { activeType } from '@/enum'
import { MENU_URL } from '@/routes'
import { getToolsAssetList } from '@/service/accounting/toolsAssetCategory/getList'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import useCategoryList from './useCategoryList'

const CategoryToolsAsset = () => {
  const { t } = useTranslation('accounting/entry-list')
  const [values, handles] = useCategoryList()

  const router = useRouter()

  const {
    accountLedgerId,
    typeToolAsset,
    methodForm,
    columns,
    tableData,
    totalPages,
    size,
    page,
    isLoading,
  } = values

  const { control, reset, watch } = methodForm

  const { onSubmit, onChangePageSize, onReset } = handles

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: `Danh mục ${typeToolAsset === 'TOOL' ? ' CCDC' : ' TSCD'}`,
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
                label='Tìm kiếm'
                placeholder='Tìm kiếm theo mã hoặc tên danh mục'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                params={{
                  categoryType: typeToolAsset === 'ASSET' ? 'ASSET' : 'TOOLS',
                  accountLedgerId: accountLedgerId,
                }}
                control={control}
                name='parent'
                valuePath='id'
                labelPath='name'
                placeholder='Chọn danh mục cha'
                label='Danh mục cha'
                fetchDataFn={getToolsAssetList}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='isActive'
                label='Trạng thái'
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

        <div className='py-4 flex justify-end gap-4 items-center'>
          <CoreButton
            theme='submit'
            onClick={() => {
              router.push({
                pathname: `${MENU_URL[typeToolAsset].CATEGORY}/addNew`,
              })
            }}
          >
            {t('common:btn.add')}
          </CoreButton>
        </div>

        <CoreTable
          tableName='CategoryAssetList'
          columns={columns}
          data={tableData}
          onChangePageSize={onChangePageSize}
          paginationHidden={tableData.length < 1}
          totalPages={totalPages}
          page={page}
          size={size}
          isLoading={isLoading}
          isShowColumnStt
          onRowClick={(id: number, row: any) => {
            router.push({
              pathname: `${MENU_URL[typeToolAsset].CATEGORY}/[id]`,
              query: {
                id: id,
                actionType: 'VIEW',
              },
            })
          }}
        />
      </div>
    </PageContainer>
  )
}

export default CategoryToolsAsset

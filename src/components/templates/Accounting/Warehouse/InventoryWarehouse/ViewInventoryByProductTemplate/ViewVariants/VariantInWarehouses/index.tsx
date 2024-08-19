import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbsV2 } from '@/components/atoms/CoreBreadcrumbsV2'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { Box, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useViewVariantInWarehouses } from './useVariantInWarehouses'
import { CoreButton } from '@/components/atoms/CoreButton'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import { MENU_URL } from '@/routes'

export const ViewVariantInWarehouses = () => {
  const router = useRouter()
  const { productId, productName, productTemplateName, productTemplateId } =
    router.query
  const [values, handles] = useViewVariantInWarehouses()
  const { typeWareHouse } = useCheckPath()

  const {
    methodForm,
    isLoading,
    columns,
    rowData,
    data,
    isLoadingWarehouse,
    warehouseData,
  } = values

  const { onSubmit, onReset, onChangePageSize } = handles

  const { control } = methodForm

  return (
    <PageContainer
      title={
        <CoreBreadcrumbsV2
          breadcrumbsData={[
            {
              title: 'Danh sách sản phẩm',
              onClick: () =>
                router.push({
                  pathname: `${MENU_URL.WARE_HOUSE[typeWareHouse].INVENTORY_WAREHOUSE.DEPARTMENT.VIEW_BY_PRODUCT_TEMPLATE}`,
                }),
            },
            {
              title: productTemplateName as string,
              onClick: () =>
                router.push({
                  pathname: `${MENU_URL.WARE_HOUSE[typeWareHouse].INVENTORY_WAREHOUSE.DEPARTMENT.VIEW_BY_PRODUCT_TEMPLATE}/viewVariants`,
                  query: { productTemplateId, productTemplateName },
                }),
            },
            { title: productName as string },
          ]}
        />
      }
    >
      {/* <form onSubmit={onSubmit}>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              control={control}
              name='search'
              label='Tìm kiếm'
              placeholder='Nhập từ khoá'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreAutocomplete
              control={control}
              name='warehouseId'
              label='Kho'
              valuePath='id'
              labelPath='name'
              options={warehouseData}
              loading={isLoadingWarehouse}
            />
          </Grid>
        </Grid>
        <Box className='flex items-center justify-center m-10 gap-x-10'>
          <CoreButton
            theme='reset'
            fontSize={14}
            textTransform='none'
            onClick={onReset}
          >
            Reset
          </CoreButton>
          <CoreButton
            theme='submit'
            fontSize={14}
            textTransform='none'
            type='submit'
          >
            Tìm kiếm
          </CoreButton>
        </Box>
      </form> */}
      <CoreTable
        {...data}
        isShowColumnStt
        columns={columns}
        data={rowData}
        onChangePageSize={onChangePageSize}
        isLoading={isLoading}
        paginationHidden={rowData?.length < 1}
      />
    </PageContainer>
  )
}

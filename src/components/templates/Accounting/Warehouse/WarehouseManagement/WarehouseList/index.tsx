import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useWarehouseList } from './useWarehouseList'
import CoreInput from '@/components/atoms/CoreInput'
import { MENU_URL, TRANSLATE } from '@/routes'
import useCheckPath from '@/components/hooks/path/useCheckPath'

export const WarehouseList = () => {
  const { t } = useTranslation(TRANSLATE.WARE_HOUSE)
  const router = useRouter()
  const [values, handles] = useWarehouseList()
  const {
    isLoading,
    watch,
    register,
    control,
    columns,
    tableData,
    totalPages,
    page,
    size,
  } = values
  const { onSubmit, onReset, onChangePageSize } = handles
  const { typeWareHouse } = useCheckPath()

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
      <form onSubmit={onSubmit}>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CoreInput
              control={control}
              name='search'
              label='Tìm kiếm'
              placeholder='Nhập từ khóa'
              inputProps={{ maxLength: 255 }}
            />
          </Grid>

          <div className='flex items-center justify-center w-full my-13'>
            <div className='flex gap-10'>
              <CoreButton theme='reset' onClick={onReset} textTransform='none'>
                Reset
              </CoreButton>
              <CoreButton
                theme='submit'
                type='submit'
                disabled={isLoading}
                textTransform='none'
              >
                Tìm kiếm
              </CoreButton>
            </div>
          </div>
        </Grid>
      </form>

      <CoreTable
        columns={columns}
        data={tableData}
        onChangePageSize={onChangePageSize}
        paginationHidden={tableData.length < 1}
        totalPages={totalPages}
        page={page}
        size={size}
        isLoading={isLoading}
        isShowColumnStt
        onRowClick={(id: number) => {
          router.push({
            pathname: `${MENU_URL.WARE_HOUSE[typeWareHouse].MANAGEMENT}/[id]`,
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
